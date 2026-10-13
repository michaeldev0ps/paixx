const manifest = {
  routes: [
    {
      pattern: /^\/$/,
      component: async () => (await import("./routes/index.tsx")).default,
      file: "./routes/index.tsx",
      routeParams: [],
    },
  ],
  islands: [],
  baseUrl: import.meta.url,
};

export default manifest;
