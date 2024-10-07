import type { ConstructorType } from "@/src/shared/domain/types/constructor-type";
import type { Meta } from "@/src/cms/domain/models/meta";

export class ImageStyleUri {
  headerImg: string;
  image110x55: string;
  image1140: string;
  image1300x620: string;
  image1440x654: string;
  image150100: string;
  image165: string;
  image16580: string;
  image237178: string;
  image252: string;
  image375x190: string;
  image375x200: string;
  image375x250: string;
  image375x600: string;
  image390x192: string;
  image750x1200: string;
  image800x620: string;
  image920x470: string;
  image940x600: string;
  imageCaetanoGo: string;
  imageH500: string;
  imageW100: string;
  imageW110: string;
  imageW112: string;
  imageW120: string;
  imageW140: string;
  imageW1672: string;
  imageW40: string;
  imageW400: string;
  imageW439: string;
  imageW44: string;
  imageW565: string;
  imageW800: string;
  imageW920: string;
  imageWebp: string;
  large: string;
  mediaLibrary: string;
  medium: string;
  productCarousel: string;
  productCarouselMobile: string;
  productTeaser: string;
  thumbnail: string;

  constructor(params: ConstructorType<ImageStyleUri>) {
    this.headerImg = params.headerImg;
    this.image110x55 = params.image110x55;
    this.image1140 = params.image1140;
    this.image1300x620 = params.image1300x620;
    this.image1440x654 = params.image1440x654;
    this.image150100 = params.image150100;
    this.image165 = params.image165;
    this.image16580 = params.image16580;
    this.image237178 = params.image237178;
    this.image252 = params.image252;
    this.image375x190 = params.image375x190;
    this.image375x200 = params.image375x200;
    this.image375x250 = params.image375x250;
    this.image375x600 = params.image375x600;
    this.image390x192 = params.image390x192;
    this.image750x1200 = params.image750x1200;
    this.image800x620 = params.image800x620;
    this.image920x470 = params.image920x470;
    this.image940x600 = params.image940x600;
    this.imageCaetanoGo = params.imageCaetanoGo;
    this.imageH500 = params.imageH500;
    this.imageW100 = params.imageW100;
    this.imageW110 = params.imageW110;
    this.imageW112 = params.imageW112;
    this.imageW120 = params.imageW120;
    this.imageW140 = params.imageW140;
    this.imageW1672 = params.imageW1672;
    this.imageW40 = params.imageW40;
    this.imageW400 = params.imageW400;
    this.imageW439 = params.imageW439;
    this.imageW44 = params.imageW44;
    this.imageW565 = params.imageW565;
    this.imageW800 = params.imageW800;
    this.imageW920 = params.imageW920;
    this.imageWebp = params.imageWebp;
    this.large = params.large;
    this.mediaLibrary = params.mediaLibrary;
    this.medium = params.medium;
    this.productCarousel = params.productCarousel;
    this.productCarouselMobile = params.productCarouselMobile;
    this.productTeaser = params.productTeaser;
    this.thumbnail = params.thumbnail;
  }
}

export class File {
  filename: string;
  imageStyleUri?: ImageStyleUri;
  meta?: Meta;

  constructor(params: ConstructorType<File>) {
    this.filename = params.filename;
    this.imageStyleUri = params.imageStyleUri;
    this.meta = params.meta;
  }
}
