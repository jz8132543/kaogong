import { useState } from 'react';
import { Form, Input, Button, Card, Select, Space, message, Upload } from 'antd';
import { InboxOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const { TextArea } = Input;
const { Dragger } = Upload;

export default function QuestionCreate() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      // 这里的选项结构转换以兼容后端期望的数组格式
      const formattedOptions = values.options.map((opt: any, idx: number) => ({
        id: String.fromCharCode(65 + idx), // A, B, C, D...
        text: opt.text
      }));

      // 提取文件列表（这里做简单 Mock，实际应上传到云存储然后获取 URL）
      const media_assets = values.dragger?.map((f: any) => ({
        url: f.response?.url || 'https://dummyimage.com/600x400/ccc/000.png&text=Uploaded+Image',
        type: 'image'
      })) || [];

      const payload = {
        content: values.content,
        tags: values.tags || [],
        correct_answer: values.correct_answer,
        options: formattedOptions,
        media_assets
      };

      await api.post('/questions', payload);
      message.success('题目创建成功！');
      navigate('/questions');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <h2>新建试题 (支持拖拽录入)</h2>
      <Card>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            options: [{ text: '' }, { text: '' }, { text: '' }, { text: '' }],
          }}
        >
          <Form.Item
            name="content"
            label="题干内容 (支持换行和 [IMAGE:0] 等多模态占位符)"
            rules={[{ required: true, message: '请输入题干' }]}
          >
            <TextArea rows={5} placeholder="例如：下列图形中，主视图为... [IMAGE:0]" />
          </Form.Item>

          <Form.Item label="试题图片附件 (拖拽上传)">
            <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList} noStyle>
              <Dragger name="files" action="/api/upload/mock" multiple={true} customRequest={({ onSuccess }) => setTimeout(() => onSuccess?.("ok", {} as any), 1000)}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">点击或将图片/PDF拖拽到此区域上传</p>
                <p className="ant-upload-hint">支持单次或批量上传，上传后可使用 [IMAGE:X] 插入题干</p>
              </Dragger>
            </Form.Item>
          </Form.Item>

          <div style={{ marginBottom: 16 }}>
            <label>选项配置</label>
          </div>
          <Form.List name="options">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, idx) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <span style={{ fontWeight: 'bold' }}>{String.fromCharCode(65 + idx)}</span>
                    <Form.Item
                      {...restField}
                      name={[name, 'text']}
                      rules={[{ required: true, message: '选项内容不能为空' }]}
                      style={{ width: 600 }}
                    >
                      <Input placeholder="选项内容" />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    添加选项
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item
            name="correct_answer"
            label="正确答案"
            rules={[{ required: true, message: '请选择正确答案' }]}
          >
            <Select placeholder="请选择正确答案 (例如: A)">
              <Select.Option value="A">A</Select.Option>
              <Select.Option value="B">B</Select.Option>
              <Select.Option value="C">C</Select.Option>
              <Select.Option value="D">D</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="tags" label="题目标签">
            <Select mode="tags" placeholder="输入标签按回车保存 (如: 行测, 数量关系)" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block size="large">
              极速录入入库
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
