import type { App } from './type';

// 子应用周期
export const bootstrap = async (app: App) => {
    app.bootstrap && await app.bootstrap(app.props);
};
export const mount = async (app: App) => {
    app.mount && await app.mount(app.props);
};
export const unmount = async (app: App) => {
    app.unmount && await app.unmount(app.props);
};
