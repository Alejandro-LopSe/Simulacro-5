import { useState } from "preact/hooks";
import { FunctionComponent } from "preact";
import { Video } from "../types.ts";

export const Fav: FunctionComponent<
  { idvid: string; fav: boolean; userid: string }
> = (
  { fav, idvid, userid },
) => {
  const [added, setadded] = useState<boolean>(fav);
  const toggle = async () => {
    const data = await fetch(
      `https://videoapp-api.deno.dev/fav/${userid}/${idvid}`,
      {
        method: "post",
      },
    );
    if (data.status === 200) {
      console.log("Fav toggled");
      setadded(!added);
      return;
    }
    console.log("error on fav");
    return;
  };
  return (
    <button
      class="fav-button"
      onClick={() => {
        toggle();
      }}
    >
      {added ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
    </button>
  );
};
