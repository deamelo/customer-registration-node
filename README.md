# API para cadastro de clientes

    Cadastro de clientes e seus contatos.

## 1. Features Gerais

  - Cadastro e login de cliente;
  - Cadastro de contatos;

## 2. Tecnologias

- _TypeScript_
- _NodeJs_
- _Sqlite3_
- _PostgreSQL_

## 3. Instalação

- Crie um arquivo na raiz do projeto chamado `.env` e faça as configurações das variáveis de ambiente conforme o que está disposto no `.env.example` do projeto:

```
POSTGRES_USER=
POSTGRES_PWD=
POSTGRES_DB=
POSTGRES_HOST=
SECRET_KEY=
PORT=
```

- Para rodar o projeto utilize o comando abaixo:

`yarn dev`


# Rotas:

- **Base Url:** [http://localhost:3000]


## Clients:

### **Criação de Clientes**:

**Endpoint:** `/clients`

**Método:** POST

**StatusCode:** 201 - Created

**Headers:**

- Content-Type application/json

**Nível de acesso:** Livre

**Sobre a rota:** Rota para criação de um novo cliente.

**O que deve ser enviado:**

```json
{
    {
        "name": "client",
        "email": "client@email.com",
        "password": "1234",
        "telephone": "(61)9999-9999"
    }
}
```

**O que será retornado em caso de sucesso:**

```json
{
	"name": "client",
    "email": "client@email.com",
    "telephone": "(61)9999-9999",
	"id": "120d2204-03d2-4095-9362-07930bd6c94a",
	"createdAt": "2022-09-21T23:27:00.111Z"
}
```

---

### **Login**:

**Endpoint:** `/clients/login`

**Método:** POST

**StatusCode:** 200 - Ok

**Headers:**

- Content-Type application/json

**Nível de acesso:** Livre

**Sobre a rota:** Rota para login de cliente.

**O que deve ser enviado:**

```json
{
    "email": "client@email.com",
    "password": "1234",
}
```

**O que será retornado em caso de sucesso:**

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMGQyMjA0LTAzZDItNDA5NS05MzYyLTA3OTMwYmQ2Yzk0YSIsImlhdCI6MTY2MzgwMjkyMCwiZXhwIjoxNjYzODg5MzIwfQ.eA4w9PEYpetha8PpNZtsq3Hm1Yb6d4RBLoqWb5I2JcE"
}
```

---

### **Listar Clientes**:

**Endpoint:** `/clients`

**Método:** GET

**StatusCode:** 200 - Ok

**Headers:** None

**Nível de acesso:** Livre

**Sobre a rota:** Rota para listar todos os clientes.

**O que será retornado em caso de sucesso:**

```json
[
	{
		"id": "120d2204-03d2-4095-9362-07930bd6c94a",
	    "name": "client",
        "email": "client@email.com",
		"telephone": "(61)9999-9999",
		"createdAt": "2022-09-21T23:27:00.111Z"
	}
]
```
---

### **Listar Perfil do cliente**:

**Endpoint:** `/clients/profile`

**Método:** GET

**StatusCode:** 200 - Ok

**Headers:**

- Content-Type application/json
- Authorization Token <token_do_cliente>

**Nível de acesso:** Autenticado.

**Sobre a rota:** Rota para listar as informações de um cliente.

**O que será retornado em caso de sucesso:**

```json
{
    "id": "120d2204-03d2-4095-9362-07930bd6c94a",
    "name": "client",
    "email": "client@email.com",
    "telephone": "(61)9999-9999",
    "createdAt": "2022-09-21T23:27:00.111Z"
}
```

---

### **Atualizar Cliente**:

**Endpoint:** `/clients`

**Método:** PATCH

**StatusCode:** 200 - Ok

**Headers:**

- Content-Type application/json
- Authorization Token <token_do_cliente>

**Nível de acesso:** Autenticado.

**Sobre a rota:** Rota para atualizar/editar as informações de um cliente. As informações que podem ser editadas são: name, email, password, telephone.

**Exemplo de requisição que pode ser enviada:**

```json
{
  "name": "client updated"
}
```

**O que será retornado em caso de sucesso:**

```json
{
    "id": "120d2204-03d2-4095-9362-07930bd6c94a",
    "name": "client updated",
    "email": "client@email.com",
    "telephone": "(61)9999-9999",
    "createdAt": "2022-09-21T23:27:00.111Z"
}
```

---

### **Deletar Cliente**:

**Endpoint:** `/clients`

**Método:** DELETE

**StatusCode:** 204 - No Content

**Headers:**

- Content-Type application/json
- Authorization Token <token_do_cliente>

**Nível de acesso:** Autenticado.

**Sobre a rota:** Rota para deletar um cliente.

**O que deve ser enviado:** No Body

**O que será retornado em caso de sucesso:** No body returned for response


---

## Contacts:

### **Criar Um Contato:**

**Endpoint:** `/contacts`

**Método:** POST

**StatusCode:** 201 - Created

**Headers:**

- Content-Type application/json
- Authorization Token <token_do_cliente>

**Nível de acesso:** Autenticado.

**Sobre a rota:** Rota para criação de um contato.

**O que deve ser enviado:**

```json
{
    "name": "contact",
    "email": "contact@email.com",
    "telephone": "(61)9999-1234",
    "clientId": "120d2204-03d2-4095-9362-07930bd6c94a"
}
```

**O que será retornado em caso de sucesso:**

```json
{
	"name": "contact",
    "email": "contact@email.com",
    "telephone": "(61)9999-1234",
	"client": {
		"id": "120d2204-03d2-4095-9362-07930bd6c94a",
        "name": "client updated",
        "email": "client@email.com",
        "telephone": "(61)9999-9999",
        "createdAt": "2022-09-21T23:27:00.111Z"
	},
	"id": "dc28db57-e2da-4c3d-bd1f-18ae3f621929"
}
```

---

### **Listar Contacts:**

**Endpoint:** `/contacts`

**Método:** GET

**StatusCode:** 200 - ok

**Headers:**

- Content-Type application/json
- Authorization Token <token_do_cliente>

**Nível de acesso:** Autenticado.

**Sobre a rota:** Rota para listagem de contatos.

**O que será retornado em caso de sucesso:**

```json
[
    {
        "id": "dc28db57-e2da-4c3d-bd1f-18ae3f621929",
        "name": "contact",
        "email": "contact@email.com",
        "telephone": "(61)9999-1234",
        "client": {
            "id": "120d2204-03d2-4095-9362-07930bd6c94a",
            "name": "client updated",
            "email": "client@email.com",
            "telephone": "(61)9999-9999",
            "createdAt": "2022-09-21T23:27:00.111Z"
	    }
	}
]
```

---

### **Listar Um Contact:**

**Endpoint:** `/contacts/:id`

**Método:** GET

**StatusCode:** 200 - ok

**Headers:**

- Content-Type application/json
- Authorization Token <token_do_cliente>

**Nível de acesso:** Autenticado.

**Sobre a rota:** Rota para listagem de um contato.

**O que será retornado em caso de sucesso:**

```json
{
    "id": "dc28db57-e2da-4c3d-bd1f-18ae3f621929",
    "name": "contact",
    "email": "contact@email.com",
    "telephone": "(61)9999-1234",
    "client": {
        "id": "120d2204-03d2-4095-9362-07930bd6c94a",
        "name": "client updated",
        "email": "client@email.com",
        "telephone": "(61)9999-9999",
        "createdAt": "2022-09-21T23:27:00.111Z"
    }
}
```

---

### **Atualizar Um Contact:**

**Endpoint:** `/contacts/:id`

**Método:** PATCH

**StatusCode:** 200 - ok

**Headers:**

- Content-Type application/json
- Authorization Token <token_do_cliente>

**Nível de acesso:** Autenticado.

**Sobre a rota:** Rota para atualizar/editar um contato. As informações que podem ser editadas são: name, email, telephone.

**Exemplo de requisição que pode ser enviada:**

```json
{
  "telephone": "(48)9999-4321"
}
```

**O que será retornado em caso de sucesso:**

```json
{
    "id": "dc28db57-e2da-4c3d-bd1f-18ae3f621929",
    "name": "contact",
    "email": "contact@email.com",
    "telephone": "(48)9999-4321",
    "client": {
        "id": "120d2204-03d2-4095-9362-07930bd6c94a",
        "name": "client updated",
        "email": "client@email.com",
        "telephone": "(61)9999-9999",
        "createdAt": "2022-09-21T23:27:00.111Z"
    }
}
```

---

### **Deletar Um Contact:**

**Endpoint:** `/contacts/:id`

**Método:** DELETE

**StatusCode:** 204 - No Content

**Headers:**

- Content-Type application/json
- Authorization Token <token_do_cliente>

**Nível de acesso:** Autenticado.

**Sobre a rota:** Rota para deleção de um contato.

**O que deve ser enviado:** No Body

**O que será retornado em caso de sucesso:** No body returned for response

```
---

```
##  Retornos Gerais de Erros:

### **Requisições Sem Token:**

**Sobre:** Erro caso um cliente tente acessar uma rota sem estar logado.

**StatusCode:** 401 - Unauthorized

```json
{
	"message": "Missing authorization token"
}
```

---

### **Campos Incompletos:**

**Sobre:** Erro caso falte algum campo nas requisições.

**StatusCode:** 400 - Bad Request

```json
{
    "message": "Client need a name, email, password and telephone to be created."
}

ou

{
	"message": "Contact need a name, email, telephone and clientId to be created."
}
```

### **Email existente:**

**Sobre:** Caso o email já esteja cadastrado.

**StatusCode:** 409 - Conflict

```json
{
	"message": "Email already exist"
}
```

### **Email ou Password incorretos:**

**Sobre:** Email ou Password incorretos no login.

**StatusCode:** 403 - Forbidden

```json
{
	"message": "Wrong email/password"
}
```