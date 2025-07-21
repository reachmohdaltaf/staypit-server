  import { PrismaClient } from "@prisma/client";
  import express from "express";
  import authRouter  from "./routes/auth.route";
  import morgan from 'morgan';
  import cors from 'cors'

  const app = express();
  app.use(morgan('dev'));
  app.use(cors({
    origin: '*',
    credentials: true
  })); 

  app.use(express.json());
  const prisma = new PrismaClient();


  app.use("/api/auth", authRouter)


     


  app.listen(4000, () => {
    console.log("Listening on port 4000");
  });
