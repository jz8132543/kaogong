import { View, Text, Button } from '@tarojs/components';
import { useState } from 'react';
import Taro from '@tarojs/taro';
import './index.scss';

export default function WalletIndex() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  
  const handleWithdraw = () => {
    Taro.showToast({ title: '提现申请已提交', icon: 'success' });
  };

  const handleRecharge = (amount: number) => {
    Taro.showLoading({ title: '拉起微信收银台' });
    setTimeout(() => {
      Taro.hideLoading();
      setDrawerVisible(false);
      Taro.showToast({ title: `成功充值 ¥${amount}`, icon: 'success' });
    }, 1000);
  };

  return (
    <View className='wallet-page'>
      {/* 提现流转模块 */}
      <View className='card cash-card'>
        <View className='header'>
          <Text className='title'>可提现余额</Text>
          <Text className='history'>账单明细 ></Text>
        </View>
        <View className='amount-area'>
          <Text className='symbol'>¥</Text>
          <Text className='amount'>125.00</Text>
        </View>
        <Button className='withdraw-btn' onClick={handleWithdraw}>提现至微信零钱</Button>
      </View>

      {/* AI 点数模块 */}
      <View className='card point-card'>
        <View className='header'>
          <Text className='title'>AI 算力点数</Text>
        </View>
        <View className='amount-area'>
          <Text className='icon'>⚡</Text>
          <Text className='amount'>850</Text>
        </View>
        
        <View className='recharge-section'>
          <Text className='section-title'>充值套餐</Text>
          <View className='package-list'>
            <View className='package-item' onClick={() => setDrawerVisible(true)}>
              <Text className='point-count'>500 点</Text>
              <Text className='price'>¥ 9.9</Text>
            </View>
            <View className='package-item hot' onClick={() => setDrawerVisible(true)}>
              <View className='tag'>最划算</View>
              <Text className='point-count'>2000 点</Text>
              <Text className='price'>¥ 29.9</Text>
            </View>
            <View className='package-item' onClick={() => setDrawerVisible(true)}>
              <Text className='point-count'>5000 点</Text>
              <Text className='price'>¥ 59.9</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 仿真收银台抽屉 */}
      {drawerVisible && (
        <View className='drawer-overlay' onClick={() => setDrawerVisible(false)}>
          <View className='drawer-content' onClick={e => e.stopPropagation()}>
            <View className='drawer-header'>
              <Text className='title'>确认付款</Text>
              <Text className='close' onClick={() => setDrawerVisible(false)}>✕</Text>
            </View>
            <View className='pay-amount'>
              <Text className='symbol'>¥</Text>
              <Text className='num'>29.90</Text>
            </View>
            <Button className='pay-btn' onClick={() => handleRecharge(29.9)}>确认支付</Button>
          </View>
        </View>
      )}
    </View>
  );
}
