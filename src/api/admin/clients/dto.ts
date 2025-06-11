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
   ValidateNested,
   IsDate,
} from 'class-validator';
import moment from 'moment';

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

export enum OperativeClientOrder {
   ID = 'id',
   FISCAL_NAME = 'fiscal_name',
   FISCAL_NUMBER = 'fiscal_number',
   IS_PHYSICAL_PERSON = 'is_physical_person',
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

export class OperativeClientsFilterDTO {
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

   @IsEnum(OperativeClientOrder)
   @IsOptional()
   public sortBy?: OperativeClientOrder;

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
      sortBy?: OperativeClientOrder,
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

export class ClientIdDTO {
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

export class TeamDTO {
   @IsInt()
   id: number;

   @IsString()
   team_name: string;

   constructor(id: number, team_name: string) {
      this.id = id;
      this.team_name = team_name;
   }
}

export class PaymentTypeDTO {
   @IsInt()
   id: number;

   @IsString()
   name: string;

   constructor(id: number, name: string) {
      this.id = id;
      this.name = name;
   }
}

export class UserDTO {
   @IsInt()
   id: number;

   @IsString()
   firstname: string;

   @IsString()
   lastname: string;

   @IsString()
   username: string;

   constructor(id: number, firstname: string, lastname: string, username: string) {
      this.id = id;
      this.firstname = firstname;
      this.lastname = lastname;
      this.username = username;
   }
}

export class SocialSecurityDTO {
   @IsBoolean()
   has: boolean;

   @IsInt()
   @IsPositive()
   @Type(() => Number)
   count: number;

   @ValidateNested()
   @Type(() => UserDTO)
   user: UserDTO;
   constructor(has: boolean, count: number, user: UserDTO) {
      this.has = has;
      this.count = count;
      this.user = user;
   }
}

export class DomesticServiceDTO {
   @IsBoolean()
   has: boolean;

   @IsInt()
   @IsPositive()
   @Type(() => Number)
   count: number;

   @ValidateNested()
   @Type(() => UserDTO)
   user: UserDTO;

   constructor(has: boolean, count: number, user: UserDTO) {
      this.has = has;
      this.count = count;
      this.user = user;
   }
}

export class PymeProductItemDTO {
   @IsInt()
   id: number;

   @IsString()
   pyme_prod_name: string;

   constructor(id: number, pyme_prod_name: string) {
      this.id = id;
      this.pyme_prod_name = pyme_prod_name;
   }
}

export class DivisionDTO {
   @IsInt()
   id: number;

   @IsString()
   division_name: string;

   constructor(id: number, division_name: string) {
      this.id = id;
      this.division_name = division_name;
   }
}

export class GrossIncomeDTO {
   @IsInt()
   id: number;

   @IsString()
   name: string;

   constructor(id: number, name: string) {
      this.id = id;
      this.name = name;
   }
}

export class MonotributistDTO {
   @IsInt()
   id: number;

   @IsString()
   name: string;

   constructor(id: number, name: string) {
      this.id = id;
      this.name = name;
   }
}

export class PymeProductDTO {
   @ValidateNested()
   @Type(() => TeamDTO)
   team: TeamDTO;

   @ValidateNested()
   @Type(() => PymeProductItemDTO)
   pyme_product: PymeProductItemDTO;

   @ValidateNested()
   @Type(() => DivisionDTO)
   division: DivisionDTO;

   @ValidateNested()
   @Type(() => GrossIncomeDTO)
   gross_income: GrossIncomeDTO;

   @ValidateNested()
   @Type(() => MonotributistDTO)
   monotributist: MonotributistDTO;

   @ValidateNested()
   @Type(() => SocialSecurityDTO)
   social_security: SocialSecurityDTO;

   @ValidateNested()
   @Type(() => DomesticServiceDTO)
   domestic_service: DomesticServiceDTO;

   @ValidateNested()
   @Type(() => UserDTO)
   user: UserDTO;

