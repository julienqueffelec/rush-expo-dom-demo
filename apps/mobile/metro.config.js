const path = require("path");
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const exclusionList = require("metro-config/src/defaults/exclusionList");

const projectRoot = __dirname;
const monorepoRoot = path.resolve(projectRoot, "../..");

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = {
  projectRoot,
  watchFolders: [projectRoot, path.resolve(monorepoRoot, "common/temp")],
  reporter: {
    update: (event) => {
      console.log("event", JSON.stringify(event, null, 2));
      if (event.type === "bundle_build_started") {
        console.log("Bundle build started");
      }
      if (event.type === "bundle_build_completed") {
        console.log("Bundle build completed");
      }
      if (event.type === "bundle_build_failed") {
        console.error("Bundle build failed:", event.error);
      }
    },
  },
  resolver: {
    resolverMainFields: ["react-native", "browser", "main"],
    sourceExts: [
      // Default & Native extensions
      "js",
      "jsx",
      "json",
      "ts",
      "tsx",
      // DOM-specific extensions
      "dom.tsx",
      "dom.ts",
      "dom.jsx",
      "dom.js",
      "web.tsx",
      "web.ts",
      "web.jsx",
      "web.js",
    ],
    resolveRequest: (context, moduleName, platform) => {
      // Handle DOM components for web platform
      console.log("moduleName", JSON.stringify(moduleName, null, 2));
      console.log("platform", JSON.stringify(platform, null, 2));
      if (
        (moduleName.endsWith(".dom.tsx") ||
          moduleName.endsWith(".dom.ts") ||
          moduleName.endsWith(".dom.jsx") ||
          moduleName.endsWith(".dom.js")) &&
        platform !== "web"
      ) {
        // Resolve to Expo DOM implementation
        const expoDomPath = path.resolve(
          projectRoot,
          "node_modules/expo/dom/entry.js"
        );
        return context.resolveRequest(context, expoDomPath, platform);
      }

      // Handle Expo DOM internals
      if (
        moduleName.includes("expo/dom/entry") ||
        moduleName.includes("expo/dom/internal")
      ) {
        const expoDomPath = path.resolve(
          projectRoot,
          "node_modules/expo/dom/internal.js"
        );
        return context.resolveRequest(context, expoDomPath, platform);
      }

      return context.resolveRequest(context, moduleName, platform);
    },
  },
};

const defaultConfig = getDefaultConfig(projectRoot);
const mergedConfig = mergeConfig(defaultConfig, config);

module.exports = mergedConfig;
