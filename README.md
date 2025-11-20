# 🍔 Stack Burger API

API desenvolvida para o sistema de pedidos de uma hamburgueria fictícia. Este backend gerencia usuários, autenticação, pedidos, produtos e painel administrativo. O projeto foi criado com foco em segurança, escalabilidade e boas práticas de arquitetura.

## 🚀 Tecnologias Utilizadas

- **Node.js & Express** – Backend em JavaScript com rotas e middlewares
- **Arquitetura MVC** – Separação clara entre Model, View e Controller
- **Sequelize & PostgreSQL** – ORM para banco de dados relacional
- **Mongoose & MongoDB** – ORM para banco de dados NoSQL
- **JWT** – Autenticação segura via token
- **Yup** – Validação de dados
- **bcryptjs** – Criptografia de senhas
- **Docker** – Padronização de ambiente
- **EJS** – Templates dinâmicos para renderização de páginas

## 📦 Funcionalidades

- Cadastro, login e autenticação de usuários
- Upload de avatar via URL
- CRUD de produtos e pedidos
- Painel administrativo com rotas protegidas
- Validação de dados e criptografia de senhas
- Deploy com Render

## 🧑‍🍳 Front-End (em construção)

O front-end está sendo desenvolvido com React.js e será integrado em breve.

🔗 [Repositório do Front-End](https://github.com/Tiagliveira/dev-burg-interface)

## 🛠️ Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/Tiagliveira/stack-burger-api

# Acesse a pasta
cd dev-burg-api

# Instale as dependências
npm install

# Configure as variáveis de ambiente (.env)

# Inicie o servidor
pnpm dev
