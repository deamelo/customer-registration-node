import { DataSource } from "typeorm"
import AppDataSource from "../data-source"
import request from "supertest"
import app from "../app"


describe("Testing the client routes", () => {
  const name = "client"
  const email = "client@mail.com"
  const password = "password"
  const telephone = "(61)99999-0000"

  const clientData = { name, email, password, telephone }

  const loginData = { email, password }

  const updatedData = { name:"clientName" }

  // const clientDuplicate = {
  //   "name": "newClient",
  //   "email": "client@mail.com",
  //   "password": "password",
  //   "telephone": "(61)99999-1111",
  // }

  const clientFail = {
    "name": "newClient",
    "email": "client@mail.com",
    "telephone": "(61)99999-1111",
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

  test("Should be able to create a new client", async () => {

    const response = await request(app).post("/clients").send(clientData)

    expect(response.status).toBe(201)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: response.body.id,
        name,
        email,
        telephone,
        createdAt: response.body.createdAt
      })
    )
  })

  test("Should be able to return the token of the logged in client", async () => {

    const response = await request(app).post("/clients/login").send(loginData)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        token: response.body.token
      })
    )
  })

  test("Should be able to return a list of all clients", async () => {
    const response = await request(app).get("/clients")

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty("map")
  })

  test("Should be able to return a profile of client", async () => {
    const login = await request(app).post("/clients/login").send(loginData)

    const {token} = login.body

    const response = await request(app).get("/clients/profile").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: response.body.id,
        name,
        email,
        telephone,
        createdAt: response.body.createdAt,
        contacts: []
      })
    )
  })

  test("Should be able to update of client", async () => {
    const login = await request(app).post("/clients/login").send(loginData)

    const {token} = login.body

    const response = await request(app).patch("/clients").set("Authorization", `Bearer ${token}`).send(updatedData)

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        id: response.body.id,
        name : response.body.name,
        email,
        telephone,
        createdAt: response.body.createdAt,
        contacts: []
      })
    )
  })

  test("Should be able to delete of client", async () => {
    const login = await request(app).post("/clients/login").send(loginData)

    const {token} = login.body

    const response = await request(app).delete("/clients").set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(204)
  })

  test("Should fail to create client without all information", async () => {

    const response = await request(app).post("/clients").send(clientFail)

    expect(response.status).toBe(400);
    expect(response.body).toEqual(expect.objectContaining({
      message:"Client need a name, email, password and telephone to be created."
    }))
  })

  test("Should fail to show client profile without token", async () => {

    const response = await request(app).get("/clients/profile").send(clientData)

    expect(response.status).toBe(401);
    expect(response.body).toEqual(expect.objectContaining({
      message:"Missing authorization token"
    }))
  })
})
