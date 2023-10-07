import { PrismaClient } from "@prisma/client";
import { publicProcedure, router } from "../trpc";
import { z } from "zod";

const prisma = new PrismaClient();

export const likeRouter = router({

    like: publicProcedure
        .input(z.object({
            tweetId: z.string(),
            userEmail: z.string().nullable(),
        }))
        .mutation(async opts => {
            const { tweetId, userEmail } = opts.input;
            if (!userEmail) {
                return {
                    code: 403,
                    message: 'user token not found',
                    like: '',
                    incrementLikeInTweet: ''
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
                    like: '',
                    incrementLikeInTweet: ''
                }
            }
            const like = await prisma.likes.create({
                data: {
                    tweetId: tweetId,
                    userId: user.id
                }
            })
            const incrementLikeInTweet = await prisma.tweet.update({
                where: {
                    id: tweetId
                },
                data: {
                    Likes: {
                        increment: 1
                    }
                }
            })
            return {
                code: 201,
                message: 'like tweet successfully',
                like,
                incrementLikeInTweet
            }
        }),

    unLike: publicProcedure
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
                    unlike: '',
                    decrementLikeInTweet: ''
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
                    unlike: '',
                    decrementLikeInTweet: ''
                }
            }
            const unlike = await prisma.likes.deleteMany({
                where: {
                    tweetId: tweetId,
                    userId: user.id
                }
            })
            const decrementLikeInTweet = await prisma.tweet.update({
                where: {
                    id: tweetId
                },
                data: {
                    Likes: {
                        decrement: 1
                    }
                }
            })
            return {
                code: 201,
                message: 'unliked tweet successfully',
                unlike,
                decrementLikeInTweet
            }
        }),

    ifLike: publicProcedure
        .input(z.object({
            tweetId: z.string(),
            userEmail: z.string().nullable()
        }))
        .mutation(async opts => {
            const { userEmail, tweetId } = opts.input;
            if (!userEmail) {
                return {
                    code: 403,
                    message: 'user token not found',
                    status: false
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
                    status: false
                }
            }
            const ifLike = await prisma.likes.findFirst({
                where: {
                    AND: [{userId: user.id}, {tweetId: tweetId}]
                }
            })
            if (ifLike) {
                return {
                    code: 200,
                    message: 'data fetched successfully',
                    ifLike,
                    status: true
                }
            }
            return {
                code: 200,
                message: 'data fetched successfully',
                ifLike,
                status: false
            }
        })

})