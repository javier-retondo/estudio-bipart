import {
   Includeable,
   Model,
   ProjectionAlias,
   Transaction,
   WhereOptions,
   col,
   literal,
} from 'sequelize';
import { attributesBuilder } from '../../utils/transformers/attrbuteBuilder';
export const PAGE_LIMIT = 1000;
export abstract class EntityFinder<T, U, V> {
   abstract model: any;
   abstract tableName: string;
   abstract columns: V | string[];
   abstract associations: {
      model: typeof Model;
      as: U[keyof U] | string;
      attributes: string[];
      toMany?: boolean;
      include?: {
         model: typeof Model;
         as: string;
         attributes: string[];
      }[];
   }[];

   attributesBuilder = (
      tableColumns: {
         columns: (keyof T)[] | string[];
         table: string;
         flat: boolean;
      }[],
   ): { attributes: ProjectionAlias[]; groups: string[] } => {
      const result = tableColumns.map(({ columns, table, flat }) => {
         if (flat) {
            const groups: string[] = Object.values(columns).map((column) => `${table}.${column}`);
            const attributes: ProjectionAlias[] = Object.values(columns).map((column) => [
               col(`${table}.${column}`),
               column,
            ]);
            return { attributes, groups };
         } else {
            const groups: string[] = Object.values(columns).map((column) => `${table}.${column}`);
            const attributes: ProjectionAlias[] = Object.values(columns).map((column) => [
               col(`${table}.${column}`),
               `${table}.${column}`,
            ]);
            return { attributes, groups };
         }
      });

      return result.reduce(
         (acc, { attributes, groups }) => {
            acc.attributes.push(...attributes);
            acc.groups.push(...groups);
            return acc;
         },
         { attributes: [], groups: [] } as { attributes: ProjectionAlias[]; groups: string[] },
      );
   };

   attributtesBuilder(
      attributes: (keyof T)[],
      customAttributes?: [ReturnType<typeof literal>, string][],
      includes?: {
         association: V[keyof V] | string;
         attributes: string[];
         flat: boolean;
         include?: {
            association: string;
            attributes: string[];
            flat: boolean;
         }[];
      }[],
   ): { attributes: ProjectionAlias[]; groups: string[] } {
      const beneficiosAttributes = this.attributesBuilder([
         { columns: attributes, table: this.tableName, flat: true },
      ]);

      const flatIncludes = includes?.filter((attr) => attr.flat);

      const flatAssociationsAttributes = flatIncludes?.map((include) => {
         return attributesBuilder([
            {
               columns: include.attributes,
               table: include.association as string,
               flat: include.flat,
            },
         ]);
      });

      const flatAssociationsAttributesInclude = includes
         ?.filter((inc) => inc.include)
         .map((include) => {
            return include.include?.map((attr) => {
               return attributesBuilder([
                  {
                     columns: attr.attributes,
                     table: `${include.association}->${attr.association}`,
                     flat: attr.flat,
                     optionalTable: include.association as string,
                  },
               ]);
            });
         });

      const allAttributes = {
         attributes:
            flatAssociationsAttributes && includes
               ? [
                    ...beneficiosAttributes.attributes,
                    ...flatAssociationsAttributes.map((attr) => attr.attributes).flat(),
                 ]
               : beneficiosAttributes.attributes,

         groups: flatAssociationsAttributes?.length
            ? [
                 ...beneficiosAttributes.groups,
                 ...flatAssociationsAttributes.map((attr) => attr.groups).flat(),
              ]
            : [...beneficiosAttributes.groups],
      };

      if (flatAssociationsAttributesInclude && flatAssociationsAttributesInclude.length > 0) {
         allAttributes.attributes = [
            ...allAttributes.attributes,
            ...flatAssociationsAttributesInclude
               .map((attr) => (attr ? attr.map((a) => a.attributes).flat() : []))
               .flat(),
         ];
      }

      if (customAttributes) {
         allAttributes.attributes = [...allAttributes.attributes, ...customAttributes];
      }
      return allAttributes;
   }

