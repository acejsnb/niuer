import PathnameChange from './PathnameChange';

let prevRoute = '',
    nextRoute = window.location.pathname;
// 劫持路由 当路由发生改变时记录当前与上一个路由
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
    await PathnameChange();
};

export const getPrevRoute = () => prevRoute;
export const getNextRoute = () => nextRoute;

export default hijackRouter;
