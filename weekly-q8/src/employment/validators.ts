// validators.ts

import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

// ✅ RATE VALIDATOR
@ValidatorConstraint({ name: 'IsRateInCountryRange', async: false })
@Injectable()
export class IsRateInCountryRange implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as any;
    const country = object?.['__country'] || 'US';
    const limits = {
      US: [20, 100],
      EU: [15, 80],
    };
    const [min, max] = limits[country] || [0, 9999];
    object.__rateLimits = limits;
    return value >= min && value <= max;
  }

  defaultMessage(args: ValidationArguments) {
    const object = args.object as any;
    const country = object?.['__country'] || 'US';
    const limits = object.__rateLimits || {};
    const [min, max] = limits[country] || [0, 0];
    return `RATE_OUT_OF_RANGE:${country}:${min}-${max}`;
  }
}

// ✅ FUTURE DATE VALIDATOR
@ValidatorConstraint({ name: 'IsFutureDate', async: false })
@Injectable()
export class IsFutureDate implements ValidatorConstraintInterface {
  validate(date: Date) {
    return date instanceof Date && date.getTime() > Date.now();
  }

  defaultMessage(): string {
    return 'JOINING_DATE_NOT_FUTURE';
  }
}

// ✅ CONTRACT DATES CHECK
@ValidatorConstraint({ name: 'ContractorDateCheck', async: false })
@Injectable()
export class ContractorDateCheck implements ValidatorConstraintInterface {
  validate(value: Date, args: ValidationArguments) {
    const object = args.object as any;
    return (
      value instanceof Date &&
      object.contractStart instanceof Date &&
      value.getTime() > object.contractStart.getTime()
    );
  }

  defaultMessage(): string {
    return 'CONTRACT_END_BEFORE_START';
  }
}

// ✅ METADATA VALIDATOR
@ValidatorConstraint({ name: 'ValidateMetadata', async: false })
@Injectable()
export class ValidateMetadata implements ValidatorConstraintInterface {
  validate(metadata: Record<string, string>) {
    const keyRegex = /^[a-z0-9_]+$/;
    return Object.entries(metadata).every(([key, value]) => {
      return keyRegex.test(key) && value.length <= 255;
    });
  }

  defaultMessage(): string {
    return 'INVALID_METADATA';
  }
}
