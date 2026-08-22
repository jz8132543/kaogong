import { View, Text } from '@tarojs/components';
import './RadarChart.scss';

// 使用纯 CSS 绘制的轻量级伪雷达图占位
export default function RadarChart() {
  return (
    <View className='radar-container'>
      <View className='radar-header'>
        <Text className='title'>能力雷达图</Text>
      </View>
      <View className='radar-visual-mock'>
        <View className='hexagon-bg'></View>
        <View className='hexagon-data'></View>
        
        {/* 标签 */}
        <Text className='label pos-1'>言语理解</Text>
        <Text className='label pos-2'>数量关系</Text>
        <Text className='label pos-3'>判断推理</Text>
        <Text className='label pos-4'>资料分析</Text>
        <Text className='label pos-5'>常识判断</Text>
        <Text className='label pos-6'>申论</Text>
      </View>
      <View className='radar-footer'>
        <Text className='analysis-text'>你的【资料分析】能力极强，但【判断推理】是薄弱项，建议进行专项练习。</Text>
      </View>
    </View>
  );
}
