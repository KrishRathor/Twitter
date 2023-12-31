import { PrismaClient } from "@prisma/client";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";

const prisma = new PrismaClient();

export const tweetRouter = router({

    getAllTweets: publicProcedure
        .mutation(async opts => {
            try {
                const tweets = await prisma.tweet.findMany();
                if (!tweets) {
                    return {
                        code: 200,
                        tweets: []
                    }
                }
                return {
                    code: 200,
                    tweets
                }
            } catch (error) {
                console.log(error);
                throw new Error();
            } finally {
                await prisma.$disconnect();
            }
        }),
        
    createTweet: publicProcedure
        .input(z.object({
            userId: z.string(),
            content: z.string()
        }))
        .mutation(async opts => {
            try {
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
                        userId: user?.id,
                        email: userId,
                        username: user.username
                    }
                })
                return {
                    code: 201,
                    message: "Tweet created successfully",
                    data: createTweet
                }
            } catch (error) {
                console.log(error);
                throw new Error();
            } finally {
                await prisma.$disconnect();
            }
        }),
    
    getTweetById: publicProcedure
        .input(z.object({
            id: z.string()
        }))
        .mutation(async opts => {
            try {
                const { id } = opts.input;
                console.log(id);
                const tweet = await prisma.tweet.findFirst({
                    where: {
                        id: id
                    }
                })
                console.log(tweet);
                return {
                    code: 200,
                    message: 'Found tweet',
                    tweet: tweet
                }
            } catch (error) {
                console.log(error);
                throw new Error();
            } finally {
                await prisma.$disconnect();
            }
        })

})