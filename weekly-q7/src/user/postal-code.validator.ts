import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsPostalCodeByCountry(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPostalCodeByCountry',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const country = (args.object as any).country;
          if (!country || typeof value !== 'string') return false;

          const regexMap = {
            US: /^\d{5}(-\d{4})?$/,
            UK: /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/i,
            IN: /^\d{6}$/,
          };

          return regexMap[country]?.test(value);
        },
      },
    });
  };
}
