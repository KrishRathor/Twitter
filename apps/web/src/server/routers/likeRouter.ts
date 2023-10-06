import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const likeRouter = router({

    onLike: publicProcedure
        .input(z.object({
            tweetId: z.string(),
            userEmail: z.string()
        }))
        .mutation(async opts => {
            const { tweetId, userEmail } = opts.input;
            if (!userEmail) {
                return {
                    code: 403,
                    message: 'token not found',
                    like: ''
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
                    message: 'User not found',
                    like: ''
                }
            }

            const addLike = await prisma.likes.create({
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
                message: 'successfully likes tweet',
                like: addLike
            }
        }),

    ifLike: publicProcedure
        .input(z.object({
            tweetId: z.string(),
            userEmail: z.string().nullable()
        }))
        .mutation(async opts => {
            const { tweetId, userEmail } = opts.input;
            if (!userEmail) {
                return {
                    code: 403,
                    message: 'token not found',
                    status: false,
                    like: ''
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
                    message: 'User not found',
                    status: false,
                    like: ''
                }
            }

            const like = await prisma.likes.findFirst({
                where: {
                    tweetId: tweetId,
                    userId: user.id
                }
            })

            if (!like) {
                return {
                    code: 403,
                    message: 'User found but he has not liked tweet',
                    status: false,
                    like: like
                }
            }

            return {
                code: 200,
                message: 'User has liked tweet',
                status: true,
                like: like
            }

        }),

    unLike: publicProcedure
        .input(z.object({
            tweetId: z.string(),
            userEmail: z.string(),
        }))
        .mutation(async opts => {
            const { tweetId, userEmail } = opts.input;
            if (!userEmail) {
                return {
                    code: 403,
                    message: 'token not found'
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
                    message: 'user not found'
                }
            }
            const like = await prisma.likes.deleteMany({
                where: {
                    tweetId: tweetId,
                    userId: user.id
                }
            })
            const decrementLikesInTweet = await prisma.tweet.update({
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
                message: 'unliked successfully'
            }

        })

})