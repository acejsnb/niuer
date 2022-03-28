class ProxySandbox {
    private name: string;
    private sandboxRunning: boolean | unknown;
    public proxy: any;

    /**
     * 代理沙箱
     * @param name 沙箱名称
     * @param context 共享的上下文
     */
    constructor(name: string, context: any = {}) {
        this.name = name;
        const fakeWindow = {...window};
        // @ts-ignore
        this.proxy = new Proxy(fakeWindow, {
            set: (target: object, name: PropertyKey, value: any) =>
                (this.sandboxRunning ? Reflect.set((name in context ? context : target), name, value) : false),
            get: (target: object, name: PropertyKey) =>
                Reflect.get((name in context ? context : target), name)
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
