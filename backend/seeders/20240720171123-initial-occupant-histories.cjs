'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.bulkInsert('OccupantHistories',
            [
                {
                    "houseId": 1,
                    "occupantId": 1,
                    "type": "Menempati",
                    "createdAt": new Date()
                },
                {
                    "houseId": 2,
                    "occupantId": 2,
                    "type": "Menempati",
                    "createdAt": new Date()
                },
                {
                    "houseId": 3,
                    "occupantId": 3,
                    "type": "Menempati",
                    "createdAt": new Date()
                },
                {
                    "houseId": 4,
                    "occupantId": 4,
                    "type": "Menempati",
                    "createdAt": new Date()
                },
                {
                    "houseId": 5,
                    "occupantId": 5,
                    "type": "Menempati",
                    "createdAt": new Date()
                },
                {
                    "houseId": 6,
                    "occupantId": 6,
                    "type": "Menempati",
                    "createdAt": new Date()
                },
                {
                    "houseId": 7,
                    "occupantId": 7,
                    "type": "Menempati",
                    "createdAt": new Date()
                },
                {
                    "houseId": 8,
                    "occupantId": 8,
                    "type": "Menempati",
                    "createdAt": new Date()
                },
                {
                    "houseId": 9,
                    "occupantId": 9,
                    "type": "Menempati",
                    "createdAt": new Date()
                },
                {
                    "houseId": 10,
                    "occupantId": 10,
                    "type": "Menempati",
                    "createdAt": new Date()
                },
                {
                    "houseId": 11,
                    "occupantId": 11,
                    "type": "Menempati",
                    "createdAt": new Date()
                },
                {
                    "houseId": 12,
                    "occupantId": 12,
                    "type": "Menempati",
                    "createdAt": new Date()
                },
                {
                    "houseId": 13,
                    "occupantId": 13,
                    "type": "Menempati",
                    "createdAt": new Date()
                },
                {
                    "houseId": 14,
                    "occupantId": 14,
                    "type": "Menempati",
                    "createdAt": new Date()
                },
                {
                    "houseId": 15,
                    "occupantId": 15,
                    "type": "Menempati",
                    "createdAt": new Date()
                }
            ], {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
