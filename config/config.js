require('dotenv').config();

//Para definir el entorno
const config = {
    env: process.env.NODE_ENV || 'dev',
    isProd: process.env.NODE_ENV || 'production',
    port: process.env.PORT || 3000,

    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbName: process.env.DB_NAME,
    dbPort: process.env.DB_PORT,

    dbUrl: process.env.DATABASE_URL,

    apiKey: process.env.API_KEY,

    jwtSecret: process.env.JWT_SECRET,

    gmailEmail: process.env.G_EMAIL,
    gmailPassword: process.env.G_PASSWORD
}
module.exports = { config };