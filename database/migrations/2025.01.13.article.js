import { QueryInterface, Sequelize } from 'sequelize';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('articles', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
        });
    },
};
