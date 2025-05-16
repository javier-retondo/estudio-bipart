import {
   BALANCE,
   COMMERCIAL_CLIENT,
   DIVISION,
   DOMESTIC_SERVICE,
   GROSS_INCOME,
   MONOTRIBUTIST,
   OPERATIVE_CLIENT,
   PYME_PROD_USAGE,
   PYME_PRODUCT,
   RISK_PRODUCT,
   SOCIAL_SECURITY,
   TEAM,
   USER,
} from '../metadata';
import {
   Balance,
   CommercialClient,
   Division,
   DomesticService,
   GrossIncome,
   Monotributist,
   PymeProdUsage,
   RiskProduct,
   SocialSecurity,
   Team,
   User,
} from '../models';
import { IOperativeClientAssociations } from './interface';

export const operativeClientIncludes: {
   model: any;
   as: IOperativeClientAssociations[keyof IOperativeClientAssociations];
   attributes: string[];
   include?: { model: any; as: string; attributes: string[] }[];
}[] = [
   {
      model: CommercialClient,
      as: OPERATIVE_CLIENT.ASSOCIATIONS.COMMERCIAL_CLIENT,
      attributes: [
         COMMERCIAL_CLIENT.COLUMNS.ID,
         COMMERCIAL_CLIENT.COLUMNS.FISCAL_NAME,
         COMMERCIAL_CLIENT.COLUMNS.FISCAL_NUMBER,
      ],
   },
   {
      model: DomesticService,
      as: OPERATIVE_CLIENT.ASSOCIATIONS.DOMESTIC_SERVICE,
      attributes: Object.values(DOMESTIC_SERVICE.COLUMNS),
      include: [
         {
            model: User,
            as: DOMESTIC_SERVICE.ASSOCIATIONS.USER,
            attributes: [USER.COLUMNS.ID, USER.COLUMNS.FIRSTNAME, USER.COLUMNS.LASTNAME],
         },
      ],
   },
   {
      model: SocialSecurity,
      as: OPERATIVE_CLIENT.ASSOCIATIONS.SOCIAL_SECURITY,
      attributes: Object.values(SOCIAL_SECURITY.COLUMNS),
      include: [
         {
            model: User,
            as: SOCIAL_SECURITY.ASSOCIATIONS.USER,
            attributes: [USER.COLUMNS.ID, USER.COLUMNS.FIRSTNAME, USER.COLUMNS.LASTNAME],
         },
      ],
   },
   {
      model: RiskProduct,
      as: OPERATIVE_CLIENT.ASSOCIATIONS.RISK_PRODUCT,
      attributes: Object.values(RISK_PRODUCT.COLUMNS),
      include: [
         {
            model: Team,
            as: RISK_PRODUCT.ASSOCIATIONS.TEAM,
            attributes: Object.values(RISK_PRODUCT.COLUMNS),
         },
      ],
   },
   {
      model: Balance,
      as: OPERATIVE_CLIENT.ASSOCIATIONS.BALANCE,
      attributes: Object.values(BALANCE.COLUMNS),
      include: [
         {
            model: Team,
            as: BALANCE.ASSOCIATIONS.TEAM,
            attributes: Object.values(RISK_PRODUCT.COLUMNS),
         },
      ],
   },
   {
      model: PymeProdUsage,
      as: OPERATIVE_CLIENT.ASSOCIATIONS.PYME_PRODUCT,
      attributes: Object.values(PYME_PROD_USAGE.COLUMNS),
      include: [
         {
            model: User,
            as: PYME_PROD_USAGE.ASSOCIATIONS.USER,
            attributes: [USER.COLUMNS.ID, USER.COLUMNS.FIRSTNAME, USER.COLUMNS.LASTNAME],
         },
         {
            model: PymeProdUsage,
            as: PYME_PROD_USAGE.ASSOCIATIONS.PYME_PRODUCT,
            attributes: Object.values(PYME_PRODUCT.COLUMNS),
         },
         {
            model: GrossIncome,
            as: PYME_PROD_USAGE.ASSOCIATIONS.GROSS_INCOME,
            attributes: Object.values(GROSS_INCOME.COLUMNS),
         },
         {
            model: Monotributist,
            as: PYME_PROD_USAGE.ASSOCIATIONS.MONOTRIBUTIST,
            attributes: Object.values(MONOTRIBUTIST.COLUMNS),
         },
         {
            model: Team,
            as: PYME_PROD_USAGE.ASSOCIATIONS.TEAM,
            attributes: Object.values(TEAM.COLUMNS),
         },
         {
            model: Division,
            as: PYME_PROD_USAGE.ASSOCIATIONS.DIVISION,
            attributes: Object.values(DIVISION.COLUMNS),
         },
      ],
   },
];
