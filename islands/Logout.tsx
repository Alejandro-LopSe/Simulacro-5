import { FunctionComponent } from "preact";

export const Logout: FunctionComponent = () => {
  const logout = () => {
    document.cookie = "auth=; Max-Age=0.1";
  };

  return (
    <a
      href="/login"
      onClick={() => {
        logout();
      }}
      class="logout-button"
    >
      Logout
    </a>
  );
};
