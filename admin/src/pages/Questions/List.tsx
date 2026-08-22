import { useState, useEffect } from 'react';
import { Table, Tag, Button, Space, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

export default function QuestionList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const res = await api.get('/questions');
      setData(res as any);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const columns = [
    {
      title: '题目ID',
      dataIndex: 'id',
      key: 'id',
      width: 150,
      ellipsis: true,
    },
    {
      title: '题干内容',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
    },
    {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: string[]) => (
        <>
          {tags?.map(tag => (
            <Tag color="blue" key={tag}>{tag}</Tag>
          ))}
        </>
      ),
    },
    {
      title: '正确答案',
      dataIndex: 'correct_answer',
      key: 'correct_answer',
      width: 100,
    },
    {
      title: '操作',
      key: 'action',
      width: 250,
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button size="small" type="dashed" onClick={() => triggerAnalysis(record.id)}>
            一键生成解析
          </Button>
          <a>编辑</a>
          <a style={{ color: 'red' }}>删除</a>
        </Space>
      ),
    },
  ];

  const triggerAnalysis = async (id: string) => {
    try {
      message.loading({ content: 'AI 正在极速生成多流派解析...', key: 'ai' });
      await api.post(`/questions/${id}/trigger-analysis`);
      message.success({ content: '解析生成成功！', key: 'ai' });
    } catch (e) {
      message.error({ content: '解析生成失败', key: 'ai' });
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between' }}>
        <h2>题库列表</h2>
        <Button type="primary" onClick={() => navigate('/questions/create')}>
          新建试题
        </Button>
      </div>
      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey="id" 
        loading={loading}
      />
    </div>
  );
}
