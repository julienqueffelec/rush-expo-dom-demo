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
  resolver: {
    resolveRequest: (context, moduleName, platform) => {
      return context.resolveRequest(context, moduleName, platform);
    },
  },
  transformer: {
    ...getDefaultConfig(projectRoot).transformer,
    unstable_allowRequireContext: true,
  },
};

const defaultConfig = getDefaultConfig(projectRoot);
const mergedConfig = mergeConfig(defaultConfig, config);

module.exports = mergedConfig;
