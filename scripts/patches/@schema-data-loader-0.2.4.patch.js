/**
 * @author Javier Muñoz Tous <javimtib92@gmail.com>
 *
 * @schema-data-loader version 0.2.4 patch
 *
 * Due to an inconvenience in class-transformer. (See https://github.com/typestack/class-transformer/issues/563) this library is importing
 * `defaultMetadataStorage` directly from a `commonjs` module.
 *
 * This is forcing bundlers to alias "class-transformer" to "node_modules/class-transformer/cjs" and "class-transformer/cjs/storage.js" to
 * "node_modules/class-transformer/cjs/storage.js"
 *
 * The problem is that in bundlers like Vite, which relies heavily on ESM modules, the alias, plus the `optimizeDeps`, plus using `pnpm` causes a lot of inconsistencies.
 *
 * Therefore we decided to apply two patches in our installation process until this issue is resolved. The first patch is `class-transformer-0.5.1.patch.js` and the second is this one, `@schema-data-loader-0.2.4.patch.js`
 *
 * We hope this issues get resolved soon. 🤞
 *
 * For reference:
 *
 * PR making public accessible storage: https://github.com/typestack/class-transformer/pull/1715
 * Related issue: https://github.com/typestack/class-transformer/issues/563
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = getDirname();

(() => {
  const nodeModulesDir = path.join(findRootWithPackageJson(), "node_modules");

  const schemaDataLoaderCoreDir = path.join(nodeModulesDir, "@schema-data-loader/core");

  const schemaDataLoaderPackageFile = getPackageJson(schemaDataLoaderCoreDir);

  if (schemaDataLoaderPackageFile.version !== "0.2.4") {
    console.warn("Warning: @schema-data-loader-0.2.5.patch is being applied to a different version. Please verify if this patch is still necessary.");
  }

  const decoratorsDir = path.join(schemaDataLoaderCoreDir, "decorators", "dist");

  const resolversDir = path.join(schemaDataLoaderCoreDir, "resolver", "dist");

  for (const directory of [decoratorsDir, resolversDir]) {
    const items = fs.readdirSync(directory);

    for (const item of items) {
      const itemPath = path.join(directory, item);
      const stat = fs.statSync(itemPath);

      if (stat.isFile() && (item.endsWith("cjs.js") || item.endsWith("esm.js"))) {
        let fileContent = fs.readFileSync(itemPath, "utf-8");
        let modifiedContent = fileContent;

        const comment = `/**\n * This file has been modified by patch "@schema-data-loader-0.2.5.patch.\n * The patch introduces changes to the way defaultMetadataStorage is imported.\n */\n\n`;

        if (!fileContent.startsWith(comment)) {
          modifiedContent = comment + modifiedContent;
        } else {
          // If patch was already applied to this file we exit early
          console.error(`Patch "@schema-data-loader-0.2.5.patch is already applied. Skipping...`);

          return;
        }

        modifiedContent = modifiedContent.replace(/require\('class-transformer\/cjs\/storage\.js'\)/g, "require('class-transformer')");
        modifiedContent = modifiedContent.replace(
          /import\s+\{\s*defaultMetadataStorage\s*\}\s*from\s*['"]class-transformer\/cjs\/storage\.js['"]/g,
          "import { defaultMetadataStorage } from 'class-transformer'"
        );

        fs.writeFileSync(itemPath, modifiedContent, "utf-8");
      }
    }
  }

  console.log(`\x1b[32m Applied @schema-data-loader-0.2.4.patch  \x1b[0m`);
})();

function getDirname() {
  try {
    return __dirname;
  } catch {
    const __filename = fileURLToPath(import.meta.url);

    const __dirname = path.dirname(__filename);

    return __dirname;
  }
}

function getPackageJson(currentDir = __dirname) {
  const packageJsonPath = path.join(currentDir, "package.json");

  if (fs.existsSync(packageJsonPath)) {
    const content = fs.readFileSync(packageJsonPath, "utf-8");
    const packageJson = JSON.parse(content);
    return packageJson;
  } else {
    throw new Error("@schema-data-loader package not found");
  }
}

/**
 * Search the neareast directory that contains a package.json file.
 * @param {string} currentDir
 * @returns
 */
function findRootWithPackageJson(currentDir = __dirname) {
  const packagePath = path.join(currentDir, "package.json");

  if (fs.existsSync(packagePath)) {
    return currentDir;
  }

  const parentDir = path.resolve(currentDir, "..");
  if (parentDir === currentDir) {
    throw new Error("package.json not found in any parent directory");
  }

  return findRootWithPackageJson(parentDir);
}
