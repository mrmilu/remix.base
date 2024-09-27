import { captureRemixErrorBoundaryError } from "@sentry/remix";
import { Link, Links, Meta, Outlet, Scripts, useRouteError } from "@remix-run/react";
import { useUserProvider } from "@/src/shared/presentation/providers/user.provider";
import { Button } from "@/src/shared/presentation/components/button/button";
import { MainLoader } from "@/src/shared/presentation/components/main-loader/main-loader";
import { Modal } from "@/src/shared/presentation/containers/modal/modal";
import "@/src/shared/presentation/styles/fonts.css";
import "@/src/shared/presentation/styles/globals.css";
import "@/src/shared/presentation/styles/reset.css";
import { theme } from "@/src/shared/presentation/styles/theme.css";
import css from "./root.css";

export const ErrorBoundary = () => {
  const error = useRouteError();
  captureRemixErrorBoundaryError(error);
  return <div>Something went wrong</div>;
};

export default function App() {
  const userLogged = useUserProvider((state) => state.logged);
  const setLogged = useUserProvider((state) => state.setLogged);

  const logUser = () => {
    setLogged(!userLogged);
  };

  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div className={theme}>
          <Modal />
          <MainLoader />
          <div className={css.wrapper}>
            <nav className={css.nav}>
              <ul className={css.ul}>
                <li>
                  <Link to="/">home</Link>
                </li>
                <li>
                  <Link to="/users">users</Link>
                </li>
                <li>
                  <Link to="/create-post">create post</Link>
                </li>
                <li>
                  <Link to="/posts">list post</Link>
                </li>
              </ul>
              <Button data-cy="login-btn" onClick={logUser}>
                {userLogged ? "Log out" : "Log in"}
              </Button>
            </nav>
            <main className={css.main}>
              <Outlet />
            </main>
            <footer className={css.footer}>cool footer</footer>
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
