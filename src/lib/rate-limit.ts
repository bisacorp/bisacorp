export class RateLimiter {
  private requestCounts: Map<string, { count: number; resetTime: number }> =
    new Map();

  constructor(
    private maxRequests: number,
    private windowMs: number,
  ) {}

  check(ip: string): boolean {
    const now = Date.now();
    const rateData = this.requestCounts.get(ip);

    // If no record or the window has passed, reset
    if (!rateData || now > rateData.resetTime) {
      this.requestCounts.set(ip, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      // Cleanup old entries randomly to avoid memory leaks
      if (Math.random() < 0.1) this.cleanup(now);
      return true;
    }

    // If within window, increment and check
    if (rateData.count < this.maxRequests) {
      rateData.count++;
      return true;
    }

    // Rate limit exceeded
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

// Global instances
// 3 requests per hour for Contact API
export const contactRateLimiter = new RateLimiter(3, 60 * 60 * 1000);
// 3 requests per day for AI Explainer
export const aiRateLimiter = new RateLimiter(3, 24 * 60 * 60 * 1000);
