import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const loginWithProvider = async (req: Request, res: Response) => {
  const {
    name,
    email,
    picture,
    provider,
    providerId,
    accessToken,
    refreshToken,
    tokenExpiresAt,
  } = req.body;

  try {
    // Check if user exists
    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      // User exists, optionally update tokens
      await prisma.user.update({
        where: { email },
        data: {
          accessToken,
          refreshToken,
          tokenExpiresAt: new Date(tokenExpiresAt),
          updatedAt: new Date(),
        },
      });

      return res.status(200).json({
        message: "User already exists and logged in",
        user,
      });
    }

    // If user doesn't exist, create one
    user = await prisma.user.create({
      data: {
        name,
        email,
        picture,
        provider,
        providerId,
        accessToken,
        refreshToken,
        tokenExpiresAt: new Date(tokenExpiresAt),
      },
    });

    return res.status(201).json({
      message: "User created and logged in",
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
