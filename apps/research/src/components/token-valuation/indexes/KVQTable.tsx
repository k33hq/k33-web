import { IndexArticleLinked, IndexToken } from '@/types';
import { DownloadOutlined, ReadOutlined } from '@ant-design/icons';
import { Typography, Table, Space, Button, Tag, Card } from 'antd';
import { ColumnsType } from 'antd/es/table';
import Link from 'next/link';

import * as React from 'react';

interface IndexesProps {
  tokens: ReadonlyArray<IndexToken>;
  frameworkArticle: IndexArticleLinked;
  assessmentArticle: IndexArticleLinked;
}

const { Text } = Typography;

const columns: ColumnsType<IndexToken> = [
  { title: '#', render: (text, record, index) => index + 1 },
  {
    title: 'Name',
    dataIndex: 'token',
    width: 200,
    sorter: (a, b) => a.token.id.length - b.token.id.length,
    render: (text, record) => {
      return (
        <Space.Compact direction="vertical">
          <Text strong>{text.id}</Text>
          <Text type="secondary">{text.name}</Text>
        </Space.Compact>
      );
    },
  },
  {
    title: 'Selected',
    dataIndex: 'selected',
    filters: [
      {
        text: 'Yes',
        value: 'Yes',
      },
      {
        text: 'No',
        value: 'No',
      },
    ],
    align: 'center',
    onFilter: (value, record) => record.selected.includes(value as string),
    width: 100,
    render: (text) => (
      <Tag color={text === 'Yes' ? 'green' : 'red'}>{text}</Tag>
    ),
  },
  { title: 'Commentary', dataIndex: 'commentary', responsive: ['sm'] },
];

const KVQTable: React.FC<IndexesProps> = ({
  tokens,
  frameworkArticle,
  assessmentArticle,
}) => {
  return (
    <Card
      style={{ margin: 0, padding: 0 }}
      bodyStyle={{ margin: 0, padding: 0, overflow: 'hidden' }}
    >
      <Table
        columns={columns}
        dataSource={tokens}
        footer={() => (
          <div
            id="index-actions"
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Link
              href={
                '/articles/' +
                frameworkArticle.linkedFrom.articleWebCollection.items[0]
                  .articleSlug
              }
            >
              <Button type="text" icon={<ReadOutlined />}>
                Understanding KVQ Framework
              </Button>
            </Link>
            <Link
              href={
                '/articles/' +
                assessmentArticle.linkedFrom.articleWebCollection.items[0]
                  .articleSlug
              }
            >
              <Button type="text" icon={<DownloadOutlined />}>
                Download Full Assessment
              </Button>
            </Link>
          </div>
        )}
        pagination={false}
      />
    </Card>
  );
};

export default KVQTable;
