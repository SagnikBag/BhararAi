import { Router } from "express";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import { register,verifyEmail,login,getMe } from "../controllers/auth.controller.js";
import {authUser} from "../middlewares/auth.middleware.js"
const authRouter = Router();

// Register route
// POST /api/auth/register
// Request body: { username, email, password }
// Response: 201 Created with user data (excluding password) or 400 Bad Request with validation errors
// Description: This route allows users to register by providing a username, email, and password. The input is validated using the registerValidator middleware, and if valid, the register controller function is called to create a new user in the database.

authRouter.post("/register",registerValidator,register)


// Login route
// POST /api/auth/login
// Request body: { email, password }
// Response: 200 OK with user data (excluding password) or 400 Bad Request with validation errors
// Description: This route allows users to log in by providing their email and password. The input is validated using the loginValidator middleware, and if valid, the login controller function is called to authenticate the user and return their data.

authRouter.post("/login",loginValidator,login)

authRouter.get("/get-me",authUser,getMe)

authRouter.get("/verify-email",verifyEmail)

export default authRouter;
