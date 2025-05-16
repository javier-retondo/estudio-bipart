import { OPERATIVE_CLIENT, VAT_CONDITION } from '../metadata';
import { OperativeClient, VatCondition } from '../models';
import { ICommercialClientAssociations } from './interface';
import { COMMERCIAL_CLIENT } from './metadata';

export const commercialClientIncludes: {
   model: any;
   as: ICommercialClientAssociations[keyof ICommercialClientAssociations];
   attributes: string[];
   include?: { model: any; as: string; attributes: string[] }[];
}[] = [
   {
      model: OperativeClient,
      as: COMMERCIAL_CLIENT.ASSOCIATIONS.OPERATIVE_CLIENT,
      attributes: [
         OPERATIVE_CLIENT.COLUMNS.ID,
         OPERATIVE_CLIENT.COLUMNS.FISCAL_NAME,
         OPERATIVE_CLIENT.COLUMNS.FISCAL_NUMBER,
         OPERATIVE_CLIENT.COLUMNS.IS_PHYSICAL_PERSON,
      ],
   },
   {
      model: VatCondition,
      as: COMMERCIAL_CLIENT.ASSOCIATIONS.VAT_CONDITION,
      attributes: Object.values(VAT_CONDITION.COLUMNS),
   },
];
