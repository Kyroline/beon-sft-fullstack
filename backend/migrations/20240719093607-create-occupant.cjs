'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Occupants', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nik: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            fullName: {
                allowNull: false,
                type: Sequelize.STRING
            },
            ktp: {
                allowNull: false,
                type: Sequelize.STRING
            },
            phone: {
                allowNull: false,
                type: Sequelize.BIGINT
            },
            houseId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Houses',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
                defaultValue: null
            },
            occupacyStatus: {
                allowNull: false,
                type: Sequelize.STRING
            },
            maritalStatus: {
                allowNull: false,
                type: Sequelize.BOOLEAN
            },
            createdAt: {
                allowNull: true,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE
            }
        })
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Occupants');
    }
};