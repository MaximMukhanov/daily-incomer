import {
  DynamicModule,
  Global,
  Module,
  Provider,
  ValueProvider,
} from '@nestjs/common';

import { MAILER_OPTIONS } from '../constants/constants';
import { MailerService } from '../mailer.service';
import {
  MailerAsyncOptions,
  MailerOptions,
  MailerOptionsFactory,
} from '../types/interfaces';

@Global()
@Module({})
export class MailerCoreModule {
  public static forRoot(options: MailerOptions): DynamicModule {
    const MailerOptionsProvider: ValueProvider<MailerOptions> = {
      provide: MAILER_OPTIONS,
      useValue: options,
    };

    return {
      module: MailerCoreModule,
      providers: [
        /** Options **/
        MailerOptionsProvider,

        /** Services **/
        MailerService,
      ],
      exports: [
        /** Services **/
        MailerService,
      ],
    };
  }

  public static forRootAsync(options: MailerAsyncOptions): DynamicModule {
    const providers: Provider[] = this.createAsyncProviders(options);

    return {
      module: MailerCoreModule,
      providers: [
        ...providers,
        MailerService,
        ...(options.extraProviders || []),
      ],
      imports: options.imports,
      exports: [MailerService],
    };
  }

  private static createAsyncProviders(options: MailerAsyncOptions): Provider[] {
    const providers: Provider[] = [this.createAsyncOptionsProvider(options)];

    if (options.useClass) {
      const { useClass } = options;
      providers.push({
        provide: useClass,
        useClass: useClass,
      });
    }

    return providers;
  }

  private static createAsyncOptionsProvider(
    options: MailerAsyncOptions
  ): Provider {
    if (options.useFactory) {
      const { useFactory, inject } = options;
      return {
        name: MAILER_OPTIONS,
        provide: MAILER_OPTIONS,
        useFactory: useFactory,
        inject: inject || [],
      };
    }

    const { useExisting, useClass } = options;

    return {
      name: MAILER_OPTIONS,
      provide: MAILER_OPTIONS,
      useFactory: async (optionsFactory: MailerOptionsFactory) => {
        return optionsFactory.createMailerOptions();
      },
      inject: [useExisting || useClass],
    };
  }
}
