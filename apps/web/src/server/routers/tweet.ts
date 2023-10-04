import { PrismaClient } from "@prisma/client";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";

const prisma = new PrismaClient();

export const tweetRouter = router({

    getAllTweets: publicProcedure
        .query(async opts => {
            const tweets = await prisma.tweet.findMany();
            return {
                code: 200,
                tweets
            }
        }),
        
    createTweet: publicProcedure
        .input(z.object({
            userId: z.string(),
            content: z.string()
        }))
        .mutation(async opts => {
            const { userId, content } = opts.input;

            if (!userId) {
                return {
                    code: 403,
                    message: "Please login before posting"
                }
            }

            const user = await prisma.user.findFirst({
                where: {
                    email: userId
                }
            })
            if (!user) {
                return {
                    code: 403,
                    message: "User not found"
                }
            }
            const createTweet = await prisma.tweet.create({
                data: {
                    content: content,
                    userId: user?.id
                }
            })
            return {
                code: 201,
                message: "Tweet created successfully",
                data: createTweet
            }
        })

})