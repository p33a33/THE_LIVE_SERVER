'use strict';
const crypto = require('crypto')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let datas = [];
   for(let i = 0; i < 10; i++){
     let obj = {
       email: "test" + i + "@test.com",
       password: crypto.createHmac('sha256', '4bproject')
       .update("1234")
       .digest("base64"),
       fullname: "g"+i,
       nickname: "N"+(i+1),
       phone: "01000000000"+i,
       address: "NY"+i,
       addressDetail: "abc"+i,
       createdAt: new Date(),
       updatedAt: new Date()
     }
     datas.push(obj)
   }

   return queryInterface.bulkInsert('users', datas, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
