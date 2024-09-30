import css from "@/src/shared/presentation/styles/wrapper.css";
import { SimpleCard } from "@/src/shared/presentation/components/simple-card/simple-card";
import { useUiProvider } from "@/src/shared/presentation/providers/ui.provider";
import type { User } from "@/src/users/domain/models/user";
import { UserModal } from "@/src/users/presentation/components/user-modal/user-modal";
import PageTitle from "@/src/shared/presentation/components/page-title/page-title";
import { useTranslation } from "react-i18next";
import { useUsersListProvider } from "@/src/users/presentation/providers/users-list.provider";

export default function UsersListPage() {
  const users = useUsersListProvider((state) => state.users);

  const { t } = useTranslation();

  const showModal = useUiProvider((state) => state.showModal);
  const showUserModal = (user: User) => {
    showModal(<UserModal user={user} />);
  };

  return (
    <>
      <PageTitle title={t("usersTitle")}></PageTitle>

      <div className={css.wrapper}>
        {users.map((user, idx) => (
          <SimpleCard data-cy="user-card" onClick={() => showUserModal(user)} key={`${user.id}_${idx}`} title={user.name} subtitle={user.email} />
        ))}
      </div>
    </>
  );
}
