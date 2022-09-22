import { DataSource } from "typeorm"
import AppDataSource from "../data-source"
import request from "supertest"
import app from "../app"


describe("Testing the contact routes", () => {
  const clientData = {
    "name": "newClient",
    "email": "newClient@mail.com",
    "password": "password",
    "telephone": "(61)99999-1111",
  }

  const loginData = {
    "email": "newClient@mail.com",
    "password": "password",
  }

  const newClientProfile = {
    "name": "newClientProfile",
    "email": "newClientProfile@mail.com",
    "telephone": "(61)99999-1111",
    "password": "password"
  }

  const newClientUpdate = {
    "name": "newClientUpdate",
    "email": "newClientUpdate@mail.com",
    "telephone": "(61)99999-1111",
    "password": "password"
  }

  const newClientDelete = {
    "name": "newClientDelete",
    "email": "newClientDelete@mail.com",
    "telephone": "(61)99999-1111",
    "password": "password"
  }

  const updatedData = {
    "telephone": "(48)99999-1234"
  }

  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err)
      })
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("Should be able to create a new contact", async () => {
    const client = await request(app).post("/clients").send(clientData)
    const login = await request(app).post("/clients/login").send(loginData)

    const {token} = login.body

    const name = "contact"
    const email = "contact@mail.com"
    const telephone = "(61)99999-1111"
    const clientId = client.body.id

    const contactData = { name, email, telephone, clientId }

    const response = await request(app).post("/contacts").set("Authorization", `Bearer ${token}`).send(contactData)

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        id: response.body.id,
        name,
        email,
        telephone,
        client: {
          id: client.body.id,
          name: client.body.name,
          email: client.body.email,
          telephone: client.body.telephone,
          createdAt: client.body.createdAt,
          contacts: []
        },
      })
    )
  })

  test("Should be able to return a list of all contacts", async () => {

    const login = await request(app).post("/clients/login").send(loginData);

    const {token} = login.body

    const response = await request(app).get("/contacts").set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("map")
  })

  test("Should be able to return a profile of contact", async () => {
    const client = await request(app).post("/clients").send(newClientProfile)
    const login = await request(app).post("/clients/login").send(loginData)

    const {token} = login.body

    const name = "contactProfile"
    const email = "contactProfile@mail.com"
    const telephone = "(61)99999-1111"
    const clientId = client.body.id

    const contactData = { name, email, telephone, clientId }

    const contact = await request(app).post("/contacts").set("Authorization", `Bearer ${token}`).send(contactData)

    const {id} = contact.body

    const response = await request(app).get(`/contacts/${id}`).set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: response.body.id,
        name,
        email,
        telephone,
      })
    )
  })

  test("Should be able to update of contact", async () => {
    const client = await request(app).post("/clients").send(newClientUpdate)
    const login = await request(app).post("/clients/login").send(loginData)

    const {token} = login.body

    const name = "contactUpadte"
    const email = "contactUpadte@mail.com"
    const telephone = "(61)99999-1111"
    const clientId = client.body.id

    const contactData = { name, email, telephone, clientId }

    const contact = await request(app).post("/contacts").set("Authorization", `Bearer ${token}`).send(contactData)

    const {id} = contact.body

    const response = await request(app).patch(`/contacts/${id}`).set("Authorization", `Bearer ${token}`).send(updatedData)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: response.body.id,
        name,
        email,
        telephone: response.body.telephone
      })
    )
  })

  test("Should be able to delete of contact", async () => {
    const client = await request(app).post("/clients").send(newClientDelete)
    const login = await request(app).post("/clients/login").send(loginData)

    const {token} = login.body

    const name = "contactDelete"
    const email = "contactDelete@mail.com"
    const telephone = "(61)99999-1111"
    const clientId = client.body.id

    const contactData = { name, email, telephone, clientId }

    const contact = await request(app).post("/contacts").set("Authorization", `Bearer ${token}`).send(contactData)

    const {id} = contact.body

    const response = await request(app).delete(`/contacts/${id}`).set("Authorization", `Bearer ${token}`).send(updatedData)

    expect(response.status).toBe(204)
  })

  test("Should fail to create contact with email duplicate", async () => {
    const client = await request(app).post("/clients").send(clientData)
    const login = await request(app).post("/clients/login").send(loginData)

    const {token} = login.body

    const name = "contact"
    const email = "contact@mail.com"
    const telephone = "(61)99999-1111"
    const clientId = client.body.id

    const contactData = { name, email, telephone, clientId }

    const response = await request(app).post("/contacts").set("Authorization", `Bearer ${token}`).send(contactData)

    expect(response.status).toBe(400);
    expect(response.body).toEqual(expect.objectContaining({
      message:"Email already exist"
    }))
  })

  test("Should fail to update contact with incorrect id", async () => {
    const client = await request(app).post("/clients").send(newClientUpdate)
    const login = await request(app).post("/clients/login").send(loginData)

    const {token} = login.body

    const name = "contactUpadte"
    const email = "contactUpadte@mail.com"
    const telephone = "(61)99999-1111"
    const clientId = client.body.id

    const contactData = { name, email, telephone, clientId }

    const contact = await request(app).post("/contacts").set("Authorization", `Bearer ${token}`).send(contactData)

    const response = await request(app).patch(`/contacts/404`).set("Authorization", `Bearer ${token}`).send(updatedData)

    expect(response.status).toBe(404)
    expect(response.body).toEqual(expect.objectContaining({
      "message": "Contact not found"
    }))
  })


})