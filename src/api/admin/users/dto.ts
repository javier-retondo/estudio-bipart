import { Transform, Type } from 'class-transformer';
import {
   IsInt,
   IsPositive,
   IsOptional,
   IsBoolean,
   IsEnum,
   IsString,
   IsEmail,
   IsDate,
   IsArray,
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

   @IsOptional()
   @IsArray()
   @Type(() => PermissionsDTO)
   public Permissions?: PermissionsDTO[];

   constructor(
      firstname: string,
      lastname: string,
      username: string,
      email: string,
      phone?: string,
      Permissions?: PermissionsDTO[],
   ) {
      this.firstname = firstname;
      this.lastname = lastname;
      this.username = username;
      this.email = email;
      this.phone = phone;
      this.Permissions = Permissions || [];
   }
}

export class PermissionsDTO {
   @IsInt()
   @IsPositive()
   @Type(() => Number)
   public module_id: number;

   @IsInt()
   @IsPositive()
   @Type(() => Number)
   public commercial_client_id: number;

   @IsOptional()
   @IsDate()
   @Type(() => Date)
   public date_from?: Date;

   @IsOptional()
   @IsDate()
   @Type(() => Date)
   public date_to?: Date;

   @IsBoolean()
   @Type(() => Boolean)
   public allow_read: boolean;

   @IsBoolean()
   @Type(() => Boolean)
   public allow_create: boolean;

   @IsBoolean()
   @Type(() => Boolean)
   public allow_update: boolean;

   @IsBoolean()
   @Type(() => Boolean)
   public allow_delete: boolean;
   constructor(
      module_id: number,
      commercial_client_id: number,
      date_from?: Date,
      date_to?: Date,
      allow_read: boolean = false,
      allow_create: boolean = false,
      allow_update: boolean = false,
      allow_delete: boolean = false,
   ) {
      this.module_id = module_id;
      this.commercial_client_id = commercial_client_id;
      this.date_from = date_from;
      this.date_to = date_to;
      this.allow_read = allow_read;
      this.allow_create = allow_create;
      this.allow_update = allow_update;
      this.allow_delete = allow_delete;
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

   @IsOptional()
   @IsArray()
   @Type(() => PermissionsDTO)
   public Permissions?: PermissionsDTO[];

   constructor(
      firstname?: string,
      lastname?: string,
      username?: string,
      email?: string,
      phone?: string,
      Permissions?: PermissionsDTO[],
   ) {
      this.firstname = firstname;
      this.lastname = lastname;
      this.username = username;
      this.email = email;
      this.phone = phone;
      this.Permissions = Permissions || [];
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
