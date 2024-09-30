import { PostDataModel } from "@/src/posts/data/models/post-data-model";
import type { Post } from "@/src/posts/domain/models/post";
import type { JSONPlaceholderService } from "@/src/shared/data/services/json-placeholder-service";
import type { Page } from "@/src/shared/domain/models/page";
import { TYPES } from "@/src/shared/ioc/__generated__/types";
import type { IocProvider } from "@/src/shared/ioc/interfaces";
import { inject, injectable } from "inversify";
import type { IPostsRepository } from "@/src/posts/domain/interfaces/posts-repository";
import { fromJson, fromJsonPage } from "@/src/shared/data/utils/class-transformer";
import { type CreatePostInputModel } from "@/src/posts/domain/models/create-post-input-model";

@injectable()
export class PostsRepository implements IPostsRepository {
  @inject(TYPES.JSONPlaceholderService) private jsonPlaceholderServiceProvider!: IocProvider<JSONPlaceholderService>;

  async createPost(input: CreatePostInputModel): Promise<Post | null> {
    const jsonPlaceholderService = await this.jsonPlaceholderServiceProvider();

    const { id } = await jsonPlaceholderService.post<Record<string, unknown>>("/posts", {
      data: {
        title: input.title,
        body: input.body,
        userId: 1
      }
    });

    return fromJson<PostDataModel>(PostDataModel, {
      id,
      title: input.title,
      body: input.body,
      userId: 1
    }).toDomain();
  }
  async posts(): Promise<Page<Post>> {
    const jsonPlaceholderService = await this.jsonPlaceholderServiceProvider();

    const dataPostList = await jsonPlaceholderService.get<Array<Record<string, unknown>>>("/posts");

    const fakePage = {
      results: dataPostList,
      totalCount: dataPostList.length,
      page: 1
    };
    return fromJsonPage<PostDataModel, Post>(PostDataModel, fakePage).toDomain();
  }
}
