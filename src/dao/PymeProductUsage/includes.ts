import { IPymeProdUsageAssociations } from './interface';

export const pymeProdUsageIncludes: {
   model: any;
   as: IPymeProdUsageAssociations[keyof IPymeProdUsageAssociations];
   attributes: string[];
   include?: { model: any; as: string; attributes: string[] }[];
}[] = [];
