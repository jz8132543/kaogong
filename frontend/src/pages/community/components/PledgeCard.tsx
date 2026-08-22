import { View, Text, Button } from '@tarojs/components';
import './PledgeCard.scss';

interface PledgeCardProps {
  title: string;
  days: number;
  poolAmount: number;
  participants: number;
  deposit: number;
}

export default function PledgeCard({ title, days, poolAmount, participants, deposit }: PledgeCardProps) {
  return (
    <View className='pledge-card'>
      <View className='card-top'>
        <View className='title-area'>
          <Text className='title'>{title}</Text>
          <Text className='tag'>{days}天魔鬼营</Text>
        </View>
        <View className='pool-area'>
          <Text className='pool-label'>总奖金池(元)</Text>
          <Text className='pool-amount'>{poolAmount.toLocaleString()}</Text>
        </View>
      </View>
      
      <View className='card-bottom'>
        <View className='info'>
          <Text className='participants'>👥 {participants} 人已加入</Text>
          <Text className='risk-warning'>失败将扣除 {deposit} 元押金</Text>
        </View>
        <Button className='join-btn'>支付 ¥{deposit} 挑战</Button>
      </View>
    </View>
  );
}
