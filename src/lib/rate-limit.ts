import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const hasRedis =
  !!process.env.UPSTASH_REDIS_REST_URL &&
  !!process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = hasRedis
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : null;

export class MemoryRateLimiter {
  private requestCounts: Map<string, { count: number; resetTime: number }> =
    new Map();

  constructor(
    private maxRequests: number,
    private windowMs: number,
  ) {}

  async check(ip: string): Promise<boolean> {
    const now = Date.now();
    const rateData = this.requestCounts.get(ip);

    if (!rateData || now > rateData.resetTime) {
      this.requestCounts.set(ip, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      if (Math.random() < 0.1) this.cleanup(now);
      return true;
    }

    if (rateData.count < this.maxRequests) {
      rateData.count++;
      return true;
    }

    return false;
  }

  private cleanup(now: number) {
    for (const [key, value] of Array.from(this.requestCounts.entries())) {
      if (now > value.resetTime) {
        this.requestCounts.delete(key);
      }
    }
  }
}

// Global instances wrapper
export const createRateLimiter = (memoryMax: number, memoryWindow: number, redisConfig: Parameters<typeof Ratelimit.slidingWindow>[1], redisMax = memoryMax) => {
  if (hasRedis) {
    return new Ratelimit({
      redis: redis!,
      limiter: Ratelimit.slidingWindow(redisMax, redisConfig),
    });
  }
  return new MemoryRateLimiter(memoryMax, memoryWindow);
};

export const checkRateLimit = async (limiter: Ratelimit | MemoryRateLimiter, ip: string): Promise<boolean> => {
  if (limiter instanceof MemoryRateLimiter) {
    return await limiter.check(ip);
  } else {
    const { success } = await limiter.limit(ip);
    return success;
  }
};

// 3 requests per hour for Contact API
export const contactRateLimiter = createRateLimiter(3, 60 * 60 * 1000, "1 h");

// 3 requests per day for AI Explainer
export const aiRateLimiter = createRateLimiter(3, 24 * 60 * 60 * 1000, "1 d");
