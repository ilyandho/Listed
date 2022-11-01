import { z } from "zod";
import { google } from "googleapis";
import { env } from "../../../env/server.mjs";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const youtubeRouter = router({
  subscriptions: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id;
    const user = await ctx.prisma.account.findMany({
      where: {
        userId: userId,
      },
    });

    const subs = await fetch(
      ` https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&mine=true&key=${env.YOUTUBE_API_KEY}&maxResults=50`,
      {
        headers: {
          Authorization: `Bearer ${user[0]?.access_token}`,
          Accept: "application/json",
        },
      }
    );

    const subData = await subs.json();
    console.log(subData.items);
    return subData.items;
  }),
  getAuthCode: publicProcedure.query(async () => {}),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});

interface User {
  id: String;
  userId: String;
  refresh_token: String;
  access_token: String;
}
