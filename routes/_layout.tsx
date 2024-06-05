import { PageProps } from "$fresh/server.ts";
import { Header } from "../components/Header.tsx";
import { ApiUser } from "../types.ts";

export default function Layout(props: PageProps<unknown, ApiUser>) {
  return (
    <div class="page-container">
      {props.route !== "/login" && props.route !== "/register" && (
        <Header name={props.state.name}></Header>
      )}
      <props.Component></props.Component>
    </div>
  );
}
