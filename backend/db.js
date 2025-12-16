// db.js
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conectado ao MySQL com sucesso!');
    connection.release();
  } catch (error) {
    if (error.code === 'ER_BAD_DB_ERROR') {
      console.error('❌ Banco de dados "clinica_db" não existe');
    } else if (error.code === 'ECONNREFUSED') {
      console.error('❌ Não foi possível conectar ao MySQL');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('❌ Usuário ou senha do MySQL inválidos');
    } else {
      console.error('❌ Erro ao conectar no banco:', error.message);
    }
    process.exit(1);
  }
}

module.exports = {
  pool,
  testConnection
};