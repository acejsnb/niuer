class ProxySandbox {
    private name: string;
    private sandboxRunning: boolean | unknown;
    public proxy: any;

    /**
     * 构造函数
     * @param name 沙箱名称
     * @param context 共享的上下文
     */
    constructor(name: string, context: any = {}) {
        this.name = name;
        // const fakeWindow = Object.create({});
        const fakeWindow = {...window};
        this.proxy = new Proxy(fakeWindow, {
            set: (target, name, value, receiver) => {
                if (this.sandboxRunning) {
                    if (Object.keys(context).includes(name as string)) return Reflect.set(context, name, value, receiver);
                    return Reflect.set(target, name, value, receiver);
                }
                return false;
            },
            get: (target, name, receiver) => {
                // 优先使用共享对象
                if (name === Symbol.unscopables) return undefined;
                if (Object.keys(context).includes(name as string)) return Reflect.get(context, name, receiver);
                return Reflect.get(target, name, receiver);
            }
        });
    }

    // 激活
    active() {
        this.sandboxRunning = true;
    }
    // 失活
    inactive() {
        this.sandboxRunning = false;
    }
}

export default ProxySandbox;