   includeBuilder(
      associations: {
         model: typeof Model;
         as: U[keyof U] | string;
         attributes: string[];
         toMany?: boolean;
         through?: boolean;
         include?: {
            model: typeof Model;
            as: string;
            attributes: string[];
         }[];
      }[],
      includes?: {
         association: V[keyof V] | string;
         attributes: string[];
         flat: boolean;
         where?: WhereOptions<V>;
         required?: boolean;
         right?: boolean;
         include?: {
            association: string;
            attributes: string[];
            flat: boolean;
            where?: WhereOptions<V>;
            required?: boolean;
         }[];
      }[],
   ): Includeable[] | undefined | any {
      if (!includes) return undefined;

      const includesToMany = includes.filter((include) =>
         associations.find(
            (association) => include.association === association.as && association.toMany,
         ),
      );

      const includesToOne = includes.filter((include) =>
         associations.find(
            (association) => include.association === association.as && !association.toMany,
         ),
      );

      const toMany = includesToMany
         ? includesToMany.map((include) => {
              const association = associations.find(
                 (association) => include.association === association.as && association.toMany,
              );
              if (association) {
                 if (include.include) {
                    return {
                       model: association.model,
                       through: association.through
                          ? {
                               attributes: [],
                            }
                          : undefined,
                       attributes:
                          includes?.find(
                             (attr) => attr.association === association.as && !attr.flat,
                          )?.attributes || [],
                       as: association.as,
                       include:
                          includes?.find((attr) => attr.association === association.as)?.include ||
                          [],
                       where: include.where,
                       required: include.required,
                       right: include.right,
                    };
                 } else {
                    return {
                       model: association.model,
                       through: association.through
                          ? {
                               attributes: [],
                            }
                          : undefined,
                       attributes:
                          includes?.find(
                             (attr) => attr.association === association.as && !attr.flat,
                          )?.attributes || [],
                       as: association.as,
                       where: include.where,
                       required: include.required,
                       right: include.right,
                    };
                 }
              }
           })
         : [];

      const toOne = includesToOne
         ? includesToOne.map((include) => {
              const association = associations.find(
                 (association) => include.association === association.as && !association.toMany,
              );
              if (association) {
                 if (include.include) {
                    return {
                       model: association.model,
                       through: association.through
                          ? {
                               attributes: [],
                            }
                          : undefined,
                       attributes:
                          includes?.find(
                             (attr) => attr.association === association.as && !attr.flat,
                          )?.attributes || [],
                       as: association.as,
                       include:
                          includes?.find((attr) => attr.association === association.as)?.include ||
                          [],
                       where: include.where,
                       required: include.required,
                       right: include.right,
                    };
                 } else {
                    return {
                       model: association.model,
                       through: association.through
                          ? {
                               attributes: [],
                            }
                          : undefined,
                       attributes:
                          includes?.find(
                             (attr) => attr.association === association.as && !attr.flat,
                          )?.attributes || [],
                       as: association.as,
                       where: include.where,
                       required: include.required,
                       right: include.right,
                    };
                 }
              }
           })
         : [];

      return {
         toMany,
         toOne,
      };
   }

   orderBuilder(
      defaultCol: string,
      pageNumber = 1,
      pageSize = PAGE_LIMIT,
      orderBy?: string,
      sortDesc?: boolean,
   ): [any] {
      const ITEMS_PAGE = pageSize ? pageSize : 10;
      const OFFSET = (pageNumber - 1) * ITEMS_PAGE;
      let order = `${this.tableName}.${defaultCol}`;
      if (orderBy) {
         if (orderBy.includes('.')) {
            const table = orderBy.split('.')[0];
            const column = orderBy.split('.')[1];
            if (table === '') {
               order = `${column}`;
            } else {
               order = `${table}.${column}`;
            }
         } else {
            order = `${this.tableName}.${orderBy}`;
         }
      }

      return [
         literal(`${order} ${sortDesc ? 'DESC' : 'ASC'} OFFSET ${OFFSET} LIMIT ${ITEMS_PAGE}`),
      ];
   }

