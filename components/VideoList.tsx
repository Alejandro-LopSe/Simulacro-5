import { FunctionComponent } from "preact";
import { ApiUser, Video } from "../types.ts";
import { Fav } from "../islands/Fav.tsx";

export const VideList: FunctionComponent<{ user: ApiUser; videos: Video[] }> = (
  { videos, user },
) => {
  return (
    <div class="video-page-container">
      <h1 class="video-list-title">Curso Deno Fresh</h1>
      {videos && videos.map((video: Video) => {
        return (
          <div class="video-item" key={video.id}>
            <a href={`/video/${video.id}`} class="video-link">
              <img
                src={video.thumbnail}
                alt={video.title}
                class="video-thumbnail"
              />
              <div class="video-info">
                <h3 class="video-title">{video.title}</h3>
                <p class="video-description">{video.description}</p>
                <p class="video-release-date">{video.date}</p>
              </div>
            </a>
            <Fav idvid={video.id} fav={video.fav} userid={user.id}></Fav>
          </div>
        );
      })}
    </div>
  );
};
