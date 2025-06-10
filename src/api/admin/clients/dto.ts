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
   SUSPENDED = 'suspended',
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
   @Type(() => Number)
   public vat_condition_id: number;

   @IsEmail()
   @IsOptional()
   @Transform(({ value }) => (value === '' ? undefined : value))
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
   @Type(() => Number)
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
   @Transform(({ value }) => value === 'true' || value === true)
   public sortDesc?: boolean;

   @IsString()
   @IsOptional()
   public search?: string;

   @IsEnum(statusCommercialClient)
   @IsOptional()
   @Transform(({ value }) => (value === '' ? undefined : value))
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

export class SuspendCommercialClientDTO {
   @IsString()
   @IsOptional()
   public reason?: string;

   constructor(reason?: string) {
      this.reason = reason;
   }
}

export class CreateTeamDTO {
   @IsString()
   @Length(1, 100)
   public team_name: string;

   @IsString()
   @IsOptional()
   public description?: string;

   constructor(team_name: string, description?: string) {
      this.team_name = team_name;
      this.description = description;
   }
}

export class CreatePaymentTypeDTO {
   @IsString()
   @Length(1, 100)
   public name: string;

   @IsString()
   @IsOptional()
   public description?: string;

   constructor(name: string, description?: string) {
      this.name = name;
      this.description = description;
   }
}

export class CreatePymeProductDTO {
   @IsString()
   @Length(1, 100)
   public pyme_prod_name: string;

   @IsString()
   @IsOptional()
   public description?: string;

   constructor(pyme_prod_name: string, description?: string) {
      this.pyme_prod_name = pyme_prod_name;
      this.description = description;
   }
}

export class CreateDivisionDTO {
   @IsString()
   @Length(1, 100)
   public division_name: string;

   @IsString()
   @IsOptional()
   public description?: string;

   constructor(division_name: string, description?: string) {
      this.division_name = division_name;
      this.description = description;
   }
}

export class CreateGrossIncomeDTO {
   @IsString()
   @Length(1, 100)
   public name: string;

   @IsString()
   @IsOptional()
   public description?: string;

   constructor(name: string, description?: string) {
      this.name = name;
      this.description = description;
   }
}

export class CreateMonotributistaDTO {
   @IsString()
   @Length(1, 100)
   public name: string;

   @IsString()
   @IsOptional()
   public description?: string;

   constructor(name: string, description?: string) {
      this.name = name;
      this.description = description;
   }
}
