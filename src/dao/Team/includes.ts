import { ITeamAssociations } from './interface';

export const teamIncludes: {
   model: any;
   as: ITeamAssociations[keyof ITeamAssociations];
   attributes: string[];
   include?: {
      model: any;
      as: string;
      attributes: string[];
   }[];
}[] = [];
