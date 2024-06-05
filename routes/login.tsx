import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Login } from "../components/Login.tsx";
import { VideList } from "../components/VideoList.tsx";
import { ApiUser, LoginUser, Video } from "../types.ts";
import jwt from "jsonwebtoken";

export const handler: Handlers<Video[]> = {
  POST: async (_req: Request, ctx: FreshContext<unknown, Video[]>) => {
    const form = await _req.formData();
    const email = form.get("email")!.toString();
    const password = form.get("password")!.toString();
    const login: LoginUser = {
      email: email,
      password: password,
    };

    const data = await fetch(
      `${Deno.env.get("URL")}/checkuser`,
      {
        method: "post",
        body: JSON.stringify(login),
        headers: { "content-type": "aplication/json" },
      },
    );
    if (data.status !== 200) {
      return ctx.render();
    }
    const user: ApiUser = await data.json();
    const token = await jwt.sign(user, Deno.env.get("JWT"));
    const headers = new Headers({
      location: "/videos",
      "Set-Cookie": `auth=${token}`,
    });
    return new Response("", { status: 302, headers });
  },
};

export default function Page() {
  return <Login></Login>;
}
