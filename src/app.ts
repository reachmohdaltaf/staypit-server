import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

app.get("/users", async (req: Request, res: Response)=>{
    const users = await prisma.user.findFirst({
        where: {email: "reachmohdaltaf@gmail.com"}
    })
    res.json(users)
})

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
