import { QueryInterface } from 'sequelize';

const tableName = 'Users';
const columnName = 'role';
export const up = (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.addColumn(tableName, columnName, {
        type: Sequelize.INTEGER
    });
};
export const down = (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.removeColumn(tableName, columnName);
};
