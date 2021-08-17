const living = {
  path: "/test",
  name: "test",
  redirect: "/test",
  component: () => import("@/base/index.vue"),
  meta: {
    index: 2
  },
  children: [
    {
      path: "/test",
      name: "test",
      component: () => import("@/components/testpage/index.vue"),
      meta: {
        keepAlive: true,
        index: 3
      }
    }
  ]
};
export default living;