   async findEntity(entity_id: number): Promise<T> {
      return await this.model
         .findByPk(entity_id)
         .then((data: { get: any }) => {
            return data.get();
         })
         .catch((error: any) => {
            console.error(`Error al buscar el ${this.tableName}`, error);
            throw error;
         });
   }

   async findEntities(findOptionsRequest: {
      attributes: (keyof T)[];
      customAttributes?: [any, string][];
      where?: WhereOptions<T>;
      includes?: {
         association: V[keyof V];
         attributes: string[];
         flat: boolean;
         where?: WhereOptions<V>;
         required?: boolean;
         right?: boolean;
         include?: {
            association: string;
            attributes: string[];
            flat: boolean;
            where?: WhereOptions<V>;
            required?: boolean;
         }[];
      }[];
      sortBy?: keyof T | string;
      sortDesc?: boolean;
      page?: number;
      pageSize?: number;
      grouped?: boolean;
      idsFromToMany?: boolean;
      onlyCount?: boolean;
      transaction?: Transaction;
      transformResults?: (data: T[]) => T[];
   }): Promise<{ rows: T[]; count: number }> {
      const {
         attributes,
         customAttributes,
         where,
         includes,
         sortBy,
         sortDesc,
         page,
         pageSize,
         grouped,
         idsFromToMany,
         onlyCount,
         transaction,
         transformResults,
      } = findOptionsRequest;

      const allAttributes = this.attributtesBuilder(attributes, customAttributes, includes);

      const include = this.includeBuilder(this.associations, includes);

      const allIncludes = [];

      if (include && include.toMany) {
         allIncludes.push(...include.toMany);
      }

      if (include && include.toOne) {
         allIncludes.push(...include.toOne);
      }

      let rows;
      let transformedRows;

      if (!onlyCount) {
         if (include && include.toMany.length > 0) {
            const ids = await this.model
               .findAll({
                  attributes: allAttributes.attributes[0],
                  where: where,
                  include: include ? include.toOne : undefined,
                  group: grouped ? allAttributes.groups : undefined,
                  order: this.orderBuilder(
                     Object.values(this.columns as string[])[0],
                     page,
                     pageSize,
                     sortBy as string,
                     sortDesc,
                  ),
                  transaction: transaction,
               })
               .then((data: { get: any }[]) => data.map((item) => item.get()))
               .catch(async (error: any) => {
                  const errorLog = {
                     tableName: this.tableName,
                     message: error.message || 'Error desconocido',
                     sql: error?.sql || 'No disponible',
                     parameters: JSON.stringify(error?.parameters || {}),
                     stack: error.stack,
                  };

                  if (transaction) await transaction.rollback();
                  throw errorLog;
               });

            rows = await this.model
               .findAll({
                  attributes: allAttributes.attributes,
                  where: {
                     [attributes[0]]: ids.map((id: any) => id[attributes[0]]),
                  },
                  include: include ? allIncludes : undefined,
                  group: grouped ? allAttributes.groups : undefined,
                  order: this.orderBuilder(
                     Object.values(this.columns as string[])[0],
                     1,
                     PAGE_LIMIT,
                     sortBy as string,
                     sortDesc,
                  ),
                  transaction: transaction,
               })
               .then((data: { get: any }[]) =>
                  data.map((item) => {
                     if (idsFromToMany) {
                        const itemData = item.get();
                        for (const key in itemData) {
                           if (Array.isArray(itemData[key])) {
                              const firstKey = itemData[key]?.[0]?.dataValues
                                 ? Object.keys(itemData[key][0].dataValues)[0]
                                 : key;

                              itemData[firstKey] = itemData[key].map((item: any) => {
                                 if (item && typeof item === 'object' && 'dataValues' in item) {
                                    const firstValueKey = Object.keys(item.dataValues)[0];
                                    return Number(item.dataValues[firstValueKey] || 0);
                                 }
                                 return 0;
                              });
                              delete itemData[key];
                           }
                        }
                     }
                     return item.get();
                  }),
               )
               .catch(async (error: any) => {
                  const errorLog = {
                     tableName: this.tableName,
                     message: error.message || 'Error desconocido',
                     sql: error?.sql || 'No disponible',
                     parameters: JSON.stringify(error?.parameters || {}),
                     stack: error.stack,
                  };

                  if (transaction) await transaction.rollback();
                  throw errorLog;
               });
         } else {
            rows = await this.model
               .findAll({
                  attributes: allAttributes.attributes,
                  where,
                  include: include ? allIncludes : undefined,
                  group: grouped ? allAttributes.groups : undefined,
                  order: this.orderBuilder(
                     Object.values(this.columns as string[])[0],
                     page,
                     pageSize,
                     sortBy as string,
                     sortDesc,
                  ),
                  transaction: transaction,
               })
               .then((data: { get: any }[]) =>
                  data.map((item) => {
                     if (idsFromToMany) {
                        const itemData = item.get();
                        for (const key in itemData) {
                           if (Array.isArray(itemData[key])) {
                              const firstKey = itemData[key]?.[0]?.dataValues
                                 ? Object.keys(itemData[key][0].dataValues)[0]
                                 : key;

                              itemData[firstKey] = itemData[key].map((item: any) => {
                                 if (item && typeof item === 'object' && 'dataValues' in item) {
                                    const firstValueKey = Object.keys(item.dataValues)[0];
                                    return Number(item.dataValues[firstValueKey] || 0);
                                 }
                                 return 0;
                              });
                              delete itemData[key];
                           }
                        }
                     }
                     return item.get();
                  }),
               )
               .catch(async (error: any) => {
                  const errorLog = {
                     tableName: this.tableName,
                     message: error.message || 'Error desconocido',
                     sql: error?.sql || 'No disponible',
                     parameters: JSON.stringify(error?.parameters || {}),
                     stack: error.stack,
                  };

                  if (transaction) await transaction.rollback();
                  throw errorLog;
               });
         }
         transformedRows = transformResults ? transformResults(rows) : rows;
      }

      let count = onlyCount ? 0 : rows.length;

      if (pageSize || onlyCount) {
         if ((!onlyCount && pageSize && page === 1 && count < pageSize) || pageSize === 1) {
            count = rows.length;
         } else {
            count = grouped
               ? await this.model
                    .count({
                       where: where,
                       include: include ? include.toOne : undefined,
                       group: allAttributes.groups,
                       transaction,
                    })
                    .then((data: any[]) => data.length)
                    .catch(async (error: any) => {
                       const errorLog = {
                          tableName: this.tableName,
                          message: error.message || 'Error desconocido',
                          sql: error?.sql || 'No disponible',
                          parameters: JSON.stringify(error?.parameters || {}),
                          stack: error.stack,
                       };

                       if (transaction) await transaction.rollback();
                       throw errorLog;
                    })
               : await this.model
                    .count({
                       where: where,
                       include: include ? include.toOne : undefined,
                       transaction,
                    })
                    .then((data: number) => data)
                    .catch(async (error: any) => {
                       const errorLog = {
                          tableName: this.tableName,
                          message: error.message || 'Error desconocido',
                          sql: error?.sql || 'No disponible',
                          parameters: JSON.stringify(error?.parameters || {}),
                          stack: error.stack,
                       };

                       if (transaction) await transaction.rollback();
                       throw errorLog;
                    });
         }
      }
      return { rows: transformedRows, count };
   }
}
