'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Occupants', [
            {
                fullName: 'Ahmad Saputra',
                nik: '3322180305030001',
                ktp: 'ktp01.jpeg',
                phone: 81082083084,
                houseId: 1,
                occupacyStatus: 'Tetap',
                maritalStatus: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                fullName: 'Rina Kartika',
                nik: '3322180305030002',
                ktp: 'ktp01.jpeg',
                phone: 81082083085,
                houseId: 2,
                occupacyStatus: 'Kontrak',
                maritalStatus: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                fullName: 'Budi Santoso',
                nik: '3322180305030003',
                ktp: 'ktp01.jpeg',
                phone: 81082083086,
                houseId: 3,
                occupacyStatus: 'Tetap',
                maritalStatus: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                fullName: 'Siti Nurhaliza',
                nik: '3322180305030004',
                ktp: 'ktp01.jpeg',
                phone: 81082083087,
                houseId: 4,
                occupacyStatus: 'Kontrak',
                maritalStatus: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                fullName: 'Andi Wijaya',
                nik: '3322180305030005',
                ktp: 'ktp01.jpeg',
                phone: 81082083088,
                houseId: 5,
                occupacyStatus: 'Tetap',
                maritalStatus: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                fullName: 'Dewi Lestari',
                nik: '3322180305030006',
                ktp: 'ktp01.jpeg',
                phone: 81082083089,
                houseId: 6,
                occupacyStatus: 'Kontrak',
                maritalStatus: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                fullName: 'Joko Prasetyo',
                nik: '3322180305030007',
                ktp: 'ktp01.jpeg',
                phone: 81082083090,
                houseId: 7,
                occupacyStatus: 'Tetap',
                maritalStatus: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                fullName: 'Putri Maharani',
                nik: '3322180305030008',
                ktp: 'ktp01.jpeg',
                phone: 81082083091,
                houseId: 8,
                occupacyStatus: 'Kontrak',
                maritalStatus: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                fullName: 'Rudi Hartono',
                nik: '3322180305030009',
                ktp: 'ktp01.jpeg',
                phone: 81082083092,
                houseId: 9,
                occupacyStatus: 'Tetap',
                maritalStatus: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                fullName: 'Anisa Rahma',
                nik: '3322180305030010',
                ktp: 'ktp01.jpeg',
                phone: 81082083093,
                houseId: 10,
                occupacyStatus: 'Kontrak',
                maritalStatus: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                fullName: 'Dedi Gunawan',
                nik: '3322180305030011',
                ktp: 'ktp01.jpeg',
                phone: 81082083094,
                houseId: 11,
                occupacyStatus: 'Tetap',
                maritalStatus: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                fullName: 'Fitri Ayu',
                nik: '3322180305030012',
                ktp: 'ktp01.jpeg',
                phone: 81082083095,
                houseId: 12,
                occupacyStatus: 'Kontrak',
                maritalStatus: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                fullName: 'Agus Salim',
                nik: '3322180305030013',
                ktp: 'ktp01.jpeg',
                phone: 81082083096,
                houseId: 13,
                occupacyStatus: 'Tetap',
                maritalStatus: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                fullName: 'Lili Puspita',
                nik: '3322180305030014',
                ktp: 'ktp01.jpeg',
                phone: 81082083097,
                houseId: 14,
                occupacyStatus: 'Kontrak',
                maritalStatus: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                fullName: 'Hendra Kusuma',
                nik: '3322180305030015',
                ktp: 'ktp01.jpeg',
                phone: 81082083098,
                houseId: 15,
                occupacyStatus: 'Tetap',
                maritalStatus: true,
                createdAt: new Date(),
                updatedAt: new Date()
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
