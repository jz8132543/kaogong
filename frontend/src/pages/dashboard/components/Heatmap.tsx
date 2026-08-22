import { View, Text } from '@tarojs/components';
import './Heatmap.scss';

// 模拟近 12 周，每周 7 天的打卡记录
// 0: 未打卡, 1: 轻度学习, 2: 深度学习
const generateMockData = () => {
  const weeks = 12;
  const daysPerWeek = 7;
  const grid = [];
  for (let i = 0; i < weeks; i++) {
    const week = [];
    for (let j = 0; j < daysPerWeek; j++) {
      // 随机生成打卡状态，假装用户学习很刻苦
      week.push(Math.random() > 0.4 ? Math.floor(Math.random() * 2) + 1 : 0);
    }
    grid.push(week);
  }
  return grid;
};

export default function Heatmap() {
  const gridData = generateMockData();

  const getColor = (level: number) => {
    if (level === 1) return 'level-1';
    if (level === 2) return 'level-2';
    return 'level-0';
  };

  return (
    <View className='heatmap-container'>
      <View className='heatmap-header'>
        <Text className='title'>年度学习热力图</Text>
        <Text className='subtitle'>连续打卡 24 天</Text>
      </View>
      <View className='heatmap-grid'>
        {gridData.map((week, wIndex) => (
          <View key={`w-${wIndex}`} className='heatmap-col'>
            {week.map((level, dIndex) => (
              <View 
                key={`d-${wIndex}-${dIndex}`} 
                className={`heatmap-cell ${getColor(level)}`}
              />
            ))}
          </View>
        ))}
      </View>
      <View className='heatmap-legend'>
        <Text className='legend-text'>少</Text>
        <View className='heatmap-cell level-0'></View>
        <View className='heatmap-cell level-1'></View>
        <View className='heatmap-cell level-2'></View>
        <Text className='legend-text'>多</Text>
      </View>
    </View>
  );
}
