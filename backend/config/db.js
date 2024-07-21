import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";
configDotenv()

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT, 
        operatorsAliases: 0, 
        timezone: "+07:00"
    }
);

export default sequelize;