import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration } from './interfaces/config.interface';

@Injectable()
export class AppConfigService extends ConfigService<Configuration, true> {
    get<T>(key: keyof Configuration): T {
        const value = super.get<T>(key);
        if (value === undefined) {
            throw new Error(`Configuration key "${String(key)}" is undefined`);
        }
        return value;
    }
} 