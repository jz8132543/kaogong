import { View, Text, Button, Image } from '@tarojs/components';
import { useCallback, useState } from 'react';
import Taro from '@tarojs/taro';
import './index.scss';

export default function Index() {
  const [loading, setLoading] = useState(false)

  const handleStartExam = useCallback(() => {
    // 模拟跳转到刷题页
    Taro.switchTab({ url: '/pages/practice/index' })
  }, [])
  
  const handleNavigate = (url: string) => {
    Taro.navigateTo({ url });
  }

  return (
    <View className='index-page'>
      {/* 头部欢迎语与冷启动摸底卡片 */}
      <View className='header-section'>
        <Text className='title'>早上好，考公人</Text>
        <View className='hero-card'>
          <View className='hero-content'>
            <Text className='hero-title'>AI 极速摸底测试</Text>
            <Text className='hero-desc'>定制 20 题，立即生成初始能力雷达图，建立专属学习路线。</Text>
            <Button className='action-btn' loading={loading} onClick={handleStartExam}>立刻测试</Button>
          </View>
          <Image className='hero-bg' src='https://dummyimage.com/150x150/1890ff/fff.png&text=AI' />
        </View>
      </View>

      {/* 金刚区 (快捷入口) */}
      <View className='grid-menu'>
        <View className='menu-item' onClick={() => handleNavigate('/pages/category/index')}>
          <View className='icon-circle c1'>📚</View>
          <Text>知识点刷题</Text>
        </View>
        <View className='menu-item' onClick={() => handleNavigate('/pages/category/index')}>
          <View className='icon-circle c2'>🔥</View>
          <Text>高频易错</Text>
        </View>
        <View className='menu-item'>
          <View className='icon-circle c3'>📝</View>
          <Text>真题模考</Text>
        </View>
        <View className='menu-item' onClick={() => Taro.switchTab({ url: '/pages/community/index' })}>
          <View className='icon-circle c4'>🎯</View>
          <Text>督学契约</Text>
        </View>
      </View>

      {/* 今日专属推荐任务 */}
      <View className='section-title'>
        <Text>今日专属推荐</Text>
      </View>
      
      <View className='task-list'>
        <View className='task-card' onClick={handleStartExam}>
          <View className='task-info'>
            <Text className='task-name'>专项突破：言语理解与表达</Text>
            <Text className='task-meta'>包含 15 道精选真题 · 预计 20 分钟</Text>
          </View>
          <Button className='start-btn'>去完成</Button>
        </View>
        
        <View className='task-card' onClick={handleStartExam}>
          <View className='task-info'>
            <Text className='task-name'>昨日错题巩固复习</Text>
            <Text className='task-meta'>包含 4 道待复习题目 · 张三老师解析</Text>
          </View>
          <Button className='start-btn'>去复习</Button>
        </View>
      </View>
    </View>
  )
}
