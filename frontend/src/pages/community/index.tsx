import { View, Text, ScrollView } from '@tarojs/components';
import PledgeCard from './components/PledgeCard';
import './index.scss';

export default function CommunityIndex() {
  return (
    <View className='community-page'>
      <View className='tabs-header'>
        <Text className='tab active'>契约大厅</Text>
        <Text className='tab'>我的契约</Text>
        <Text className='tab'>上岸树洞</Text>
      </View>
      
      <ScrollView scrollY className='community-content'>
        <PledgeCard 
          title="省考行测冲刺群" 
          days={21} 
          poolAmount={14500} 
          participants={290} 
          deposit={50} 
        />
        <PledgeCard 
          title="每日申论大作文" 
          days={14} 
          poolAmount={8400} 
          participants={120} 
          deposit={70} 
        />
        <PledgeCard 
          title="早起刷题打卡营" 
          days={30} 
          poolAmount={22000} 
          participants={440} 
          deposit={50} 
        />
        
        <View className='bottom-hint'>
          <Text>没有更多契约群啦</Text>
        </View>
      </ScrollView>
    </View>
  );
}
