import { IDomesticServiceAssociations } from './interface';

export const domesticServiceIncludes: {
   model: any;
   as: IDomesticServiceAssociations[keyof IDomesticServiceAssociations];
   attributes: string[];
   include?: { model: any; as: string; attributes: string[] }[];
}[] = [];
