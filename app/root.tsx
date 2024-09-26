import { captureRemixErrorBoundaryError } from "@sentry/remix";
import { Links, Meta, Outlet, Scripts, useRouteError } from "@remix-run/react";

export const ErrorBoundary = () => {
  const error = useRouteError();
  captureRemixErrorBoundaryError(error);
  return <div>Something went wrong</div>;
};

export default function App() {
  return (
    <html>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />

        <Scripts />
      </body>
    </html>
  );
}
