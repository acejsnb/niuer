// 设置节点的自定义属性
interface Options {
    [key: string]: string
}
type TSA = (node: HTMLElement, options: Options) => void;
const SetNodeAttribute: TSA = (node, options) => {
    Object.keys(options).forEach(key => {
        node.setAttribute(key, options[key]);
    });
};

export default SetNodeAttribute;
