import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { AppConfigService } from './config.service';
import { validationSchema } from './validation/env.validation';
import configuration from './configuration';

@Global()
@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            validationSchema,
            load: [configuration],
            cache: true,
            expandVariables: true
        }),
    ],
    providers: [AppConfigService],
    exports: [AppConfigService],
})
export class ConfigModule { } 