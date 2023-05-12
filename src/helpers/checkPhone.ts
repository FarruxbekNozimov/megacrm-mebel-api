import { BadRequestException } from '@nestjs/common';

export function CheckPhoneNumber(phone: string) {
  if (phone.length != 9) {
    throw new BadRequestException({
      msg: `Telefon raqam 9 ta raqamdan iborat bo'lishi kerak`,
    });
  }
  return true;
}
