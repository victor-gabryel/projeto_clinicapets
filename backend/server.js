require('dotenv').config();

const app = require('./app');
const { testConnection } = require('./db');

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    await testConnection();

    const server = app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`Porta ${PORT} já está em uso`);
      } else {
        console.error('Erro ao iniciar o servidor:', err);
      }
      process.exit(1);
    });

  } catch (error) {
    console.error('Falha ao iniciar a aplicação:', error);
    process.exit(1);
  }
}

startServer();
