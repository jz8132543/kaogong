import { View, Text, Image } from '@tarojs/components';
import AssetPanel from './components/AssetPanel';
import './index.scss';

export default function ProfileIndex() {
  return (
    <View className='profile-page'>
      <View className='header-bg'></View>
      
      <View className='content-wrapper'>
        <View className='user-card'>
          <Image 
            className='avatar' 
            src='https://dummyimage.com/100x100/1890ff/fff.png&text=User' 
          />
          <View className='user-info'>
            <Text className='nickname'>考公上岸人</Text>
            <Text className='desc'>学号: 839201</Text>
          </View>
        </View>

        <AssetPanel />

        <View className='menu-list'>
          <View className='menu-item'>
            <Text className='icon'>📝</Text>
            <Text className='text'>我的错题本</Text>
            <Text className='arrow'>></Text>
          </View>
          <View className='menu-item'>
            <Text className='icon'>🌟</Text>
            <Text className='text'>收藏的名师解析</Text>
            <Text className='arrow'>></Text>
          </View>
          <View className='menu-item'>
            <Text className='icon'>📜</Text>
            <Text className='text'>契约记录</Text>
            <Text className='arrow'>></Text>
          </View>
          <View className='menu-item'>
            <Text className='icon'>⚙️</Text>
            <Text className='text'>设置</Text>
            <Text className='arrow'>></Text>
          </View>
        </View>
      </View>
    </View>
  );
}
