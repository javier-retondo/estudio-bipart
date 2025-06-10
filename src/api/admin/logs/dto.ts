import { Transform, Type } from 'class-transformer';
import {
   IsInt,
   IsPositive,
   IsOptional,
   IsBoolean,
   IsEnum,
   IsString,
   IsDate,
} from 'class-validator';
import { LOG_TYPES } from '../../../dao/Log/interface';
import { LOG } from '../../../dao/metadata';

export enum LogOrder {
   ID = 'id',
   DATE_TIME = 'date_time',
   USER = 'user',
   TYPE = 'type',
   DESCRIPTION = 'description',
   LOG_USER = 'User.firstname',
}

const LogOrderMap: Record<string, string> = {
   [LogOrder.ID]: LOG.COLUMNS.ID,
   [LogOrder.USER]: `User.firstname`,
   [LogOrder.DATE_TIME]: LOG.COLUMNS.DATE_TIME,
   [LogOrder.TYPE]: LOG.COLUMNS.TYPE,
   [LogOrder.DESCRIPTION]: LOG.COLUMNS.DESCRIPTION,
};

export class LogsFilterDTO {
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

   @IsEnum(LogOrder)
   @IsOptional()
   @Transform(({ value }) => LogOrderMap[value] || value)
   public sortBy?: LogOrder;

   @IsBoolean()
   @IsOptional()
   @Transform(({ value }) => value === 'true' || value === true)
   public sortDesc?: boolean;

   @IsEnum(LOG_TYPES, { each: true })
   @IsOptional()
   public type?: LOG_TYPES[];

   @IsString()
   @IsOptional()
   public search?: string;

   @IsString({ each: true })
   @IsOptional()
   public method?: string[];

   @IsInt({ each: true })
   @IsOptional()
   public userId?: number[];

   @IsDate()
   @IsOptional()
   @Transform(({ value }) => {
      if (value instanceof Date) {
         const startDate = new Date(value);
         startDate.setHours(0, 0, 0, 0);
         return startDate;
      }
      return value;
   })
   @Type(() => Date)
   public startDate?: Date;

   @IsDate()
   @IsOptional()
   @Transform(({ value }) => {
      if (value instanceof Date) {
         const endDate = new Date(value);
         endDate.setHours(23, 59, 59, 999);
         return endDate;
      }
      return value;
   })
   @Type(() => Date)
   public endDate?: Date;

   constructor(
      page?: number,
      pageSize?: number,
      sortBy?: LogOrder,
      sortDesc?: boolean,
      type?: LOG_TYPES[],
      search?: string,
      method?: string[],
      userId?: number[],
      startDate?: Date,
      endDate?: Date,
   ) {
      this.page = page;
      this.pageSize = pageSize;
      this.sortBy = sortBy;
      this.sortDesc = sortDesc;
      this.type = type;
      this.search = search;
      this.method = method;
      this.userId = userId;
      this.startDate = startDate;
      this.endDate = endDate;
   }
}
