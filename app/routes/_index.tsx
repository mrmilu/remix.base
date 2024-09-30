import Home from "@/src/home/presentation/pages/home-page/home-page";
import { useRouteError } from "@remix-run/react";
import { captureRemixErrorBoundaryError } from "@sentry/remix";

export const ErrorBoundary = () => {
  const error = useRouteError();
  captureRemixErrorBoundaryError(error);
  return <div>Something went wrong in home page</div>;
};

export default function HomePage() {
  return <Home />;
}
