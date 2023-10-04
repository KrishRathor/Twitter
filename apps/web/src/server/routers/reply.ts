import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const replyRouter = router({

    postReply: publicProcedure
        .input(z.object({
            tweetId: z.string(),
            userId: z.string().nullable(),
            content: z.string()
        }))
        .mutation(async opts => {
            const { tweetId, userId, content } = opts.input;
            if (!userId) {
                return {
                    code: 403,
                    message: 'Please login before continuing...'
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
                    message: 'User not Found'
                }
            }
            const postReply = await prisma.replies.create({
                data: {
                    tweetId: tweetId,
                    userId: user?.id,
                    content: content
                }
            })
            return {
                code: 201,
                message: 'Reply sent successfully',
                postReply
            }
        })

})