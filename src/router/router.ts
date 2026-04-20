
import {createRouter, createWebHistory} from "vue-router";
import {useTh4AdminSystem} from "@/store/th4/admin/system/system.ts";
import {baseRoutes} from "@/router/route.ts";
const whiteList = ["/login", "/logout", "/404", "/401", "/500"];

const router = createRouter({
  history: createWebHistory(),
  routes: baseRoutes
});
router.beforeEach(async (to, _from, next) => {
  // NProgress.start();
  const adminSystemStore = useTh4AdminSystem();
  let title="";
  if (adminSystemStore.role && adminSystemStore.role.title && adminSystemStore.role.title.trim().length > 0) {
    title = adminSystemStore.role.title;
  }
  document.title = title;// + (to.meta.title ? "-" + to.meta.title : "");
  if (whiteList.indexOf(to.path) !== -1) {
    // 进入登陆页面,重置token和route
    if (to.path === "/logout" || to.path === "/login" || to.path.endsWith('/logout')) {
      //await adminSystemStore.logOut();
      next();
      // NProgress.done();
    } else {
      next();
      // NProgress.done();
    }
  } else {
    const token = adminSystemStore.token;
    if (token) {
      if (!adminSystemStore.user) {
        await adminSystemStore.getUser().then(( ) => {
          next({...to, replace: true});
        });
      } else {
        try {
          next();
        } catch (e) {
          // NProgress.done();
        }
      }
    } else {
      next(`/login?redirect=${to.path}`);
    }
  }
});
export default router;