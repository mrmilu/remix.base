import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import * as path from "path";

export default defineConfig({
  plugins: [
    remix(),
    svgr({
      svgrOptions: {
        dimensions: false,
        svgoConfig: {
          plugins: [{ name: "removeViewBox", active: false }]
        }
      }
    }),
    vanillaExtractPlugin(),
    sentryVitePlugin({
      disable: !process.env.SENTRY_ENABLED,
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      url: process.env.SENTRY_URL,
      sourcemaps: {
        filesToDeleteAfterUpload: "**/*.map"
      }
    })
  ],

  server: {
    port: 3000
  },

  resolve: {
    alias: [
      { find: "@/src", replacement: path.resolve(__dirname, "src") },
      {
        find: "@/ioc",
        replacement: path.resolve(__dirname, "src/shared/ioc")
      }
    ]
  },

  build: {
    sourcemap: true
  }
});
