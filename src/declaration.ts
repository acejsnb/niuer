export interface Props {
    basename?: string
    container?: string | HTMLElement | ShadowRoot
    [key: string]: any
}
type Fn = (props?: Props) => void;
export interface LifeCycle {
    bootstrap?: Fn
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

// @ts-ignore
declare module 'niuer' {
    export function registerMicroApps(app: App[]): void
    export function getApps(): App[]
}
