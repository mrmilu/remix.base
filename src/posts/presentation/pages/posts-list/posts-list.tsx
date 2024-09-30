import css from "@/src/shared/presentation/styles/wrapper.css";
import { SimpleCard } from "@/src/shared/presentation/components/simple-card/simple-card";
import { useTranslation } from "react-i18next";
import PageTitle from "@/src/shared/presentation/components/page-title/page-title";
import { usePostsListProvider } from "../../providers/posts-list.provider";

export default function PostsPage() {
  const posts = usePostsListProvider((state) => state.posts);

  const { t } = useTranslation();

  return (
    <>
      <PageTitle title={t("postsTitle")}></PageTitle>

      <div className={css.wrapper}>
        {posts.map((post, idx) => (
          <SimpleCard key={`${post.id}_${idx}`} title={post.title} subtitle={post.body} />
        ))}
      </div>
    </>
  );
}
