import Xsync from './Xsync';
import ProxySandbox from './ProxySandbox';
import { LifeCycle } from './type';

// 获取hml
const ImportHTML = async (url: string) => {
    const htmlText = await Xsync(url);
    const template = document.createElement('div');
    template.innerHTML = htmlText;

    // 获取所有scripts
    const getExternalScripts = () => Promise.all(
        Array.from(template.querySelectorAll('script')).map((script) => {
            const src = script.getAttribute('src');
            if (src) return Xsync(src.startsWith('http') ? src : `${url}${src}`);
            return Promise.resolve(script.textContent);
        })
    );
    const execScripts = async (name: string, appSandbox: any) => {
        // 构造CommonJs模块环境
        const module = { exports: {} as LifeCycle }, exports = module.exports;
        const context = { window, document: window.document, history: window.history, location: window.location, navigator: window.navigator, top: window.top };
        const sandbox = appSandbox ?? new ProxySandbox(name, context);
        sandbox.active();
        const proxyWindow = sandbox.proxy;
        const scripts = await getExternalScripts();
        scripts.forEach(code => {
            // code && eval(code);
            // code && new Function('context', 'module', 'exports', `with(context){${code}}`)(proxyWindow, module, exports);
            // code && new Function('context', 'code', 'with(context){code}')(proxyWindow, code);
            code && new Function('context', 'module', 'exports', code)(proxyWindow, module, exports);
        });
        return {instance: module.exports, sandbox};
    };

    return { template, getExternalScripts, execScripts };
};

export default ImportHTML;
