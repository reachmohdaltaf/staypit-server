import express, { Express, Request, Response, Router } from "express";
import { loginWithProvider } from "../controllers/auth.controller";

const router: Router = express.Router();
router.post("/login", loginWithProvider);


export default router;