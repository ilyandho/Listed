import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { youtubeRouter } from "./youtube";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  youtube: youtubeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
