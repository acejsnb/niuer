// 通信事件注册
export type OptionChange<T> = (cur: T, pre: T) => void

export default class GlobalAction<T> {
    private _state: T
    private _proxy: any;
    private _optionEvents: Array<OptionChange<T>> // 事件列表

    constructor(state: T) {
        this._state = {} as T;
        this._optionEvents = [] as Array<OptionChange<T>>;
        this._init(state);
    }
    private _init(state: T) {
        this._state = JSON.parse(JSON.stringify(state));
        this._proxy = new (window as any).Proxy(this._state, {
            set: (target: object, key: string, value: any) => {
                const preState = JSON.parse(JSON.stringify(this._state));
                // @ts-ignore
                this._state[key] = value;
                this._optionEvents.forEach(event => event(this._state, preState));
                return Reflect.set(target, key, value);
            },
            get: (target: object, key: string) => Reflect.get(target, key)
        });
    }
    // 重新设置数据
    setState(state: T) {
        this._init(state);
    }
    getState() {
        return this._state;
    }

    setItem(key: string, val: any) {
        this._proxy[key] = val;
        return true;
    }
    getItem(key: string) {
        return this._proxy[key];
    }
    // 添加监听
    onStateChange(func: OptionChange<T>) {
        this._optionEvents.push(func);
    }
}
