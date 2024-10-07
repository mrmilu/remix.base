import type { ConstructorType } from "@/src/shared/domain/types/constructor-type";

export class RichSnippetMetatag {
  name: string;
  content: string;
  group: string;
  schemaMetatag: boolean;
  tag: string;

  constructor(params: ConstructorType<RichSnippetMetatag>) {
    this.name = params.name;
    this.content = params.content;
    this.group = params.group;
    this.schemaMetatag = params.schemaMetatag;
    this.tag = params.tag;
  }
}
