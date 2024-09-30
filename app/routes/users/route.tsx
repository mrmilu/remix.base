import { locator } from "@/ioc/__generated__";
import { TYPES } from "@/ioc/__generated__/types";
import type { IocProvider } from "@/ioc/interfaces";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import UsersListPage from "@/src/users/presentation/pages/users-list-page/users-list-page";
import type { GetUsersUseCase } from "@/src/users/application/use-cases/get-users-use-case";
import { useUsersListProvider } from "@/src/users/presentation/providers/users-list.provider";

export default function UsersPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <useUsersListProvider.State initialState={{ users: data }}>
      <UsersListPage />
    </useUsersListProvider.State>
  );
}

export async function loader() {
  const getUsersUseCase = await locator.get<IocProvider<GetUsersUseCase>>(TYPES.GetUsersUseCase)();
  const data = await getUsersUseCase.execute();

  return json(data);
}
