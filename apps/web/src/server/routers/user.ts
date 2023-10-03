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
            const createUser = await prisma.user.create({
                data: {
                    email: email,
                    username: username,
                    password: password
                }
            })
            console.log(createUser);
            return {
                username,
                email,
                password
            }
        })

})