import type { NextConfig } from "next";
import path from "node:path";

const projectRoot = __dirname;

const nextConfig: NextConfig = {
  // a stray lockfile above this folder makes Turbopack guess the wrong root
  turbopack: {
    root: projectRoot,
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  sassOptions: {
    // lets .scss files do `@use "variables" as *;` without relative paths
    loadPaths: [path.join(projectRoot, "src/styles")],
  },
};

export default nextConfig;
