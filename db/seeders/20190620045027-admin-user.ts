import { QueryInterface } from 'sequelize';

const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const encryptedPass = bcrypt.hashSync('admin', salt);

export const up = (queryInterface: QueryInterface, Sequelize: any) => {
    /*
         Add altering commands here.
         Return a promise to correctly handle asynchronicity.

         Example:
         return queryInterface.bulkInsert('People', [{
           name: 'John Doe',
           isBetaMember: false
         }], {});
       */
    return queryInterface.bulkInsert('Users', []);
};
export const down = (queryInterface: QueryInterface, Sequelize: any) => {
    /*
       Add reverting commands here.
       Return a promise to correctly handle asynchronicity.

       Example:
       return queryInterface.bulkDelete('People', null, {});
     */
};
