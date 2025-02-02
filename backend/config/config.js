import { configDotenv } from "dotenv";
configDotenv()

export default {
    "development": {
        "username": process.env.DB_USERNAME,
        "password": process.env.DB_PASSWORD,
        "database": process.env.DB_DATABASE,
        "host": process.env.DB_HOST,
        "dialect": process.env.DB_DIALECT,
        "dialectOptions": {
            "useUTC": false, 
        },
        "timezone": '+07:00'
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql",
        "dialectOptions": {
            "useUTC": false, 
        },
        "timezone": '+07:00'
    },
    "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql",
        "dialectOptions": {
            "useUTC": false, 
        },
        "timezone": '+07:00'
    }
}
