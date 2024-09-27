import { captureRemixErrorBoundaryError } from "@sentry/remix";
import { Link, Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData, useRouteError, useRouteLoaderData } from "@remix-run/react";
import { useUserProvider } from "@/src/shared/presentation/providers/user.provider";
import { Button } from "@/src/shared/presentation/components/button/button";
import { MainLoader } from "@/src/shared/presentation/components/main-loader/main-loader";
import { Modal } from "@/src/shared/presentation/containers/modal/modal";
import "@/src/shared/presentation/styles/fonts.css";
import "@/src/shared/presentation/styles/globals.css";
import "@/src/shared/presentation/styles/reset.css";
import { theme } from "@/src/shared/presentation/styles/theme.css";
import css from "./root.css";
import i18nServer, { localeCookie } from "@/src/shared/presentation/i18n/i18n.server";
import { useChangeLanguage } from "remix-i18next/react";

import { json, type LoaderFunctionArgs } from "@remix-run/node";

export const ErrorBoundary = () => {
  const error = useRouteError();
  captureRemixErrorBoundaryError(error);
  return <div>Something went wrong</div>;
};

export const handle = { i18n: ["translation"] };

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = await i18nServer.getLocale(request);
  return json({ locale }, { headers: { "Set-Cookie": await localeCookie.serialize(locale) } });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const loaderData = useRouteLoaderData<typeof loader>("root");
  const userLogged = useUserProvider((state) => state.logged);
  const setLogged = useUserProvider((state) => state.setLogged);

  const logUser = () => {
    setLogged(!userLogged);
  };

  return (
    <html lang={loaderData?.locale ?? "en"}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
            <main className={css.main}>{children}</main>
            <footer className={css.footer}>cool footer</footer>
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { locale } = useLoaderData<typeof loader>();
  useChangeLanguage(locale);
  return <Outlet />;
}
