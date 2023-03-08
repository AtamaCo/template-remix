/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  serverDependenciesToBundle: ["@atamaco/renderer-react", "@atamaco/preview-react", "@atamaco/preview", "@atamaco/preview-messaging", "@atamaco/remix"],
  server: process.env.NODE_ENV === "development" ? undefined : "./server.js",
  serverBuildPath: "api/index.js",
  future: {
    v2_routeConvention: true,
    unstable_tailwind: true,
    v2_meta: true,
  },
};
