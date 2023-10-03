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
                message: 'User created successfully',
                user: createUser
            }
        })

})