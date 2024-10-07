import type { ConstructorType } from "@/src/shared/domain/types/constructor-type";

export class SocialNetworks {
  blog?: string;
  facebook?: string;
  twitter?: string;
  youtube?: string;
  instagram?: string;

  constructor(params: ConstructorType<SocialNetworks>) {
    this.blog = params.blog;
    this.facebook = params.facebook;
    this.twitter = params.twitter;
    this.youtube = params.youtube;
    this.instagram = params.instagram;
  }
}
