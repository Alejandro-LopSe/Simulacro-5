import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { VideList } from "../components/VideoList.tsx";
import { ApiUser, Video } from "../types.ts";

export const handler: Handlers<Video[], ApiUser> = {
  GET: async (_req: Request, ctx: FreshContext<ApiUser, Video[]>) => {
    const data = await fetch(
      `${Deno.env.get("URL")}/videos/${ctx.state.id}`,
    );
    if (data.status !== 200) {
      return ctx.render();
    }
    const videos: Video[] = await data.json();
    return ctx.render(videos);
  },
};

export default function Page(props: PageProps<Video[], ApiUser>) {
  return <VideList user={props.state} videos={props.data}></VideList>;
}
