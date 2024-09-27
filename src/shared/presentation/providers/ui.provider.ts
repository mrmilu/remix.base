/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode } from "react";
import { createStore } from "zustand";
import { useStoreWithEqualityFn } from "zustand/traditional";
import { immer } from "zustand/middleware/immer";
import type { UiStateViewModel } from "../view-models/ui-state";

export const uiProvider = createStore<UiStateViewModel>()(
  immer((set) => ({
    showLoader: false,
    modal: {
      show: false,
      content: null
    },
    showModal(modalContent: ReactNode) {
      set((state) => {
        state.modal.content = modalContent;
      });

      setTimeout(() => {
        set((state) => {
          state.modal.show = true;
        });
      }, 150);
    },
    setLoader(value: boolean) {
      set((state) => {
        state.showLoader = value;
      });
    },
    hideModal() {
      set((state) => {
        state.modal.show = false;
      });

      setTimeout(() => {
        set((state) => {
          state.modal.content = null;
        });
      }, 150);
    }
  }))
);

export function useUiProvider(): UiStateViewModel;
export function useUiProvider<T>(selector: (state: UiStateViewModel) => T, equals?: (a: T, b: T) => boolean): T;
export function useUiProvider(selector?: any, equals?: any) {
  return useStoreWithEqualityFn(uiProvider, selector, equals);
}
