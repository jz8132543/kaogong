import { View, Text, Image, Input, ScrollView } from '@tarojs/components';
import './index.scss';

export default function PostDetail() {
  return (
    <View className='post-page'>
      <ScrollView className='main-scroll' scrollY>
        <View className='post-header'>
          <Image className='avatar' src='https://dummyimage.com/100x100/f5222d/fff.png&text=A' />
          <View className='author-info'>
            <Text className='name'>行测必上岸</Text>
            <Text className='time'>2小时前发布</Text>
          </View>
        </View>
        
        <View className='post-content'>
          <Text className='title'>如何在一个月内将行测提高15分？</Text>
          <Text className='text-body'>
            这是我的真实经历。很多同学做行测总是做不完，其实核心在于时间的分配。
            言语理解必须控制在30分钟内，判断推理控制在35分钟。遇到不会的数量关系直接跳过，千万不要死磕！
          </Text>
          <Image className='post-img' src='https://dummyimage.com/600x400/ccc/fff.png&text=Schedule' mode='widthFix' />
        </View>

        <View className='comments-section'>
          <Text className='section-title'>全部评论 (2)</Text>
          <View className='comment-item'>
            <Image className='c-avatar' src='https://dummyimage.com/50x50/1890ff/fff.png&text=B' />
            <View className='c-content'>
              <Text className='c-name'>迷茫的考公小白</Text>
              <Text className='c-text'>感谢分享，资料分析有什么速算技巧推荐吗？</Text>
              <Text className='c-time'>1小时前</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 底部悬浮评论框 */}
      <View className='bottom-comment-bar'>
        <Input className='comment-input' placeholder='说点什么...' />
        <View className='actions'>
          <Text className='icon'>❤️ 12</Text>
          <Text className='icon'>⭐ 5</Text>
        </View>
      </View>
    </View>
  );
}
