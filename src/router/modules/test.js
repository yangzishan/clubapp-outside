const living = {
  path: "/",
  name: "knowledge",
  redirect: "/knowledge",
  component: () => import("@/base/index.vue"),
  meta: {
    index: 2
  },
  children: [
    {
      path: "/knowledge",
      name: "knowledge",
      component: () => import("@/components/knowledge/index.vue"),
      meta: {
        keepAlive: true,
        index: 3
      }
    },
    {
      path: "/list",
      name: "list",
      component: () => import("@/components/listPage/index.vue"),
      meta: {
        keepAlive: true,
        index: 4
      }
    }

  ]
};
export default living;
