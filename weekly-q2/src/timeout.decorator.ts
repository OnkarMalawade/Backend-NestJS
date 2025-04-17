import { SetMetadata } from '@nestjs/common';
export const TIMEOUT_KEY = 'custom_timeout';
export const Timeout = (ms: number) => SetMetadata(TIMEOUT_KEY, ms);
