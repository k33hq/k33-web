import { IndexArticleLinked, IndexToken } from '@/types';
import {
  DownloadOutlined,
  ReadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Typography,
  Table,
  Space,
  Button,
  Tag,
  Card,
  Grid,
  theme,
  Input,
  InputRef,
  Avatar,
} from 'antd';
import type { ColumnType, ColumnsType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Link from 'next/link';
import Highlighter from 'react-highlight-words';
import * as React from 'react';

const DEFAULT_PAGE_SIZE = 5;

interface IndexesProps {
  tokens: ReadonlyArray<IndexToken>;
  frameworkArticle: IndexArticleLinked;
  assessmentArticle: IndexArticleLinked;
}

const { Text } = Typography;

const { useBreakpoint } = Grid;
const { useToken } = theme;

type TokenIndex = keyof IndexToken;

const KVQTable: React.FC<IndexesProps> = ({
  tokens,
  frameworkArticle,
  assessmentArticle,
}) => {
  const { sm, md } = useBreakpoint();
  const [searchText, setSearchText] = React.useState('');
  const [searchedColumn, setSearchedColumn] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [paginationSize, setPaginationSize] = React.useState(DEFAULT_PAGE_SIZE); //your current default pagination size 25

  const {
    token: { fontSizeSM, fontSize },
  } = useToken();

  const searchInput = React.useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: TokenIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (
    dataIndex: TokenIndex
  ): ColumnType<IndexToken> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<IndexToken> = [
    {
      title: '#',
      key: 'name',
      dataIndex: 'name',
      render: (value, item, index) => (page - 1) * paginationSize + index + 1,
    },
    {
      title: 'Name',
      key: 'token',
      dataIndex: 'token',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.token.id.length - b.token.id.length,
      render: (text, record) => {
        return (
          <Space>
            <Avatar src={text.icon.url} alt={text.icon.description} />
            <Space.Compact direction="vertical">
              <Text strong>{text.id}</Text>
              <Text type="secondary" ellipsis>
                {text.name}
              </Text>
            </Space.Compact>
          </Space>
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

  return (
    <Card
      style={{ margin: 0, padding: 0, width: '100%' }}
      bodyStyle={{ margin: 0, padding: 0, overflow: 'hidden' }}
    >
      <Table
        columns={columns}
        dataSource={tokens}
        {...(!sm && {
          expandable: {
            expandedRowRender: (record) => (
              <Space.Compact direction="vertical">
                <Text strong>Commentary</Text>
                <Text>{record.commentary}</Text>
              </Space.Compact>
            ),
          },
        })}
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
        pagination={{
          position: ['bottomCenter'],
          pageSize: paginationSize,
          onChange(current) {
            setPage(current);
          },
          hideOnSinglePage: true,
          responsive: true,
        }}
      />
    </Card>
  );
};

export default KVQTable;
