// 请求数据
type TXsync = (url: string) => Promise<string>
const Xsync: TXsync = url => fetch(url).then(res => res.text());

export default Xsync;
