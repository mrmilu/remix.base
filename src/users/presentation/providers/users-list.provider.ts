import { createProvider } from "@/src/shared/presentation/utils/zustand";
import type { UsersListStateViewModel } from "../view-models/users-list-state";

export const useUsersListProvider = createProvider<UsersListStateViewModel>(() => (_set) => ({
  users: []
}));
