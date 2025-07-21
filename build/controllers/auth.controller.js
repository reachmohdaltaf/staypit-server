"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginWithProvider = void 0;
const prisma_1 = require("../lib/prisma");
const loginWithProvider = async (req, res) => {
    const { name, email, picture, provider, providerId, refreshToken, tokenExpiresAt, } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
        let user = await prisma_1.prisma.user.findUnique({
            where: {
                email
            }
        });
        if (user) {
            await prisma_1.prisma.user.update({
                where: {
                    email
                },
                data: {
                    refreshToken,
                    tokenExpiresAt: tokenExpiresAt ? new Date(tokenExpiresAt) : undefined,
                    updatedAt: new Date()
                }
            });
        }
        else {
            user = await prisma_1.prisma.user.create({
                data: {
                    name,
                    email,
                    picture,
                    provider,
                    providerId,
                    refreshToken,
                    tokenExpiresAt: tokenExpiresAt ? new Date(tokenExpiresAt) : undefined
                }
            });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.loginWithProvider = loginWithProvider;
