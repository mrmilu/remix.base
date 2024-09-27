import { locator } from "@/ioc/__generated__";
import { TYPES } from "@/ioc/__generated__/types";
import type { IocProvider } from "@/ioc/interfaces";
import type { GetPostsUseCase } from "@/src/posts/application/use-cases/get-posts-use-case";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";

import PostsListPage from "@/src/posts/presentation/pages/posts-list/posts-list";

export default function PostsPage() {
  const data = useLoaderData<typeof loader>();

  return <PostsListPage posts={data} />;
}

export async function loader() {
  const getPostsUseCase = await locator.get<IocProvider<GetPostsUseCase>>(TYPES.GetPostsUseCase)();
  const data = await getPostsUseCase.execute();

  return json(data);
}
