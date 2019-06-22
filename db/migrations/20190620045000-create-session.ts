import { QueryInterface } from 'sequelize';

const tableName = 'Sessions';
export const up = (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.createTable(tableName, {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                defaultValue: Sequelize.UUID
            },
            userId: {
                type: Sequelize.UUID,
                references: {
                    key: 'id',
                    model: 'Users'
                },
                onDelete: 'cascade'
            },
            expired: {
                type: Sequelize.BOOLEAN,
                defaultValue: false

            },
            updatedAt: Sequelize.DATE,
            createdAt: Sequelize.DATE,
        },
    );
};

export const down = (queryInterface: QueryInterface, Sequelize: any) => {
    return queryInterface.dropTable(tableName);
};
