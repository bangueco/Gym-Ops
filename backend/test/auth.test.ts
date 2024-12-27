import { test, describe, expect, afterAll } from "vitest";
import supertest from "supertest";

import userService from "@services/user.service";
import httpStatusCode from "@lib/utils/httpStatusCode";

import app from "src/app";

const api = supertest(app);

const testUser: {
  firstName: string, lastName: string, email: string, password: string
} = {
  firstName: "Test", lastName: "User", email: `testuser${Date.now()}@gmail.com`, password: "@TestUser12345"
};

describe("api testing for endpoint /api/auth", () => {

  test("registering new user succeed from endpoint POST: /api/auth/register", async () => {
    const response = await api
      .post("/api/auth/register")
      .send(testUser)
      .expect(httpStatusCode.CREATED);

    expect(response.status).toBe(httpStatusCode.CREATED);
    expect(response.body).toBeDefined();
    expect(response.body.token).toBeDefined();
    expect(response.body.user.firstName).toBe(testUser.firstName);
    expect(response.body.user.lastName).toBe(testUser.lastName);
    expect(response.body.user.email).toBe(testUser.email);
  });

  test("logging in to existing user succeed from endpoint POST: /api/auth/login", async () => {
    const response = await api
      .post("/api/auth/login")
      .send({email: testUser.email, password: testUser.password})
      .expect(httpStatusCode.OK);

    expect(response.status).toBe(httpStatusCode.OK);
    expect(response.body).toBeDefined();
    expect(response.body.token).toBeDefined();
    expect(response.body.user.firstName).toBe(testUser.firstName);
    expect(response.body.user.lastName).toBe(testUser.lastName);
    expect(response.body.user.email).toBe(testUser.email);
  });

  test("registering with existing email fails from endpoint POST: /api/auth/register", async () => {
    const response = await api
      .post("/api/auth/register")
      .send(testUser)
      .expect(httpStatusCode.BAD_REQUEST);

    expect(response.status).toBe(httpStatusCode.BAD_REQUEST);
    expect(response.body).toBeDefined();
    expect(response.body.message).toBeDefined();
  });

  test("logging in to existing user with wrong password fails from endpoint POST: /api/auth/register", async () => {
    const response = await api
      .post("/api/auth/login")
      .send({email: testUser.email, password: "@Thisiswrongpassword123"})
      .expect(httpStatusCode.BAD_REQUEST);

    expect(response.status).toBe(httpStatusCode.BAD_REQUEST);
    expect(response.body).toBeDefined();
    expect(response.body.message).toBeDefined();
  });


  afterAll(async () => {
    // Remove test user after all the tests run
    await userService.deleteUsers();
  });

});