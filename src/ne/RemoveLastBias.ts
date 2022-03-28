// 移除字符串最后一位
const RemoveLastBias = (str: string): string => '/' + str.split('/').filter(Boolean).join('/');

export default RemoveLastBias;

