import { BlockTextHtmlLayoutType } from "@/src/cms/domain/models/block/block-text-html-layout-type";

export type BlockTextHtmlLayoutTypeDataModel = "only_text" | "text_img_left" | "text_img_right";

const toDomainMap: Record<BlockTextHtmlLayoutTypeDataModel, BlockTextHtmlLayoutType> = {
  only_text: BlockTextHtmlLayoutType.onlyText,
  text_img_left: BlockTextHtmlLayoutType.textImgLeft,
  text_img_right: BlockTextHtmlLayoutType.textImgRight
};
export function blockTextHtmlLayoutTypeDataModelToDomain(value?: BlockTextHtmlLayoutTypeDataModel): BlockTextHtmlLayoutType {
  return toDomainMap[value ?? "only_text"];
}
