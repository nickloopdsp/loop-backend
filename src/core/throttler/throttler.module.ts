import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService, FeatureFlagsConfig, RateLimitConfig } from '../../config';

@Module({
    imports: [
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [AppConfigService],
            useFactory: (configService: AppConfigService) => {
                const featureFlags = configService.get<FeatureFlagsConfig>('featureFlags');
                const rateLimitConfig = configService.get<RateLimitConfig>('throttler');
                if (!featureFlags.enableRateLimit) {
                    return [{
                        ttl: 0,
                        limit: 0,
                    }];
                }
                return [{
                    ttl: rateLimitConfig.ttl,
                    limit: rateLimitConfig.limit,
                }];
            },
        }),
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class ThrottlerConfigModule { } 