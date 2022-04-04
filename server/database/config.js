module.exports = {
    HOST: "database",
    USER: "postgres",
    PORT: 5432,
    PASSWORD: "kaushik",
    DB: "Mentorship",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};