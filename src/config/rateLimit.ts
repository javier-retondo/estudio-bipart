import { RedisStore } from 'rate-limit-redis';
import { rateLimit } from 'express-rate-limit';
import { redisClient } from './redisManager';

export const apiLimiter = rateLimit({
   store: new RedisStore({
      sendCommand: (...args: string[]) => redisClient.sendCommand(args),
   }),
   windowMs: 15 * 60 * 1000,
   max: 100,
   message: {
      status: 429,
      error: 'Demasiadas peticiones. Por favor, espera un momento.',
   },
   standardHeaders: true,
   legacyHeaders: false,
});

export const sensitiveLimiter = rateLimit({
   store: new RedisStore({
      sendCommand: (...args: string[]) => redisClient.sendCommand(args),
   }),
   windowMs: 1 * 60 * 1000,
   max: 5,
   message: {
      status: 429,
      error: 'Demasiadas peticiones. Por favor, espera un momento.',
   },
});
