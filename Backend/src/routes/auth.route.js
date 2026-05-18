import { Router } from "express";
import { registerValidator } from "../validators/auth.validator.js";
import { register } from "../controllers/auth.controller.js";

const authRouter = Router();

// Register route
// POST /api/auth/register
// Request body: { username, email, password }
// Response: 201 Created with user data (excluding password) or 400 Bad Request with validation errors
// Description: This route allows users to register by providing a username, email, and password. The input is validated using the registerValidator middleware, and if valid, the register controller function is called to create a new user in the database.

authRouter.post("/register",registerValidator,register)

export default authRouter;
