// 通信事件注册
interface State {
    [key: PropertyKey | string]: any
}
type OptionChange = (curState: State, preState: State) => void

export default class GlobalAction {
    private _state: State
    private _proxy: any;
    private _optionEvents: OptionChange[] // 事件列表

    constructor(state: State) {
        this._state = {};
        this._optionEvents = [];
        this._init(state);
    }
    private _init(state: State) {
        this._state = JSON.parse(JSON.stringify(state));
        // @ts-ignore
        this._proxy = new Proxy(this._state, {
            set: (target: object, key: PropertyKey, value: any) => {
                const preState = JSON.parse(JSON.stringify(this._state));
                this._state[key] = value;
                this._optionEvents.forEach(event => event(this._state, preState));
                return Reflect.set(target, key, value);
            },
            get: (target: object, key: PropertyKey) => Reflect.get(target, key)
        });
    }
    // 重新设置数据
    setState(state: State) {
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
    onStateChange(func: OptionChange) {
        this._optionEvents.push(func);
    }
}
