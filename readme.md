## CHANGELOG API


# Changelog API

Este aplicativo permite que um gerente de produto ou engenheiro publique atualizações de produtos para seus usuários.

O [**design**](https://changelog.framer.website/) demonstra a interface gráfica do aplicativo.

----
## Funcionalidades

- Sistema de autenticação com usuário e senha
- Gerenciar projetos
- Gerenciar atualizações


## Stack utilizada

**Front-end (Em construção):** React, Tailwind, Zustand, React-Query

**Back-end:** Node,Typescript, Express, Prisma


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

**DATABASE_URL**

**PORT**

**TOKEN_SECRET**


## Documentação da API

#### Cria um novo usuário

```http
  POST /api/auth/signup
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `username` | `string` | **Obrigatório**. Nome utilizado na autenticação do usuário |
| `password` | `string` | **Obrigatório**. Senha utilizada para autenticação |

#### Autentica o usuário

```http
  POST /api/auth/signin
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `username`      | `string` | **Obrigatório**. nome de usuário |
| `password`      | `string` | **Obrigatório**. senha do usuário |


#### Retorna o usuário autenticado

```http
  GET /api/auth/me
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `headers`      | `Bearer token` |**Obrigatório** Token recebido na autenticação |


#### Atualiza informações do usuário autenticado

```http
  PUT /api/auth/update
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `username`      | `string` | **Opicional**. nome de usuário |
| `password`      | `string` | **Opicional**. senha do usuário |
| `headers`      | `Bearer token` |**Obrigatório** Token recebido na autenticação |

#### Exclui o usuário

```http
  DELETE /api/auth/delete
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `headers`      | `Bearer token` |**Obrigatório** Token recebido na autenticação |




