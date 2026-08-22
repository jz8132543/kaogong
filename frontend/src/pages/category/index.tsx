import { View, Text, ScrollView } from '@tarojs/components';
import { useState } from 'react';
import Taro from '@tarojs/taro';
import './index.scss';

export default function CategoryIndex() {
  const [activeCategory, setActiveCategory] = useState(0);
  
  // 模拟数据
  const categories = ['行测', '申论', '面试'];
  const subCategories = [
    { name: '常识判断', count: 1240 },
    { name: '言语理解与表达', count: 856 },
    { name: '数量关系', count: 420 },
    { name: '判断推理', count: 960 },
    { name: '资料分析', count: 680 },
  ];

  const handleFilter = () => {
    Taro.showActionSheet({
      itemList: ['不限流派', '老王 (代入法)', '张三 (画图法)', '李四 (公式流)'],
      success: function (res) {
        console.log('选择了流派', res.tapIndex);
      }
    });
  };

  const handleGoPractice = () => {
    Taro.navigateTo({ url: '/pages/practice/index' });
  };

  return (
    <View className='category-page'>
      {/* 顶部搜索与筛选区 */}
      <View className='header'>
        <View className='search-bar'>
          <Text className='icon'>🔍</Text>
          <Text className='placeholder'>搜索知识点或题目...</Text>
        </View>
        <View className='filter-btn' onClick={handleFilter}>
          <Text className='icon'>⚗️</Text>
          <Text>名师筛选</Text>
        </View>
      </View>

      {/* 左右分栏区 */}
      <View className='main-content'>
        <ScrollView className='left-menu' scrollY>
          {categories.map((cat, index) => (
            <View 
              key={cat} 
              className={`menu-item ${activeCategory === index ? 'active' : ''}`}
              onClick={() => setActiveCategory(index)}
            >
              <Text>{cat}</Text>
            </View>
          ))}
        </ScrollView>

        <ScrollView className='right-content' scrollY>
          <View className='category-title'>
            <Text>{categories[activeCategory]} 知识点树</Text>
          </View>
          
          <View className='node-list'>
            {subCategories.map(sub => (
              <View key={sub.name} className='node-item' onClick={handleGoPractice}>
                <View className='info'>
                  <Text className='name'>{sub.name}</Text>
                  <Text className='count'>{sub.count} 题</Text>
                </View>
                <View className='action'>
                  <Text>去刷题 ></Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
