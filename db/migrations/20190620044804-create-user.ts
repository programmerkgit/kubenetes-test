import { QueryInterface } from 'sequelize';

const tableName = 'Users';
export const up = (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.createTable(tableName, {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        }
    });
};
export const down = (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.dropTable(tableName);
};
