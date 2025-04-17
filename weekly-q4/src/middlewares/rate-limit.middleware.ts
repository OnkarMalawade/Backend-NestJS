import {
  Injectable,
  NestMiddleware,
  Request,
  Response,
  NextFunction,
} from '@nestjs/common';
interface IPData {
  count: number;
  firstRequestTime: number;
}
@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private requestsMap = new Map<string, IPData>();
  private readonly LIMIT = 3; // max 3 requests
  private readonly TIME_WINDOW = 60 * 1000; // 1 minute in ms
  use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip || req.connection.remoteAddress;
    const currentTime = Date.now();
    const ipData = this.requestsMap.get(ip);
    if (!ipData) {
      // First request from this IP
      this.requestsMap.set(ip, { count: 1, firstRequestTime: currentTime });
      return next();
    }
    const { count, firstRequestTime } = ipData;
    // Time window expired? Reset
    if (currentTime - firstRequestTime > this.TIME_WINDOW) {
      this.requestsMap.set(ip, { count: 1, firstRequestTime: currentTime });
      return next();
    }
    // If still in window
    if (count < this.LIMIT) {
      ipData.count += 1;
      this.requestsMap.set(ip, ipData);
      return next();
    }
    // Exceeded limit
    res
      .status(429)
      .json({ message: 'Too many requests. Please wait a minute.' });
  }
}
