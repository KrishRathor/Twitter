import { publicProcedure, router } from "../trpc";
import { z } from "zod";

export const userRouter = router({
    
    signup: publicProcedure
        .input(z.object({
            email: z.string(),
            username: z.string(),
            password: z.string()
        }))
        .mutation(async opts => {
            const {username, email, password} = opts.input;
            console.log(opts);
            return {
                username,
                email,
                password
            }
        })

})