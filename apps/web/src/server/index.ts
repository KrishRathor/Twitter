import { router } from './trpc';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import jwt from "jsonwebtoken";
import { userRouter } from './routers/user';
import cors from "cors";
export const SECRET = 'SECr3t';

// using trpc
export const appRouter = router({
    user: userRouter
});


// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;

const server = createHTTPServer({
    router: appRouter,
    middleware: cors(),
    createContext(opts) {
        let authHeader = opts.req.headers["authorization"];

        if (authHeader) {
            const token = authHeader.split(' ')[1];
            console.log(token);
            return new Promise<{userId?: string}>((resolve) => {
                jwt.verify(token, SECRET, (err, user) => {
                    if (user) {
                        //@ts-ignore
                        resolve({userId: user.userId as string});
                    } else {
                        resolve({userId: undefined});
                    }
                });
            })
        }

        return {
            userId: undefined,
        }
    }
});
   
server.listen(5000);