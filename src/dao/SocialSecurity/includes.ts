import { ISocialSecurityAssociations } from './interface';

export const socialSecurityIncludes: {
   model: any;
   as: ISocialSecurityAssociations[keyof ISocialSecurityAssociations];
   attributes: string[];
   include?: { model: any; as: string; attributes: string[] }[];
}[] = [];
