import { Transform, Type } from 'class-transformer';
import {
   IsInt,
   IsPositive,
   IsOptional,
   IsBoolean,
   IsEnum,
   IsString,
   IsEmail,
} from 'class-validator';

export enum UserOrder {
   ID = 'id',
   USERNAME = 'username',
   EMAIL = 'email',
   PHONE = 'phone',
   FIRSTNAME = 'firstname',
   LASTNAME = 'lastname',
}

export class CreateUserDTO {
   @IsString({ message: 'El nombre es obligatorio' })
   firstname: string;

   @IsString({ message: 'El apellido es obligatorio' })
   lastname: string;

   @IsString({ message: 'El nombre de usuario es obligatorio' })
   username: string;

   @IsEmail({}, { message: 'El email debe ser un email válido' })
   email: string;

   @IsOptional()
   @IsString({ message: 'El teléfono es obligatorio' })
   phone?: string;

   constructor(
      firstname: string,
      lastname: string,
      username: string,
      email: string,
      phone?: string,
   ) {
      this.firstname = firstname;
      this.lastname = lastname;
      this.username = username;
      this.email = email;
      this.phone = phone;
   }
}

export class UpdateUserDTO {
   @IsOptional()
   @IsString()
   firstname?: string;

   @IsOptional()
   @IsString()
   lastname?: string;

   @IsOptional()
   @IsString()
   username?: string;

   @IsOptional()
   @IsEmail({}, { message: 'El email debe ser un email válido' })
   email?: string;

   @IsOptional()
   @IsString()
   phone?: string;

   constructor(
      firstname?: string,
      lastname?: string,
      username?: string,
      email?: string,
      phone?: string,
   ) {
      this.firstname = firstname;
      this.lastname = lastname;
      this.username = username;
      this.email = email;
      this.phone = phone;
   }
}

export class UsersFilterDTO {
   @IsInt()
   @IsPositive()
   @IsOptional()
   @Type(() => Number)
   public page: number;

   @IsInt()
   @IsPositive()
   @IsOptional()
   @Type(() => Number)
   public pageSize: number;

   @IsEnum(UserOrder)
   @IsOptional()
   public sortBy: UserOrder;

   @IsBoolean()
   @IsOptional()
   @Transform(({ value }) => value === 'true')
   @Type(() => Boolean)
   public sortDesc: boolean;

   @IsOptional()
   @IsString()
   public search?: string;

   constructor(
      page: number,
      pageSize: number,
      sortBy: UserOrder,
      sortDesc: boolean,
      search?: string,
   ) {
      this.page = page;
      this.pageSize = pageSize;
      this.sortBy = sortBy;
      this.sortDesc = sortDesc;
      this.search = search;
   }
}

export class UserIdDTO {
   @IsInt()
   @IsPositive()
   @Type(() => Number)
   public Id: number;

   constructor(Id: number) {
      this.Id = Id;
   }
}
