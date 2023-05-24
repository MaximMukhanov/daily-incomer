import { Provider } from '@nestjs/common';
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import InlineCss from 'inline-css';
import { SendMailOptions, Transport, TransportOptions } from 'nodemailer';
import * as DKIM from 'nodemailer/lib/dkim';
import * as JSONTransport from 'nodemailer/lib/json-transport';
import * as Mail from 'nodemailer/lib/mailer';
import { Attachment } from 'nodemailer/lib/mailer';
import * as SendmailTransport from 'nodemailer/lib/sendmail-transport';
import * as SESTransport from 'nodemailer/lib/ses-transport';
import * as SMTPPool from 'nodemailer/lib/smtp-pool';
import * as SMTPTransport from 'nodemailer/lib/smtp-transport';
import * as StreamTransport from 'nodemailer/lib/stream-transport';

export interface MailerAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<MailerOptionsFactory>;
  useExisting?: Type<MailerOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<MailerOptions> | MailerOptions;
  extraProviders?: Provider[];
}

export interface MailerOptionsFactory {
  createMailerOptions(): Promise<MailerOptions> | MailerOptions;
}

type Options =
  | SMTPTransport.Options
  | SMTPPool.Options
  | SendmailTransport.Options
  | StreamTransport.Options
  | JSONTransport.Options
  | SESTransport.Options
  | TransportOptions;

export type TransportType =
  | Options
  | SMTPTransport
  | SMTPPool
  | SendmailTransport
  | StreamTransport
  | JSONTransport
  | SESTransport
  | Transport
  | string;

export interface MailerOptions {
  defaults?: Options;
  transport?: TransportType;
  transports?: {
    [name: string]: SMTPTransport | SMTPTransport.Options | string;
  };
  template?: {
    dir?: string;
    adapter?: TemplateAdapter;
    options?: { [name: string]: any };
  };
  options?: { [name: string]: any };
  preview?:
    | boolean
    | Partial<{
        /**
         * a path to a directory for saving the generated email previews
         * (defaults to os.tmpdir() from os)
         *
         * @see https://nodejs.org/api/os.html#os_os_tmpdir
         * @type {string}
         */
        dir: string;
        /**
         * an options object that is passed to `open` (defaults to { wait: false })
         *
         * @see https://github.com/sindresorhus/open#options
         * @type {(boolean | { wait: boolean; app: string | string[] })}
         */
        open: boolean | { wait: boolean; app: string | string[] };
      }>;
}

export interface TemplateAdapter {
  compile(
    mail: any,
    callback: (err?: any, body?: string) => any,
    options: MailerOptions
  ): void;
}

export interface TemplateAdapterConfig {
  inlineCssOptions?: InlineCss.Options;
  inlineCssEnabled?: boolean;
}

export type TextEncoding = 'quoted-printable' | 'base64';
export type Headers =
  | { [key: string]: string | string[] | { prepared: boolean; value: string } }
  | Array<{ key: string; value: string }>;

export interface Address {
  name: string;
  address: string;
}

export interface AttachmentLikeObject {
  path: string;
}

export interface ISendMailOptions extends SendMailOptions {
  to?: string | Address | Array<string | Address>;
  cc?: string | Address | Array<string | Address>;
  bcc?: string | Address | Array<string | Address>;
  replyTo?: string | Address;
  inReplyTo?: string | Address;
  from?: string | Address;
  subject?: string;
  text?: string | Buffer | AttachmentLikeObject;
  html?: string | Buffer;
  sender?: string | Address;
  raw?: string | Buffer;
  textEncoding?: TextEncoding;
  references?: string | string[];
  encoding?: string;
  date?: Date | string;
  headers?: Headers;
  context?: {
    [name: string]: any;
  };
  transporterName?: string;
  template?: string;
  attachments?: Attachment[];
  dkim?: DKIM.Options;
}

export interface MailerTransportFactory {
  createTransport(opts?: TransportType): Mail;
}

export interface MailerSendMailOptions extends SendMailOptions {
  template?: string;
  context?: any;
}
