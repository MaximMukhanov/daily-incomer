import { Inject } from '@nestjs/common';
import { createTransport } from 'nodemailer';

import Mail from 'nodemailer/lib/mailer';
import { MAILER_OPTIONS } from '../constants/constants';
import { MailerOptions, TransportType } from '../types/interfaces';
import { MailerTransportFactory as IMailerTransportFactory } from './mailer-transport.factory';

export class MailerTransportFactory implements IMailerTransportFactory {
  constructor(
    @Inject(MAILER_OPTIONS)
    private readonly options: MailerOptions
  ) {}

  public createTransport(opts?: TransportType): Mail {
    const transport = createTransport(
      opts || this.options.transport,
      this.options.defaults
    );

    return transport;
  }
}
