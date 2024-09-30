import { locator } from "@/ioc/__generated__";
import { TYPES } from "@/ioc/__generated__/types";
import type { IocProvider } from "@/ioc/interfaces";
import type { GetPostsUseCase } from "@/src/posts/application/use-cases/get-posts-use-case";
import { useLoaderData, useRouteError } from "@remix-run/react";
import { json } from "@remix-run/node";

import PostsListPage from "@/src/posts/presentation/pages/posts-list/posts-list";
import { usePostsListProvider } from "@/src/posts/presentation/providers/posts-list.provider";
import { captureRemixErrorBoundaryError } from "@sentry/remix";

export const ErrorBoundary = () => {
  const error = useRouteError();
  captureRemixErrorBoundaryError(error);
  return <div>Something went wrong in posts page</div>;
};

export default function PostsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <usePostsListProvider.State initialState={{ posts: data }}>
      <PostsListPage />
    </usePostsListProvider.State>
  );
}

export async function loader() {
  const getPostsUseCase = await locator.get<IocProvider<GetPostsUseCase>>(TYPES.GetPostsUseCase)();
  const data = await getPostsUseCase.execute();

  return json(data);
}
