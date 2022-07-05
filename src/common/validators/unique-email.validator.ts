import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { getRepository, Not } from 'typeorm';

import { Users } from 'src/users/users.entity';

interface Options {
  excludeSelf?: boolean;
}

@ValidatorConstraint({ async: true })
export class IsUniqueEmailConstraint implements ValidatorConstraintInterface {
  async validate(email: string, args: ValidationArguments) {
    const [options] = args.constraints as [Options];
    const object: any = args.object;
    const filterPayload: any = { email };

    if (options.excludeSelf && object.id) {
      filterPayload.id = Not(object.id);
    }

    const usersRepository = getRepository(Users);
    const existsUser = await usersRepository.findOne(filterPayload);

    if (existsUser) return false;

    return true;
  }
}

export function IsUniqueEmail(
  options: Options,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsUniqueEmailConstraint,
    });
  };
}
