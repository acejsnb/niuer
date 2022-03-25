import { getApps } from '.';
import { bootstrap, mount, unmount } from './LifeCycle';
import ImportHTML from './ImportHTML';
import { getPrevRoute, getNextRoute } from './HijackRouter';
import SetNodeAttribute from './SetNodeAttribute';

// 路由变化处理
const PathnameChange = async () => {
    const apps = getApps(),
        // 上一个App
        prevApp = apps.find(d => getPrevRoute().includes(d.activeRule)),
        // 当前（下一个）App
        app = apps.find(d => getNextRoute().includes(d.activeRule));

    if (!app || prevApp === app) return;
    // 卸载上一个App
    if (prevApp) {
        await unmount(prevApp);
        prevApp.sandbox?.inactive();
    }

    if (!app) return;
    // console.log(11111, app);

    const { name, entry, container, sandbox: appSandbox } = app;
    (window as any).__INJECTED_PUBLIC_PATH_IS_NIUER__ = entry;

    const { template, execScripts } = await ImportHTML(entry);
    const _container = document.querySelector(container);
    _container.innerHTML = '';
    const div = document.createElement('div');
    SetNodeAttribute(div, { __app_by_niuer__: '', 'data-name': name });
    _container.appendChild(div);
    // 创建Shadow
    const shadow: ShadowRoot = div.attachShadow({ mode: 'open' });
    shadow.innerHTML = template.innerHTML;
    app.props ? (app.props.container = shadow) : (app.props = { container: shadow });

    // 构造CommonJs模块环境
    const { instance, sandbox } = await execScripts(name, appSandbox);
    app.sandbox = sandbox;
    // console.log('insinsinsins', instance);
    app.bootstrap = instance.bootstrap;
    app.mount = instance.mount;
    app.unmount = instance.unmount;

    await bootstrap(app);
    await mount(app);
};

export default PathnameChange;
