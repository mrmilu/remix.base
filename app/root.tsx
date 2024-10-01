import { Form, Link, Links, Meta, Outlet, Scripts, ScrollRestoration, useFormAction, useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { useAuthProvider } from "@/src/shared/presentation/providers/auth.provider";
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

import { type ActionFunctionArgs, json, type LoaderFunctionArgs, redirect } from "@remix-run/node";
import { commitSession, destroySession, getSession } from "@/src/shared/presentation/controllers/session-controller";
import { useTranslation } from "react-i18next";

export const handle = { i18n: ["translation"] };

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = await i18nServer.getLocale(request);
  const session = await getSession(request.headers.get("Cookie"));

  return json({ locale, loggedIn: session.has("userId") }, { headers: { "Set-Cookie": await localeCookie.serialize(locale) } });
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));

  const userId = "2"; // hardcoded user id for demonstration purposes

  if (session.has("userId")) {
    return redirect("/", {
      headers: {
        "Set-Cookie": await destroySession(session)
      }
    });
  } else {
    session.set("userId", userId);

    return redirect(request.url, {
      headers: {
        "Set-Cookie": await commitSession(session)
      }
    });
  }
}
export function Layout({ children }: { children: React.ReactNode }) {
  const action = useFormAction();

  const loaderData = useRouteLoaderData<typeof loader>("root");

  const { t } = useTranslation();

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
                <li>
                  <Link to="/quienes-somos">JSON API page</Link>
                </li>
              </ul>
              <Form method="POST" action={action}>
                <Button type="submit">{loaderData?.loggedIn ? t("signOut") : t("signIn")}</Button>
              </Form>
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
  const { loggedIn, locale } = useLoaderData<typeof loader>();

  useChangeLanguage(locale);

  return (
    <useAuthProvider.State initialState={{ loggedIn }}>
      <Outlet />
    </useAuthProvider.State>
  );
}
