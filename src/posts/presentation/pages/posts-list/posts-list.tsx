import css from "@/src/shared/presentation/styles/wrapper.css";
import { SimpleCard } from "@/src/shared/presentation/components/simple-card/simple-card";
import type { Post } from "@/src/posts/domain/models/post";

export default function PostsPage({ posts }: { posts: Array<Post> }) {
  return (
    <div className={css.wrapper}>
      {posts.map((post, idx) => (
        <SimpleCard key={`${post.id}_${idx}`} title={post.title} subtitle={post.body} />
      ))}
    </div>
  );
}
