import { View, Text } from '@tarojs/components';
import Heatmap from './components/Heatmap';
import RadarChart from './components/RadarChart';
import './index.scss';

export default function DashboardIndex() {
  return (
    <View className='dashboard-page'>
      <View className='user-greeting'>
        <Text className='greeting-text'>晚上好，考公人</Text>
        <Text className='greeting-sub'>距离省考还有 142 天</Text>
      </View>
      
      <Heatmap />
      <RadarChart />
    </View>
  );
}
