# Project Test Recruitment

Project ini menggunakan stack nodejs dengan framework expressjs dan PostgreSQL sebagai database storagenya.

## Requirement
- Node Js versi 14 atau lebih
- PostgreSQL versi 8 atau lebih
- Git versi 2 atau lebih
- 1 Port Kosong untuk running app

## Installation

clone project dari github

```bash
git clone git@github.com:aliprahman/mydigilearn-test.git
```
install dependency
```bash
cd to project folder
npm install
```

## Setup
- buat database di postgres
- buat file .env isinya bisa menyalin dari file .env.example
- sesuaikan value dari .env dengan local PC / Laptop / Server
- running command untuk initialize table dari file migration
```bash
sequelize-cli db:migrate
```

## Running Apps
```bash
node index.js
```