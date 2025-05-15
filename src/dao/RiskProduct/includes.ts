import { IRiskProductAssociations } from './interface';

export const riskIncludes: {
   model: any;
   as: IRiskProductAssociations[keyof IRiskProductAssociations];
   attributes: string[];
   include?: { model: any; as: string; attributes: string[] }[];
}[] = [];
