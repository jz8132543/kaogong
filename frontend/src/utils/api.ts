import Taro from '@tarojs/taro';

// TODO: 生产环境可以替换为真实的域名
const BASE_URL = 'http://localhost:3000';

export class API {
  static async request(url: string, options: Taro.request.Option = { url: '', method: 'GET' }) {
    try {
      const token = Taro.getStorageSync('token');
      const res = await Taro.request({
        ...options,
        url: `${BASE_URL}${url}`,
        header: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
          ...options.header,
        }
      });
      if (res.statusCode >= 200 && res.statusCode < 300) {
        return res.data;
      }
      throw new Error(`请求失败: ${res.statusCode}`);
    } catch (err) {
      Taro.showToast({ title: '网络开小差了', icon: 'error' });
      throw err;
    }
  }

  static async get(url: string, data?: any) {
    return this.request(url, { url: '', method: 'GET', data });
  }

  static async post(url: string, data?: any) {
    return this.request(url, { url: '', method: 'POST', data });
  }
}
