import { ExposeAll } from "@schema-data-loader/core/decorators";
import { SocialNetworks } from "@/src/cms/domain/models/social-networks";
import type { DataModel } from "@/src/shared/data/models/data-model";

@ExposeAll()
export class SocialNetworksSchema implements DataModel<SocialNetworks> {
  blog? = "";
  facebook? = "";
  twitter? = "";
  youtube? = "";
  instagram? = "";

  toDomain(): SocialNetworks {
    return new SocialNetworks({
      blog: this.blog,
      facebook: this.facebook,
      twitter: this.twitter,
      youtube: this.youtube,
      instagram: this.instagram
    });
  }
}
