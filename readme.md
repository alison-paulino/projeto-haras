# Haras Mustang 

## Project Api for Projects IronHack BootCamp Out/2020

HarasApi is a express rest api for manage a haras react website where the users can sponsor a horse and book a day use.

## Features

- Admin´s area with full possibility to manage the haras information, plans details, send messages to sponsor and image uploads.
- Sponsors area with a profile area with messages, videos and images, sponsored horses and a form to book day use.

This project was created to conclusion of module 3 of IronHack BootCamp Out/2020
Created by [Alison Paulino and Paulo Duarte]

## Tech

Haras Api and Client uses:

- [node.js]
- [Express]
- [Jsonwetoken]
- [Mongoose]
- [MongoDB]
- [Cloudinary]
- [bcrypt]

## Installation

Clone this repo

In the source folder add an .env file with this variables:

MONGO_URI - for your atlas cluster or local mongodb
TOKEN_SECRET - for your jwt secret
EXPIRATION_AUTH_TOKEN - for setting your expiration time for jwt

Install the dependencies and devDependencies and start the server.

```sh
npm i
npm run dev
```

**`https://haras-api.herokuapp.com/`**.

You can test with:
**`https://haras-mustang.herokuapp.com/`**

The common endpoints are the following:

All end point except /auth need to be access with token on Authorization header
| Method | EndPoint                  | Parameters                                      | Return Value                                                    |
|--------|---------------------------|-------------------------------------------------|-----------------------------------------------------------------|
| Post   | auth/login                | email, password                                 | User Logado                                                     |
| Post   | auth/loginAdm             | email, password                                 | User Logado                                                     |
| Post   | auth/signup               | email, nome, telefone, idade, password, imagem  | User Criado                                                     |
| Post   | auth/signupAdm            | email, nome, telefone, idade, password, imagem  | User Criado                                                     |
| Put    | auth/upadateAdm/:id       | nome, telefone, idade, password, imagem, id     | User Alterado                                                   |
| Get    | auth/adm/:id              |                                                 | Administrador Encontrado                                        |
| Post   | auth/delete/:id           |                                                 | User deletado                                                   |
| Post   | haras/create              | nome, localização, telefone, email              | Haras Criado                                                    |
| Get    | haras/:id                 |                                                 | Haras Encontrado                                                |
| Put    | haras/update/:id          | nome, localização, telefone, email              | Haras Alterado                                                  |
| Post   | haras/createPlan          | nome , data inicio, data fim, valor             | Plano Criado                                                    |
| Put    | haras/editPlan/:id        | nome , data inicio, data fim, valor             | Plano Alterado                                                  |
| Post   | haras/deletePlan/:id      |                                                 | Plano deletado                                                  |
| Post   | haras/uploadmidia         | midia                                           | Arquivo enviado                                                 |
| Post   | cavalo/create             | nome, filiação, cor, idade, image               | Cavalo Criado                                                   |
| Put    | cavalo/update/:id         | nome, filiação, cor, idade, image               | Cavalo alterado                                                 |
| Post   | cavalo/delete/:id         |                                                 | Cavalo deletado                                                 |
| Get    | /profile                  |                                                 | User Logado - Mensagens e Mídias                                |
| Get    | /listCavalos              |                                                 | Listar Cavalos                                                  |
| Post   | /apadrinhar               | id, id_cavalo                                   | Sucess                                                          |
| Get    | /listCavalos/apadrinhados |                                                 | Listar Cavalos Apadrinhados                                     |
| Get    | /infocavalo               | id_cavalo                                       | Mostra info cavalo                                              |
| Put    | /midias                   | [ url images, video ]                           | Mostra todas as imagens enviadas pelo administrador             |
| Put    | /videos                   | [ url video]                                    | Mostra tos links de todos os videos enviadas pelo administrador |
