import { PrismaClient } from "@prisma/client";
import { comparePassword, generateUUID, hashPassword } from "./HashLib";

export const prisma = new PrismaClient();

export const close = async () => {
    prisma.$disconnect()
}

export const registerUser = async (name, email, password) => {
    const uuid = generateUUID().toString();
    const userRegister = await prisma.userAuth.create({
        data: {
            id: uuid,
            email: email,
            password: await hashPassword(password),
        }
    })
    const userDetails = await prisma.userDetails.create({
        data: {
            userId: uuid,
            name: name,
            count: 0
        }
    })
    const userId = userRegister.id
    close();
    return { userId }
}

export const fetchUser = async (email, password) => {
    const userCount = await prisma.userAuth.count({
        where: {
            email: email,
        }
    })
    if (userCount == 1) {
        const user = await prisma.userAuth.findFirst({
            where: {
                email: email
            }
        })
        const result = comparePassword(password, user.password)
        return { userId: user.id };
    } else {
        return false;
    }
    close();
}

export const fetchDetails = async (userId) => {
    const user = await prisma.userDetails.findFirst({
        where: {
            userId: userId
        }
    })
    close();
    return user
}

export const updateDetails = async (userId) => {
    const user = await prisma.userDetails.update({
        where: { userId: userId },
        data: { count: { increment: 1 } }
    })
    close();
    return user
}