   constructor(
      team: TeamDTO,
      pyme_product: PymeProductItemDTO,
      division: DivisionDTO,
      gross_income: GrossIncomeDTO,
      monotributist: MonotributistDTO,
      social_security: SocialSecurityDTO,
      domestic_service: DomesticServiceDTO,
      user: UserDTO,
   ) {
      this.team = team;
      this.pyme_product = pyme_product;
      this.division = division;
      this.gross_income = gross_income;
      this.monotributist = monotributist;
      this.social_security = social_security;
      this.domestic_service = domestic_service;
      this.user = user;
   }
}

export class RiskProductDTO {
   @ValidateNested()
   @Type(() => TeamDTO)
   team: TeamDTO;

   constructor(team: TeamDTO) {
      this.team = team;
   }
}

export class BalanceProductDTO {
   @ValidateNested()
   @Type(() => TeamDTO)
   team: TeamDTO;

   @IsInt()
   @IsPositive()
   @Type(() => Number)
   month_number: number;

   constructor(team: TeamDTO, month_number: number) {
      this.team = team;
      this.month_number = month_number;
   }
}

export class CreateOperativeClientDTO {
   @IsInt()
   @IsPositive()
   @Type(() => Number)
   commercial_client_id: number;

   @IsString()
   fiscal_name: string;

   @IsString()
   fiscal_number: string;

   @IsBoolean()
   is_physical_person: boolean;

   @IsString()
   activity: string;

   @IsDate()
   @Transform(({ value }) => moment(value, 'YYYY-MM-DD').toDate())
   @Type(() => Date)
   born_date: Date;

   @IsString()
   @IsOptional()
   observations?: string;

   @IsBoolean()
   is_coupon_product: boolean;

   @IsBoolean()
   is_invoice_product: boolean;

   @IsBoolean()
   is_system_product: boolean;

   @IsBoolean()
   is_society_product: boolean;

   @IsBoolean()
   is_physical_person_product: boolean;

   @IsBoolean()
   is_balance_product: boolean;

   @IsBoolean()
   is_risk_product: boolean;

   @IsBoolean()
   is_pyme_product: boolean;

   @ValidateNested()
   @Type(() => PaymentTypeDTO)
   payment_type: PaymentTypeDTO;

   @ValidateNested()
   @Type(() => RiskProductDTO)
   @IsOptional()
   risk_product?: RiskProductDTO;

   @ValidateNested()
   @Type(() => BalanceProductDTO)
   @IsOptional()
   balance_product?: BalanceProductDTO;

   @ValidateNested()
   @Type(() => PymeProductDTO)
   @IsOptional()
   pyme_product?: PymeProductDTO;

   constructor(
      commercial_client_id: number,
      fiscal_name: string,
      fiscal_number: string,
      is_physical_person: boolean,
      activity: string,
      born_date: Date,
      observations: string,

      is_coupon_product: boolean,
      is_invoice_product: boolean,
      is_system_product: boolean,
      is_society_product: boolean,
      is_physical_person_product: boolean,

      is_balance_product: boolean,
      is_risk_product: boolean,
      is_pyme_product: boolean,

      payment_type: PaymentTypeDTO,
      risk_product?: RiskProductDTO,
      balance_product?: BalanceProductDTO,
      pyme_product?: PymeProductDTO,
   ) {
      this.commercial_client_id = commercial_client_id;
      this.fiscal_name = fiscal_name;
      this.fiscal_number = fiscal_number;
      this.is_physical_person = is_physical_person;
      this.activity = activity;
      this.born_date = born_date;
      this.observations = observations;
      this.is_coupon_product = is_coupon_product;
      this.is_invoice_product = is_invoice_product;
      this.is_system_product = is_system_product;
      this.is_society_product = is_society_product;
      this.is_physical_person_product = is_physical_person_product;
      this.is_balance_product = is_balance_product;
      this.is_risk_product = is_risk_product;
      this.is_pyme_product = is_pyme_product;
      this.payment_type = payment_type;
      this.risk_product = risk_product;
      this.balance_product = balance_product;
      this.pyme_product = pyme_product;
   }
}
