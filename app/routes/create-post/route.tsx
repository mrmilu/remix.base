import CreatePostPage from "@/src/posts/presentation/pages/create-post/create-post";
import { useRouteError } from "@remix-run/react";
import { captureRemixErrorBoundaryError } from "@sentry/remix";

export const ErrorBoundary = () => {
  const error = useRouteError();
  captureRemixErrorBoundaryError(error);
  return <div>Something went wrong in create post page</div>;
};

export default function PostsPage() {
  return <CreatePostPage />;
}
