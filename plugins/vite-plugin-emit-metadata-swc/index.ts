import swc from "@swc/core";
import type { Plugin } from "vite";

const findContent = (fileContent: string, contentRegEx: RegExp) => contentRegEx.test(fileContent);

export const vitePluginEmitMetadataSwc = ({
  fileRegEx = /\.ts$/,
  contentRegEx = /((?<![\(\s]\s*['"])@\w*[\w\d]\s*(?![;])[\((?=\s)])/
} = {}): Plugin => {
  return {
    name: "transform-decorators-metadata",
    enforce: "pre",

    transform(src: string, id: string) {
      if (fileRegEx.test(id)) {
        const hasDecorator = findContent(src, contentRegEx);
        if (!hasDecorator) {
          return;
        }

        const program = swc.transformSync(src, {
          filename: id,
          isModule: true,
          jsc: {
            parser: {
              tsx: true,
              syntax: "typescript",
              decorators: true
            },
            transform: {
              decoratorMetadata: true
            }
          }
        });

        return {
          code: program.code,
          map: program.map
        };
      }
    }
  };
};
