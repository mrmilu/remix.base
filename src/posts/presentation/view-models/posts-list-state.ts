import type { Post } from "@/src/posts/domain/models/post";

export interface PostsListStateViewModel {
  posts: Array<Post>;
}
