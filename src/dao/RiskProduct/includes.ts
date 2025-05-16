import { Team } from '../models';
import { IRiskProductAssociations } from './interface';
import { RISK_PRODUCT } from './metadata';

export const riskIncludes: {
   model: any;
   as: IRiskProductAssociations[keyof IRiskProductAssociations];
   attributes: string[];
   include?: { model: any; as: string; attributes: string[] }[];
}[] = [
   {
      model: Team,
      as: RISK_PRODUCT.ASSOCIATIONS.TEAM,
      attributes: Object.values(RISK_PRODUCT.COLUMNS),
   },
];
