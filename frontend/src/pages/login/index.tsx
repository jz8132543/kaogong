import React, { useState } from 'react';
import { View, Text, Input, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { API } from '../../utils/api';
import './index.css';

export default function Login() {
  const [phone, setPhone] = useState('');

  const handleLogin = async () => {
    if (!phone) {
      Taro.showToast({ title: '请输入手机号', icon: 'none' });
      return;
    }
    
    try {
      const res = await API.post('/api/auth/login/phone', { phone, code: '1234' });
      Taro.setStorageSync('token', res.access_token);
      Taro.setStorageSync('user', res.user);
      Taro.showToast({ title: '登录成功' });
      Taro.switchTab({ url: '/pages/index/index' });
    } catch (e) {
      Taro.showToast({ title: '登录失败', icon: 'none' });
    }
  };

  return (
    <View className="login-container">
      <Text className="title">考公平台</Text>
      <View className="form-group">
        <Input 
          className="input" 
          type="number" 
          placeholder="请输入手机号" 
          value={phone}
          onInput={(e) => setPhone(e.detail.value)}
        />
      </View>
      <Button className="btn-login" onClick={handleLogin}>验证码快捷登录</Button>
    </View>
  );
}
