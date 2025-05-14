import { sequelize } from './database';
import { ConfigServer } from './environment';
import { StoreProcedures } from './storeProcedures';

const storeProcedures = new StoreProcedures(sequelize);

export { sequelize, ConfigServer, storeProcedures };
