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
        }),

    login: publicProcedure
        .input(z.object({
            email: z.string(),
            password: z.string()
        }))
        .mutation(async opts => {
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
        })

})