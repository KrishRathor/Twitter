import { publicProcedure, router } from "../trpc";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export const reTweetRouter = router({

    reTweet: publicProcedure
        .input(z.object({
            userEmail: z.string().nullable(),
            fromUserEmail: z.string(),
            tweetId: z.string()
        }))
        .mutation(async opts => {
            const { userEmail, fromUserEmail, tweetId } = opts.input;
            if (!userEmail) {
                return {
                    code: 403,
                    message: 'user token not found'
                }
            }
            const user = await prisma.user.findFirst({
                where: {
                    email: userEmail
                }
            })
            const fromUser = await prisma.user.findFirst({
                where: {
                    email: fromUserEmail
                }
            })
            if (!user || !fromUser) {
                return {
                    code: 403,
                    message: 'user not found'
                }
            }
            const createRetweet = await prisma.reTweets.create({
                data: {
                    userId: user.id,
                    fromUserId: fromUser.id,
                    tweetID: tweetId
                }
            })
            const tweet = await prisma.tweet.findFirst({
                where: {
                    id: tweetId,
                }
            })
            const incrementRetweetInTweet = await prisma.tweet.update({
                where: {
                    id: tweetId
                },
                data: {
                    reTweetCount: {
                        increment: 1
                    }
                }
            })
            if (!tweet) {
                return {
                    code: 403,
                    message: 'code not found'
                }
            }
            const createTweet = await prisma.tweet.create({
                data: {
                    content: tweet.content,
                    userId: user.id,
                    username: user.username,
                    email: user.email,
                    isReTweet: true
                }
            })
            return {
                code: 201,
                message: 'retweeted successfully'
            }
        }),

    getFromUser: publicProcedure
        .input(z.object({
            tweetId: z.string(),
            userEmail: z.string().nullable()
        }))
        .mutation(async opts => {
            const { tweetId, userEmail } = opts.input;
            if (!userEmail) {
                return {
                    code: 403,
                    message: 'user token not found',
                    fromUserEmail: ''
                }
            }
            const user = await prisma.user.findFirst({
                where: {
                    email: userEmail
                }
            })
            if (!user) {
                return {
                    code: 403,
                    message: 'user not found',
                    fromUserEmail: ''
                }
            }
            const findReTweet = await prisma.reTweets.findFirst({
                where: {
                    AND: [{tweetID: tweetId}, {userId: user.id}]
                }
            })
            const fromUserId = findReTweet?.fromUserId;
            const fromUser = await prisma.user.findFirst({
                where: {
                    id: fromUserId
                }
            })
            if (!fromUser) {
                return {
                    code: 403,
                    message: 'from user not found',
                    fromUserEmail: ''
                }
            }
            return {
                code: 200,
                message: 'from user found',
                fromUserEmail: fromUser.email
            }
        })

})