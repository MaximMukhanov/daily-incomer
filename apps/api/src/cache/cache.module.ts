import { Global, Module } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-store';

export const REDIS_CACHE = 'REDIS_CACHE';

@Global()
@Module({
  providers: [
    {
      provide: REDIS_CACHE,
      useFactory: async () =>
        await redisStore({
          url: process.env.KV_URL,
          // 1 день в `ms`
          ttl: 1000 * 60 * 60 * 24,
        }),
    },
  ],

  exports: [REDIS_CACHE],
})
export class CacheModule {}
