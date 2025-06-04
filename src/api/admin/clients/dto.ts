import { Transform, Type } from 'class-transformer';
import {
   IsInt,
   IsPositive,
   IsOptional,
   IsBoolean,
   IsEnum,
   IsString,
   IsEmail,
   Length,
} from 'class-validator';

export enum CommercialClientOrder {
   ID = 'id',
   FISCAL_NAME = 'fiscal_name',
   FISCAL_NUMBER = 'fiscal_number',
   IS_PHYSICAL_PERSON = 'is_physical_person',
   VAT_CONDITION_ID = 'vat_condition_id',
   EMAIL = 'email',
   PHONE = 'phone',
   PROVINCE = 'province',
   CITY = 'city',
   ADDRESS = 'address',
   OBSERVATIONS = 'observations',
}

export enum statusCommercialClient {
   ACTIVE = 'active',
   INACTIVE = 'inactive',
}

export class CreateCommercialClientDTO {
   @IsString()
   public fiscal_name: string;

   @IsString()
   @Length(11, 11)
   public fiscal_number: string;

   @IsBoolean()
   @Transform(({ value }) => value === 'true' || value === true)
   @Type(() => Boolean)
   public is_physical_person: boolean;

   @IsInt()
   @IsPositive()
   public vat_condition_id: number;

   @IsEmail()
   @IsOptional()
   public email?: string;

   @IsString()
   @IsOptional()
   public phone?: string;

   @IsString()
   @IsOptional()
   public province?: string;

   @IsString()
   @IsOptional()
   public city?: string;

   @IsString()
   @IsOptional()
   public address?: string;

   @IsString()
   @IsOptional()
   public observations?: string;

   constructor(
      fiscal_name: string,
      fiscal_number: string,
      is_physical_person: boolean,
      vat_condition_id: number,
      email?: string,
      phone?: string,
      province?: string,
      city?: string,
      address?: string,
      observations?: string,
   ) {
      this.fiscal_name = fiscal_name;
      this.fiscal_number = fiscal_number;
      this.is_physical_person = is_physical_person;
      this.vat_condition_id = vat_condition_id;
      this.email = email;
      this.phone = phone;
      this.province = province;
      this.city = city;
      this.address = address;
      this.observations = observations;
   }
}

export class UpdateCommercialClientDTO {
   @IsString()
   @IsOptional()
   public fiscal_name?: string;

   @IsString()
   @Length(11, 11)
   @IsOptional()
   public fiscal_number?: string;

   @IsBoolean()
   @Transform(({ value }) => value === 'true' || value === true)
   @Type(() => Boolean)
   public is_physical_person?: boolean;

   @IsInt()
   @IsPositive()
   public vat_condition_id?: number;

   @IsEmail()
   @IsOptional()
   public email?: string;

   @IsString()
   @IsOptional()
   public phone?: string;

   @IsString()
   @IsOptional()
   public province?: string;

   @IsString()
   @IsOptional()
   public city?: string;

   @IsString()
   @IsOptional()
   public address?: string;

   @IsString()
   @IsOptional()
   public observations?: string;

   constructor(
      fiscal_name?: string,
      fiscal_number?: string,
      is_physical_person?: boolean,
      vat_condition_id?: number,
      email?: string,
      phone?: string,
      province?: string,
      city?: string,
      address?: string,
      observations?: string,
   ) {
      this.fiscal_name = fiscal_name;
      this.fiscal_number = fiscal_number;
      this.is_physical_person = is_physical_person;
      this.vat_condition_id = vat_condition_id;
      this.email = email;
      this.phone = phone;
      this.province = province;
      this.city = city;
      this.address = address;
      this.observations = observations;
   }
}

export class CommercialClientsFilterDTO {
   @IsInt()
   @IsPositive()
   @IsOptional()
   @Type(() => Number)
   public page?: number;

   @IsInt()
   @IsPositive()
   @IsOptional()
   @Type(() => Number)
   public pageSize?: number;

   @IsEnum(CommercialClientOrder)
   @IsOptional()
   public sortBy?: CommercialClientOrder;

   @IsBoolean()
   @IsOptional()
   @Transform(({ value }) => String(value) === 'true')
   @Type(() => Boolean)
   public sortDesc?: boolean;

   @IsString()
   @IsOptional()
   public search?: string;

   @IsEnum(statusCommercialClient)
   @IsOptional()
   public status?: statusCommercialClient;

   constructor(
      page?: number,
      pageSize?: number,
      sortBy?: CommercialClientOrder,
      sortDesc?: boolean,
      search?: string,
      status?: statusCommercialClient,
   ) {
      this.status = status;
      this.page = page;
      this.pageSize = pageSize;
      this.sortBy = sortBy;
      this.sortDesc = sortDesc;
      this.search = search;
   }
}

export class CommercialClientIdDTO {
   @IsInt()
   @IsPositive()
   @Type(() => Number)
   public Id: number;

   constructor(Id: number) {
      this.Id = Id;
   }
}
