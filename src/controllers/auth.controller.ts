import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const loginWithProvider = async (req: Request, res: Response) => {
  const {
    name,
    email,
    picture,
    provider,
    providerId,
    refreshToken,
    tokenExpiresAt,
  } = req.body

  if(!name || !email  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    let user = await prisma.user.findUnique({
      where:{
        email
      }
    })
    if(user){
      await prisma.user.update({
        where: {
          email
        },
        data: {
          refreshToken,
          tokenExpiresAt: tokenExpiresAt ? new Date(tokenExpiresAt) : undefined,
          updatedAt: new Date()
        }
      })
    }else{
      user = await prisma.user.create({
        data: {
          name,
          email,
          picture,
          provider,
          providerId,
          refreshToken,
          tokenExpiresAt: tokenExpiresAt ? new Date(tokenExpiresAt) : undefined
        }
      })
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
