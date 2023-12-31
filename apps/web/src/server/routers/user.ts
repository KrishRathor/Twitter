import { publicProcedure, router } from "../trpc";
import { PrismaClient } from '@prisma/client'
import { z } from "zod";

const prisma = new PrismaClient();

export const userRouter = router({
    
    signup: publicProcedure
        .input(z.object({
            email: z.string(),
            username: z.string(),
            password: z.string()
        }))
        .mutation(async opts => {
            try {
                const {username, email, password} = opts.input;

                const user = await prisma.user.findFirst({where: {
                    email: email
                }});

                if (user) {
                    return {
                        code: 403,
                        message: 'Email already registered!'
                    }
                }

                const createUser = await prisma.user.create({
                    data: {
                        email: email,
                        username: username,
                        password: password
                    }
                });
                return {
                    code: 201,
                    message: 'User created successfully',
                    user: createUser
                }
            } catch (error) {
                console.log(error);
                throw new Error();
            } finally {
                await prisma.$disconnect();
            }
        }),

    login: publicProcedure
        .input(z.object({
            email: z.string(),
            password: z.string()
        }))
        .mutation(async opts => {
            try {
                const { email, password } = opts.input;

                const user = await prisma.user.findFirst({where: {
                    email: email
                }});

                if (!user) {
                    return {
                        code: 401,
                        message: "User not Found!",
                        token: '',
                    }
                }

                if (user.password !== password) {
                    return {
                        code: 401,
                        message: "Wrong password!",
                        token: ''
                    }
                }
                return {
                    code: 200,
                    message: "Successfull Login!",
                    token: email
                }
            } catch (error) {
                console.log(error);
                throw new Error();
            } finally {
                await prisma.$disconnect();
            }
        }),

    me: publicProcedure
        .input(z.object({
            userID: z.string().nullable()
        }))
        .mutation(async opts => {
            try {
                const { userID } = opts.input;
                let user;
                if (userID) {
                    user = await prisma.user.findFirst({
                        where: {
                            email: userID
                        }
                    })
                }
                return {
                    code: 200,
                    user
                }
            } catch (error) {
                console.log(error);
                throw new Error();
            } finally {
                await prisma.$disconnect();
            }
        }),

    getAllUsers: publicProcedure
        .query(async opts => {
            try {
                const users = await prisma.user.findMany();
                return {
                    code: '100',
                    users
                };
            } catch (error) {
                console.log(error);
                throw new Error();
            } finally {
                await prisma.$disconnect();
            }
        })

})