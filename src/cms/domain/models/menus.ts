import type { CMSSerializableContentModel } from "@/src/cms/domain/models/cms-content-model";

export interface Menus {
  sideBarTop: CMSSerializableContentModel | null;
  sideBarBottom: CMSSerializableContentModel | null;
  footer: CMSSerializableContentModel | null;
}

export function createEmptyMenus(): Menus {
  return {
    sideBarTop: null,
    sideBarBottom: null,
    footer: null
  };
}
