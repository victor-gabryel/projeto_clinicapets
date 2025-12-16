# 🐾 Projeto Clínica Pets

O **Projeto Clínica Pets** é uma aplicação web desenvolvida para o gerenciamento de uma clínica veterinária.
O sistema permite o controle de **donos**, **pets** e **consultas veterinárias**, oferecendo uma interface simples e funcional para organização do atendimento.

---

## 📌 Funcionalidades

### 👤 Donos

* Cadastrar donos de pets
* Editar informações
* Excluir donos (respeitando integridade do banco)

### 🐶 Pets

* Cadastrar pets vinculados a um dono
* Editar dados do pet
* Excluir pets (quando não possuem consultas)

### 🩺 Consultas

* Agendar consultas veterinárias
* Atualizar status da consulta:

  * **AGENDADA**
  * **REALIZADA**
  * **CANCELADA**
* Excluir consultas

---

## 🛠️ Tecnologias Utilizadas

### Frontend

* React.js
* React Router DOM
* Axios
* CSS

### Backend

* Node.js
* Express
* MySQL
* Nodemon

### Banco de Dados

* MySQL
* Chaves estrangeiras para integridade referencial

---

## 🗂️ Estrutura do Projeto

```
projeto_clinicapets/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── db.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.js
│   └── package.json
│
└── database/
    └── clinica_db.sql
```

---

## ⚙️ Configuração do Projeto

### 🔹 Backend

1. Acesse a pasta do backend:

```bash
cd backend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure o banco de dados no arquivo `db.js`

4. Inicie o servidor:

```bash
npm run dev
```

---

### 🔹 Frontend

1. Acesse a pasta do frontend:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie a aplicação:

```bash
npm start
```

---

## 🗄️ Banco de Dados

* O banco utilizado é o **MySQL**
* O script SQL está disponível em:

```
/database/clinica_db.sql
```

Ele contém:

* Criação das tabelas
* Relacionamentos
* Dados iniciais para teste

---

## 🎯 Objetivo do Projeto

Este projeto foi desenvolvido com fins **educacionais**, visando aplicar na prática conceitos como:

* CRUD
* APIs
* Relacionamentos entre tabelas
* Integração Frontend + Backend

---

## 👨‍💻 Autor

Projeto desenvolvido por **Victor Gabryel da Silva**
Estudante de Desenvolvimento de Sistemas

---

## 📄 Licença

Este projeto é de uso acadêmico e livre para estudos.