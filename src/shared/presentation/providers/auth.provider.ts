import { createProvider } from "@/src/shared/presentation/utils/zustand";
import type { AuthStateViewModel } from "../view-models/auth-state";

export const useAuthProvider = createProvider<AuthStateViewModel>(() => (_set) => ({
  loggedIn: false
}));
