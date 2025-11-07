# Varos Test
<img width="1510" height="823" alt="Captura de Tela 2025-11-06 às 23 47 20" src="https://github.com/user-attachments/assets/565545ab-706e-40ed-802c-669f0d22ff0b" />

Varos Test é uma aplicação web moderna desenvolvida com Next.js 16, React 19 e Prisma, que permite o gerenciamento completo de usuários com diferentes perfis. O sistema oferece funcionalidades para administradores, consultores e clientes, incluindo dashboard com estatísticas, filtros avançados, e formulários completos com validação automática de dados.

## Funcionalidades

- Cadastro e gerenciamento completo de usuários
- Sistema de roles com controle de acesso (Admin, Consultor e Cliente)
- Dashboard interativo com estatísticas dos últimos 7 dias
- Relacionamento entre consultores e clientes
- Filtros avançados por consultor e período de cadastro
- Busca automática de endereço via CEP (integração com ViaCEP)
- Validação de CPF e email únicos no sistema
- Máscaras automáticas para CPF e telefone
- Interface responsiva com design mobile-first
- Feedback visual com toasts para ações do usuário
- Skeletons para melhor experiência durante carregamento

## Tecnologias utilizadas

![Next.js](https://img.shields.io/badge/next.js-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 20 ou superior)
- [npm](https://www.npmjs.com/) ou [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) (para rodar o PostgreSQL localmente)

## Instalação e Execução Local

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd varos-test
```

### 2. Instale as dependências

```bash
npm install
# ou
pnpm install
```

### 3. Configure o ambiente

Crie um arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

Para desenvolvimento local com Docker, use as seguintes variáveis de ambiente:

```env
DATABASE_URL="postgresql://docker:docker@localhost:5432/varos"
DIRECT_URL="postgresql://docker:docker@localhost:5432/varos"
```

### 4. Inicie o banco de dados PostgreSQL com Docker Compose

```bash
docker-compose up -d
```

Este comando irá:
- Baixar a imagem do PostgreSQL (se ainda não estiver baixada)
- Criar e iniciar um container PostgreSQL
- Expor o banco na porta 5432
- Criar automaticamente o banco de dados `varos` com as credenciais:
  - **Usuário**: `docker`
  - **Senha**: `docker`
  - **Database**: `varos`

Para verificar se o container está rodando:

```bash
docker ps
```

### 5. Execute as migrações do Prisma

```bash
npx prisma migrate dev
```

Este comando irá criar as tabelas no banco de dados.

### 6. Inicie o servidor de desenvolvimento

```bash
npm run dev
# ou
pnpm dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.
