'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.bulkInsert('PaymentHistories',
            [
                {
                    "houseId": 1,
                    "occupantId": 1,
                    "amount": 200000,
                    "type": "satpam",
                    "startDate": "2024-02-01",
                    "endDate": "2024-02-29",
                    "createdAt": new Date()
                },
                {
                    "houseId": 2,
                    "occupantId": 2,
                    "amount": 200000,
                    "type": "satpam",
                    "startDate": "2024-05-01",
                    "endDate": "2024-05-31",
                    "createdAt": new Date()
                },
                {
                    "houseId": 3,
                    "occupantId": 3,
                    "amount": 200000,
                    "type": "satpam",
                    "startDate": "2024-09-01",
                    "endDate": "2024-09-30",
                    "createdAt": new Date()
                },
                {
                    "houseId": 4,
                    "occupantId": 4,
                    "amount": 200000,
                    "type": "satpam",
                    "startDate": "2024-03-01",
                    "endDate": "2024-03-31",
                    "createdAt": new Date()
                },
                {
                    "houseId": 5,
                    "occupantId": 5,
                    "amount": 200000,
                    "type": "satpam",
                    "startDate": "2024-06-01",
                    "endDate": "2024-06-30",
                    "createdAt": new Date()
                },
                {
                    "houseId": 6,
                    "occupantId": 6,
                    "amount": 200000,
                    "type": "satpam",
                    "startDate": "2024-11-01",
                    "endDate": "2024-11-30",
                    "createdAt": new Date()
                },
                {
                    "houseId": 7,
                    "occupantId": 7,
                    "amount": 200000,
                    "type": "satpam",
                    "startDate": "2024-04-01",
                    "endDate": "2024-04-30",
                    "createdAt": new Date()
                },
                {
                    "houseId": 8,
                    "occupantId": 8,
                    "amount": 200000,
                    "type": "satpam",
                    "startDate": "2024-10-01",
                    "endDate": "2024-10-31",
                    "createdAt": new Date()
                },
                {
                    "houseId": 9,
                    "occupantId": 9,
                    "amount": 200000,
                    "type": "satpam",
                    "startDate": "2024-01-01",
                    "endDate": "2024-01-31",
                    "createdAt": new Date()
                },
                {
                    "houseId": 10,
                    "occupantId": 10,
                    "amount": 200000,
                    "type": "satpam",
                    "startDate": "2024-12-01",
                    "endDate": "2024-12-31",
                    "createdAt": new Date()
                },
                {
                    "houseId": 11,
                    "occupantId": 11,
                    "amount": 200000,
                    "type": "satpam",
                    "startDate": "2024-07-01",
                    "endDate": "2024-07-31",
                    "createdAt": new Date()
                },
                {
                    "houseId": 12,
                    "occupantId": 12,
                    "amount": 200000,
                    "type": "satpam",
                    "startDate": "2024-08-01",
                    "endDate": "2024-08-31",
                    "createdAt": new Date()
                },
                {
                    "houseId": 13,
                    "occupantId": 13,
                    "amount": 200000,
                    "type": "satpam",
                    "startDate": "2024-05-01",
                    "endDate": "2024-05-31",
                    "createdAt": new Date()
                },
                {
                    "houseId": 14,
                    "occupantId": 14,
                    "amount": 200000,
                    "type": "satpam",
                    "startDate": "2024-09-01",
                    "endDate": "2024-09-30",
                    "createdAt": new Date()
                },
                {
                    "houseId": 15,
                    "occupantId": 15,
                    "amount": 200000,
                    "type": "satpam",
                    "startDate": "2024-04-01",
                    "endDate": "2024-04-30",
                    "createdAt": new Date()
                },
                {
                    "houseId": 6,
                    "occupantId": 6,
                    "amount": 100000,
                    "type": "satpam",
                    "startDate": "2024-07-01",
                    "endDate": "2024-07-31",
                    "createdAt": new Date()
                },
                {
                    "houseId": 7,
                    "occupantId": 7,
                    "amount": 100000,
                    "type": "satpam",
                    "startDate": "2024-08-01",
                    "endDate": "2024-08-31",
                    "createdAt": new Date()
                },
                {
                    "houseId": 8,
                    "occupantId": 8,
                    "amount": 100000,
                    "type": "satpam",
                    "startDate": "2024-02-01",
                    "endDate": "2024-02-29",
                    "createdAt": new Date()
                },
                {
                    "houseId": 9,
                    "occupantId": 9,
                    "amount": 100000,
                    "type": "satpam",
                    "startDate": "2024-01-01",
                    "endDate": "2024-01-31",
                    "createdAt": new Date()
                },
                {
                    "houseId": 10,
                    "occupantId": 10,
                    "amount": 100000,
                    "type": "satpam",
                    "startDate": "2024-12-01",
                    "endDate": "2024-12-31",
                    "createdAt": new Date()
                },
                {
                    "houseId": 11,
                    "occupantId": 11,
                    "amount": 100000,
                    "type": "satpam",
                    "startDate": "2024-05-01",
                    "endDate": "2024-05-31",
                    "createdAt": new Date()
                },
                {
                    "houseId": 12,
                    "occupantId": 12,
                    "amount": 100000,
                    "type": "satpam",
                    "startDate": "2024-06-01",
                    "endDate": "2024-06-30",
                    "createdAt": new Date()
                },
                {
                    "houseId": 13,
                    "occupantId": 13,
                    "amount": 100000,
                    "type": "satpam",
                    "startDate": "2024-04-01",
                    "endDate": "2024-04-30",
                    "createdAt": new Date()
                },
                {
                    "houseId": 14,
                    "occupantId": 14,
                    "amount": 100000,
                    "type": "satpam",
                    "startDate": "2024-11-01",
                    "endDate": "2024-11-30",
                    "createdAt": new Date()
                },
                {
                    "houseId": 15,
                    "occupantId": 15,
                    "amount": 100000,
                    "type": "satpam",
                    "startDate": "2024-10-01",
                    "endDate": "2024-10-31",
                    "createdAt": new Date()
                },
                {
                    "houseId": 1,
                    "occupantId": 1,
                    "amount": 15000,
                    "type": "kebersihan",
                    "startDate": "2024-01-01",
                    "endDate": "2024-01-31",
                    "createdAt": new Date()
                },
                {
                    "houseId": 2,
                    "occupantId": 2,
                    "amount": 15000,
                    "type": "kebersihan",
                    "startDate": "2024-02-01",
                    "endDate": "2024-02-29",
                    "createdAt": new Date()
                },
                {
                    "houseId": 3,
                    "occupantId": 3,
                    "amount": 15000,
                    "type": "kebersihan",
                    "startDate": "2024-03-01",
                    "endDate": "2024-03-31",
                    "createdAt": new Date()
                },
                {
                    "houseId": 4,
                    "occupantId": 4,
                    "amount": 15000,
                    "type": "kebersihan",
                    "startDate": "2024-04-01",
                    "endDate": "2024-04-30",
                    "createdAt": new Date()
                },
                {
                    "houseId": 5,
                    "occupantId": 5,
                    "amount": 15000,
                    "type": "kebersihan",
                    "startDate": "2024-05-01",
                    "endDate": "2024-05-31",
                    "createdAt": new Date()
                },
                {
                    "houseId": 6,
                    "occupantId": 6,
                    "amount": 15000,
                    "type": "kebersihan",
                    "startDate": "2024-06-01",
                    "endDate": "2024-06-30",
                    "createdAt": new Date()
                },
                {
                    "houseId": 7,
                    "occupantId": 7,
                    "amount": 15000,
                    "type": "kebersihan",
                    "startDate": "2024-07-01",
                    "endDate": "2024-07-31",
                    "createdAt": new Date()
                },
                {
                    "houseId": 8,
                    "occupantId": 8,
                    "amount": 15000,
                    "type": "kebersihan",
                    "startDate": "2024-08-01",
                    "endDate": "2024-08-31",
                    "createdAt": new Date()
                },
                {
                    "houseId": 9,
                    "occupantId": 9,
                    "amount": 15000,
                    "type": "kebersihan",
                    "startDate": "2024-09-01",
                    "endDate": "2024-09-30",
                    "createdAt": new Date()
                },
                {
                    "houseId": 10,
                    "occupantId": 10,
                    "amount": 15000,
                    "type": "kebersihan",
                    "startDate": "2024-10-01",
                    "endDate": "2024-10-31",
                    "createdAt": new Date()
                },
                {
                    "houseId": 11,
                    "occupantId": 11,
                    "amount": 15000,
                    "type": "kebersihan",
                    "startDate": "2024-11-01",
                    "endDate": "2024-11-30",
                    "createdAt": new Date()
                },
                {
                    "houseId": 12,
                    "occupantId": 12,
                    "amount": 15000,
                    "type": "kebersihan",
                    "startDate": "2024-12-01",
                    "endDate": "2024-12-31",
                    "createdAt": new Date()
                },
                {
                    "houseId": 13,
                    "occupantId": 13,
                    "amount": 15000,
                    "type": "kebersihan",
                    "startDate": "2024-01-01",
                    "endDate": "2024-01-31",
                    "createdAt": new Date()
                },
                {
                    "houseId": 14,
                    "occupantId": 14,
                    "amount": 15000,
                    "type": "kebersihan",
                    "startDate": "2024-02-01",
                    "endDate": "2024-02-29",
                    "createdAt": new Date()
                },
                {
                    "houseId": 15,
                    "occupantId": 15,
                    "amount": 15000,
                    "type": "kebersihan",
                    "startDate": "2024-03-01",
                    "endDate": "2024-03-31",
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
