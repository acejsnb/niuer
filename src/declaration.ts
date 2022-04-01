export interface Props {
    basename?: string
    container?: string | HTMLElement | ShadowRoot
    [key: string]: any
}
type Fn = (props?: Props) => void;
export interface LifeCycle {
    beforeMount?: Fn
    mount?: Fn
    unmount?: Fn
    props?: Props
    [key: string]: any
}
export interface App extends LifeCycle {
    name: string
    entry: string
    activeRule: string
}

export type OptionChange<T> = (cur: T, pre: T) => void

export interface RGlobalAction<T> {
    setState(state: T): void
    getState(): T
    setItem(key: string, val: any): boolean
    getItem(key: string): any
    onStateChange(func: OptionChange<T>): void
}

// @ts-ignore
declare module 'niuer' {
    export function registerMicroApps(app: App[]): void
    export function start(): void
    export class GlobalAction<T> {
        constructor(state: T);
        public setState(state: T): void
        public getState(): T
        public setItem(key: string, val: any): boolean
        public getItem(key: string): any
        public onStateChange(func: OptionChange<T>): void
    }
}
