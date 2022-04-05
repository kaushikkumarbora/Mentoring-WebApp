module.exports = {
    HOST: "database",
    USER: process.env.POSTGRES_USER,
    PORT: 5432,
    PASSWORD: process.env.POSTGRES_PASSWORD,
    DB: process.env.POSTGRES_DB,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};