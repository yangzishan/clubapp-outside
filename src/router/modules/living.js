const living = {
  path: "/living",
  name: "living",
  redirect: "/living",
  component: () => import("@/base/index.vue"),
  meta: {
    index: 2
  },
  children: [
    {
      path: "/live",
      name: "直播列表",
      component: () => import("@/components/livingnew/index.vue"),
      meta: {
        keepAlive: true,
        index: 3
      }
    },
    {
      path: "/history-list",
      name: "观看历史",
      component: () => import("@/components/livingnew/history-list.vue"),
      meta: {
        keepAlive: true,
        index: 4
      }
    },
    {
      path: "/recommend",
      name: "推荐相似",
      component: () => import("@/components/livingnew/recommend.vue"),
      meta: {
        keepAlive: false,
        index: 5
      }
    },
    {
      path: "/play-live",
      name: "直播播放页",
      component: () => import("@/components/livingnew/play-live.vue"),
      meta: {
        index: 4
      }
    }
  ]
};
export default living;
