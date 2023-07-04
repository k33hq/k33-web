import { IndexArticleLinked, IndexToken } from '@/types';
import { DownloadOutlined, ReadOutlined } from '@ant-design/icons';
import { Typography, Table, Space, Button, Tag, Card, Grid, theme } from 'antd';
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
  {
    title: '#',
    key: 'name',
    dataIndex: 'name',
    render: (text, record, index) => index + 1,
  },
  {
    title: 'Name',
    key: 'token',
    dataIndex: 'token',
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
    key: 'selected',
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
    render: (text) => (
      <Tag color={text === 'Yes' ? 'green' : 'red'}>{text}</Tag>
    ),
  },
  {
    title: 'Commentary',
    key: 'commentary',
    dataIndex: 'commentary',
    responsive: ['sm'],
  },
];
const { useBreakpoint } = Grid;
const { useToken } = theme;

const KVQTable: React.FC<IndexesProps> = ({
  tokens,
  frameworkArticle,
  assessmentArticle,
}) => {
  const { md } = useBreakpoint();
  const {
    token: { fontSizeSM, fontSize },
  } = useToken();
  return (
    <Card
      style={{ margin: 0, padding: 0, width: '100%' }}
      bodyStyle={{ margin: 0, padding: 0, overflow: 'hidden' }}
    >
      <Table
        columns={columns}
        dataSource={tokens}
        expandable={{
          expandedRowRender: (record) => (
            <p style={{ margin: 0 }}>{record.commentary}</p>
          ),
        }}
        rowKey={'name'}
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
              <Button
                size={md ? 'middle' : 'small'}
                type="text"
                style={{
                  fontSize: md ? fontSize : fontSizeSM,
                }}
                icon={<ReadOutlined />}
              >
                {md ? 'Understanding KVQ Framework' : 'KVQ Framework'}
              </Button>
            </Link>
            <Link
              href={
                '/articles/' +
                assessmentArticle.linkedFrom.articleWebCollection.items[0]
                  .articleSlug
              }
            >
              <Button
                type="text"
                icon={<DownloadOutlined />}
                size={md ? 'middle' : 'small'}
                style={{
                  fontSize: md ? fontSize : fontSizeSM,
                }}
              >
                {md ? 'Download Full Assessment' : 'Download Assessment'}
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
