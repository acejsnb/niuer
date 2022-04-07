import { getApps } from '.';
import { beforeMount, mount, unmount } from './LifeCycle';
import ImportHTML from './ImportHTML';
import { getPrevRoute, getNextRoute } from './HijackRouter';
import RemoveLastBias from './RemoveLastBias';
import SetNodeAttribute from './SetNodeAttribute';

// 路由变化处理
const PathnameChange = async () => {
    const apps = getApps(),
        prevRoute = RemoveLastBias(getPrevRoute()),
        nextRoute = RemoveLastBias(getNextRoute()),
        // 上一个App
        prevApp = apps.find(d => prevRoute.startsWith(RemoveLastBias(d.activeRule))),
        // 当前（下一个）App
        app = apps.find(d => nextRoute.startsWith(RemoveLastBias(d.activeRule)));

    // if (prevApp?.name === app?.name) return;
    if (prevApp?.name === app?.name && prevRoute === nextRoute) return;
    // 卸载上一个App
    if (prevApp) {
        await unmount(prevApp);
        prevApp.sandbox?.inactive();
    }
    if (!app) return;

    const { name, entry, container, sandbox: appSandbox } = app;
    // webpack运行时变量
    (window as any).__INJECTED_PUBLIC_PATH_IS_NIUER__ = entry;

    const { template, execScripts } = await ImportHTML(entry);
    const _container = document.querySelector(container);
    _container.innerHTML = '';
    const div = document.createElement('div');
    SetNodeAttribute(div, { __app_by_niuer__: '', 'data-appname': name });
    // 创建Shadow
    const shadow: ShadowRoot = div.attachShadow({ mode: 'open' });
    shadow.innerHTML = template.innerHTML;
    // 设置head标签
    // const head = document.createElement('head');
    // shadow.insertBefore(head, shadow.firstElementChild);

    _container.appendChild(div);
    app.props ? (app.props.container = shadow) : (app.props = { container: shadow });

    const { instance, sandbox } = await execScripts(name, appSandbox);
    app.sandbox = sandbox;
    // console.log('instance', instance);
    app.beforeMount = instance.beforeMount;
    app.mount = instance.mount;
    app.unmount = instance.unmount;

    await beforeMount(app);
    await mount(app);
};

export default PathnameChange;
