"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginWithProvider = void 0;
const prisma_1 = require("../lib/prisma");
const loginWithProvider = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, picture, provider, providerId, refreshToken, tokenExpiresAt, } = req.body;
    if (!name || !email) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    try {
        let user = yield prisma_1.prisma.user.findUnique({
            where: {
                email
            }
        });
        if (user) {
            yield prisma_1.prisma.user.update({
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
            user = yield prisma_1.prisma.user.create({
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
});
exports.loginWithProvider = loginWithProvider;
