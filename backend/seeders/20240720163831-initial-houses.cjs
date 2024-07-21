'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Houses', [
            {
                code: 'NO01',
                address: 'Jl. Nangka No. 1',
                occupied: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                image: 'house-dummy.png'
            },
            {
                code: 'NO02',
                address: 'Jl. Nangka No. 2',
                occupied: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                image: 'house-dummy.png'
            },
            {
                code: 'NO03',
                address: 'Jl. Nangka No. 3',
                occupied: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                image: 'house-dummy.png'
            },
            {
                code: 'NO04',
                address: 'Jl. Nangka No. 4',
                occupied: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                image: 'house-dummy.png'
            },
            {
                code: 'NO05',
                address: 'Jl. Nangka No. 5',
                occupied: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                image: 'house-dummy.png'
            },
            {
                code: 'NO06',
                address: 'Jl. Nangka No. 6',
                occupied: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                image: 'house-dummy.png'
            },
            {
                code: 'NO07',
                address: 'Jl. Nangka No. 7',
                occupied: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                image: 'house-dummy.png'
            },
            {
                code: 'NO08',
                address: 'Jl. Nangka No. 8',
                occupied: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                image: 'house-dummy.png'
            },
            {
                code: 'NO09',
                address: 'Jl. Nangka No. 9',
                occupied: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                image: 'house-dummy.png'
            },
            {
                code: 'NO10',
                address: 'Jl. Nangka No. 10',
                occupied: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                image: 'house-dummy.png'
            },
            {
                code: 'NO11',
                address: 'Jl. Nangka No. 11',
                occupied: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                image: 'house-dummy.png'
            },
            {
                code: 'NO12',
                address: 'Jl. Nangka No. 12',
                occupied: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                image: 'house-dummy.png'
            },
            {
                code: 'NO13',
                address: 'Jl. Nangka No. 13',
                occupied: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                image: 'house-dummy.png'
            },
            {
                code: 'NO14',
                address: 'Jl. Nangka No. 14',
                occupied: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                image: 'house-dummy.png'
            },
            {
                code: 'NO15',
                address: 'Jl. Nangka No. 15',
                occupied: true,
                createdAt: new Date(),
                updatedAt: new Date(),
                image: 'house-dummy.png'
            },
            {
                code: 'NO16',
                address: 'Jl. Nangka No. 16',
                occupied: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                image: 'house-dummy.png'
            },
            {
                code: 'NO17',
                address: 'Jl. Nangka No. 17',
                occupied: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                image: 'house-dummy.png'
            },
            {
                code: 'NO18',
                address: 'Jl. Nangka No. 18',
                occupied: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                image: 'house-dummy.png'
            },
            {
                code: 'NO19',
                address: 'Jl. Nangka No. 19',
                occupied: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                image: 'house-dummy.png'
            },
            {
                code: 'NO20',
                address: 'Jl. Nangka No. 20',
                occupied: false,
                createdAt: new Date(),
                updatedAt: new Date(),
                image: 'house-dummy.png'
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
