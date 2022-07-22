import supertest from "supertest";
import app from "./../src/app.js"

const EMAIL = `${new Date().getTime()}@gmail.com` // random email
const PASSWORD = "secretcode1234567890"
const login = {email: EMAIL, password: PASSWORD}

describe ("Acess tests suite", () => {
  it ("given an email and password create user", async () => {
    const response = await supertest(app).post(`/signUp`).send(login);
    expect(response.status).toBe(201)
  });

  it ("given valid email and password, return token",async () => {
    const response = await supertest(app).post(`/signIn`).send(login);
    const token = response.body.token;
    expect(token).not.toBeNull; 
  });

  it ("given email and password which are already in use, fail to create",async () => {
    const response = await supertest(app).post(`/signUp`).send(login);
    expect(response.status).toBe(409)
  })
})