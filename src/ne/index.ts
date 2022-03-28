import HijackRouter from './HijackRouter';
import GlobalAction from './GlobalAction';
import type { App } from './type';

// 子应用列表
let _apps: App[] = [];

type GetApps = () => App[]
const getApps: GetApps = () => _apps;

// 注册应用
type RegisterMicroApps = (apps: App[], basename?: string) => void
const registerMicroApps: RegisterMicroApps = (apps) => {
    // console.log('registerMicroApps===', apps);
    _apps = apps;
};

// 启动
const start = async () => {
    // 运行环境
    (window as any).__POWERED_IS_NIUER__ = true;
    await HijackRouter();
};

export {
    getApps,
    registerMicroApps,
    start,
    GlobalAction
};
