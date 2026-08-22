import { View, Text, Button } from '@tarojs/components';
import './AssetPanel.scss';

export default function AssetPanel() {
  return (
    <View className='asset-panel'>
      <View className='asset-half left'>
        <View className='asset-info'>
          <Text className='asset-label'>零钱余额(可提现)</Text>
          <View className='amount-line'>
            <Text className='symbol'>¥</Text>
            <Text className='amount'>125.00</Text>
          </View>
        </View>
        <Button className='action-btn outline'>去提现</Button>
      </View>
      
      <View className='divider'></View>
      
      <View className='asset-half right'>
        <View className='asset-info'>
          <Text className='asset-label'>AI 算力点数</Text>
          <View className='amount-line'>
            <Text className='icon'>⚡</Text>
            <Text className='amount'>850</Text>
          </View>
        </View>
        <Button className='action-btn fill'>充点数</Button>
      </View>
    </View>
  );
}
