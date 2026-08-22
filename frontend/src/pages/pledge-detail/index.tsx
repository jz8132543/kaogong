import { View, Text, Button, ScrollView } from '@tarojs/components';
import { useState } from 'react';
import Taro from '@tarojs/taro';
import './index.scss';

export default function PledgeDetail() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handlePay = () => {
    // 模拟拉起微信支付
    Taro.showLoading({ title: '拉起收银台...' });
    setTimeout(() => {
      Taro.hideLoading();
      setDrawerVisible(false);
      Taro.showToast({ title: '加入契约成功', icon: 'success' });
    }, 1000);
  };

  return (
    <View className='pledge-detail-page'>
      <ScrollView scrollY className='main-scroll'>
        {/* 顶部海报区 */}
        <View className='hero-section'>
          <Text className='title'>省考行测冲刺群</Text>
          <Text className='subtitle'>连续 21 天魔鬼训练，中途退出扣除押金</Text>
          <View className='pool-box'>
            <Text className='pool-label'>当前总奖金池 (元)</Text>
            <Text className='pool-amount'>14,500.00</Text>
          </View>
        </View>

        {/* 规则与日历占位 */}
        <View className='content-section'>
          <View className='section-title'>契约规则</View>
          <View className='rule-card'>
            <Text className='rule-text'>1. 每日 23:59 前需完成指定行测套卷。</Text>
            <Text className='rule-text'>2. 漏打卡或不及格将判定为失败，扣除全部押金。</Text>
            <Text className='rule-text'>3. 坚持到最后的人将平分奖金池（含失败者押金）。</Text>
          </View>
          
          <View className='section-title mt-20'>打卡日历</View>
          <View className='calendar-mock'>
            <Text className='mock-text'>[ 🗓️ 日历组件加载区 ]</Text>
          </View>
        </View>
      </ScrollView>

      {/* 底部吸底操作栏 */}
      <View className='bottom-bar'>
        <View className='price-info'>
          <Text className='label'>需缴纳押金</Text>
          <Text className='price'>¥50.00</Text>
        </View>
        <Button className='join-btn' onClick={() => setDrawerVisible(true)}>
          立即签署契约
        </Button>
      </View>

      {/* 仿真收银台抽屉 (Drawer) */}
      {drawerVisible && (
        <View className='drawer-overlay' onClick={() => setDrawerVisible(false)}>
          <View className='drawer-content' onClick={e => e.stopPropagation()}>
            <View className='drawer-header'>
              <Text className='title'>确认付款</Text>
              <Text className='close' onClick={() => setDrawerVisible(false)}>✕</Text>
            </View>
            <View className='pay-amount'>
              <Text className='symbol'>¥</Text>
              <Text className='num'>50.00</Text>
            </View>
            <View className='pay-info'>
              <View className='info-row'>
                <Text className='label'>订单信息</Text>
                <Text className='value'>省考行测冲刺群-契约押金</Text>
              </View>
              <View className='info-row'>
                <Text className='label'>支付方式</Text>
                <Text className='value wechat'>微信支付</Text>
              </View>
            </View>
            <Button className='pay-btn' onClick={handlePay}>确认支付</Button>
          </View>
        </View>
      )}
    </View>
  );
}
