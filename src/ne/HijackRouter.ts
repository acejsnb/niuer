import PathnameChange from './PathnameChange';
// import type { App } from './type';

let prevRoute = '',
    nextRoute = window.location.pathname;
const hijackRouter = async () => {
    // 前进后退
    window.addEventListener('popstate', () => {
        prevRoute = nextRoute;
        nextRoute = window.location.pathname;
        PathnameChange();
    });
    // 添加路由
    const rawPushState = window.history.pushState;
    window.history.pushState = (...args) => {
        prevRoute = window.location.pathname;
        rawPushState.apply(window.history, args);
        nextRoute = window.location.pathname;
        PathnameChange();
    };
    // 替换路由
    const rawReplaceState = window.history.replaceState;
    window.history.replaceState = (...args) => {
        prevRoute = window.location.pathname;
        rawReplaceState.apply(window.history, args);
        nextRoute = window.location.pathname;
        PathnameChange();
    };
    // await routerChange();
};

export const getPrevRoute = () => prevRoute;
export const getNextRoute = () => nextRoute;

export default hijackRouter;
