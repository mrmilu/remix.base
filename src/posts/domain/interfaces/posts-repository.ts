import type { Post } from "@/src/posts/domain/models/post";
import type { Page } from "@/src/shared/domain/models/page";

export interface IPostsRepository {
  posts(): Promise<Page<Post>>;
}
