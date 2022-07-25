import { PrismaClient } from "@prisma/client";
import { Request } from "express";

export const prisma = new PrismaClient();

export interface Context {
    prisma: PrismaClient;
}

export const context = ({ req }: { req: Request }): Context => {

    return {
        prisma,
    };
};