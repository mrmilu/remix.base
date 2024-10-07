import { File, ImageStyleUri } from "@/src/cms/domain/models/file";
import type { DataModel } from "@/src/shared/data/models/data-model";
import { ExposeAll } from "@schema-data-loader/core/decorators";
import { Expose, Type } from "class-transformer";
import { MetaSchema } from "@/src/cms/data/dtos/meta-schema";

@ExposeAll({ nameCasing: "snakeCase" })
export class ImageStyleUriSchema implements DataModel<ImageStyleUri> {
  headerImg = "";
  @Expose({ name: "image_110x55" })
  image110x55 = "";
  image1140 = "";
  @Expose({ name: "image_1300x620" })
  image1300x620 = "";
  @Expose({ name: "image_1440x654" })
  image1440x654 = "";
  @Expose({ name: "image_150_100" })
  image150100 = "";
  @Expose({ name: "image_165" })
  image165 = "";
  @Expose({ name: "image_165_80" })
  image16580 = "";
  @Expose({ name: "image_237_178" })
  image237178 = "";
  image252 = "";
  @Expose({ name: "image_375x190" })
  image375x190 = "";
  @Expose({ name: "image_375x200" })
  image375x200 = "";
  @Expose({ name: "image_375x250" })
  image375x250 = "";
  @Expose({ name: "image_375x600" })
  image375x600 = "";
  @Expose({ name: "image_390x192" })
  image390x192 = "";
  @Expose({ name: "image_750x1200" })
  image750x1200 = "";
  @Expose({ name: "image_800x620" })
  image800x620 = "";
  @Expose({ name: "image_920x470" })
  image920x470 = "";
  @Expose({ name: "image_940x600" })
  image940x600 = "";
  imageCaetanoGo = "";
  @Expose({ name: "image_h500" })
  imageH500 = "";
  @Expose({ name: "image_w100" })
  imageW100 = "";
  @Expose({ name: "image_w110" })
  imageW110 = "";
  @Expose({ name: "image_w112" })
  imageW112 = "";
  @Expose({ name: "image_w120" })
  imageW120 = "";
  @Expose({ name: "image_w140" })
  imageW140 = "";
  @Expose({ name: "image_w1672" })
  imageW1672 = "";
  @Expose({ name: "image_w40" })
  imageW40 = "";
  @Expose({ name: "image_w400" })
  imageW400 = "";
  @Expose({ name: "image_w439" })
  imageW439 = "";
  @Expose({ name: "image_w44" })
  imageW44 = "";
  @Expose({ name: "image_w565" })
  imageW565 = "";
  @Expose({ name: "image_w800" })
  imageW800 = "";
  @Expose({ name: "image_w920" })
  imageW920 = "";
  imageWebp = "";
  large = "";
  mediaLibrary = "";
  medium = "";
  productCarousel = "";
  productCarouselMobile = "";
  productTeaser = "";
  thumbnail = "";

  toDomain(): ImageStyleUri {
    return new ImageStyleUri({
      headerImg: this.headerImg,
      image110x55: this.image110x55,
      image1140: this.image1140,
      image1300x620: this.image1300x620,
      image1440x654: this.image1440x654,
      image150100: this.image150100,
      image165: this.image165,
      image16580: this.image16580,
      image237178: this.image237178,
      image252: this.image252,
      image375x190: this.image375x190,
      image375x200: this.image375x200,
      image375x250: this.image375x250,
      image375x600: this.image375x600,
      image390x192: this.image390x192,
      image750x1200: this.image750x1200,
      image800x620: this.image800x620,
      image920x470: this.image920x470,
      image940x600: this.image940x600,
      imageCaetanoGo: this.imageCaetanoGo,
      imageH500: this.imageH500,
      imageW100: this.imageW100,
      imageW110: this.imageW110,
      imageW112: this.imageW112,
      imageW120: this.imageW120,
      imageW140: this.imageW140,
      imageW1672: this.imageW1672,
      imageW40: this.imageW40,
      imageW400: this.imageW400,
      imageW439: this.imageW439,
      imageW44: this.imageW44,
      imageW565: this.imageW565,
      imageW800: this.imageW800,
      imageW920: this.imageW920,
      imageWebp: this.imageWebp,
      large: this.large,
      mediaLibrary: this.mediaLibrary,
      medium: this.medium,
      productCarousel: this.productCarousel,
      productCarouselMobile: this.productCarouselMobile,
      productTeaser: this.productTeaser,
      thumbnail: this.thumbnail
    });
  }
}

export class FileSchema implements DataModel<File> {
  @Expose()
  filename = "";

  @Expose()
  @Type(() => MetaSchema)
  _meta? = new MetaSchema();

  @Expose()
  @Type(() => ImageStyleUriSchema)
  image_style_uri: ImageStyleUriSchema | null = null;

  toDomain(): File {
    return new File({
      filename: this.filename,
      meta: this._meta?.toDomain(),
      imageStyleUri: this.image_style_uri?.toDomain()
    });
  }
}
