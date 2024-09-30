import { createProvider } from "@/src/shared/presentation/utils/zustand";
import type { PostsListStateViewModel } from "../view-models/posts-list-state";

export const usePostsListProvider = createProvider<PostsListStateViewModel>(() => (_set) => ({
  posts: []
}));
