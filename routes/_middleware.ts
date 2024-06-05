import { FreshContext } from "$fresh/server.ts";
import jwt from "jsonwebtoken";
import { ApiUser } from "../types.ts";

export const handler = async (req: Request, ctx: FreshContext<ApiUser>) => {
  if (ctx.destination !== "route") {
    const res = await ctx.next();
    return res;
  }

  if (ctx.route === "/login" || ctx.route === "/register") {
    const res = await ctx.next();
    return res;
  }
  const cookie_raw = req.headers.get("cookie");

  if (!cookie_raw) {
    const headers = new Headers({ location: "/login" });
    return new Response("", {
      headers,
      status: 302,
    });
  }

  const cookie: ApiUser = await jwt.verify(
    cookie_raw.substring(5),
    Deno.env.get("JWT"),
  );
  if (!cookie) {
    const headers = new Headers({ location: "/login" });
    return new Response("", {
      headers,
      status: 302,
    });
  }
  ctx.state = cookie;

  const res = await ctx.next();
  return res;
};
