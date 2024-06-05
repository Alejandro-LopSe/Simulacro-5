import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Video } from "../../components/Video.tsx";
import { ApiUser, Video as Videotype } from "../../types.ts";

export const handler: Handlers<Videotype, ApiUser> = {
  GET: async (req: Request, ctx: FreshContext<ApiUser, Videotype>) => {
    const data = await fetch(
      `https://videoapp-api.deno.dev/video/${ctx.state.id}/${ctx.params.id}`,
      {
        method: "get",
      },
    );
    const video: Videotype = await data.json();

    return ctx.render(video);
  },
};

export default function Page(props: PageProps<Videotype, ApiUser>) {
  return <Video user={props.state} video={props.data}></Video>;
}
