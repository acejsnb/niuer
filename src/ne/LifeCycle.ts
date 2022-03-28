import type { App } from './type';

// 子应用周期
export const beforeMount = async (app: App) => {
    app.beforeMount && await app.beforeMount(app.props);
};
export const mount = async (app: App) => {
    app.mount && await app.mount(app.props);
};
export const unmount = async (app: App) => {
    app.unmount && await app.unmount(app.props);
};
