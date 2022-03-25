import HijackRouter from './HijackRouter';
import PathnameChange from './PathnameChange';
import type { App } from './type';

// 子应用列表
let _apps: App[] = [];

type GetApps = () => App[]
const getApps: GetApps = () => _apps;

// 注册应用
type RegisterMicroApps = (apps: App[]) => void
const registerMicroApps: RegisterMicroApps = (apps) => {
    console.log('registerMicroApps===', apps);
    _apps = apps;
};

// 启动
const start = async () => {
    (window as any).__POWERED_IS_NIUER__ = true;
    await HijackRouter();
    await PathnameChange();
};

export {
    getApps,
    registerMicroApps,
    start
};
