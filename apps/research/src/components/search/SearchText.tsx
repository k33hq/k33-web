import * as React from 'react';
import {
  RefinementList,
  useSearchBox,
  useRefinementList,
} from 'react-instantsearch-hooks-web';
import { UserOutlined } from '@ant-design/icons';
import { Input, Space, Tag } from 'antd';

const { CheckableTag } = Tag;

const SearchText: React.FC = () => {
  const memoizedSearch = React.useCallback(
    (query: string, search: (value: string) => void) => {
      search(query);
    },
    []
  );

  const { refine } = useSearchBox({
    queryHook: memoizedSearch,
  });

  const { items, refine: refineSearch } = useRefinementList({
    attribute: 'tags',
    operator: 'and',
  });

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    refine(event.target.value);
  };
  return (
    <div
      id="search-section"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <Input
        size="large"
        placeholder="Search by keyword, content or author"
        prefix={<UserOutlined />}
        onChange={handleSearch}
      />
      <Space.Compact size={'small'}>
        {items.map((item) => (
          <CheckableTag
            key={item.value}
            checked={item.isRefined}
            onClick={(e) => refineSearch(item.value)}
          >
            {item.label}
          </CheckableTag>
        ))}
      </Space.Compact>
    </div>
  );
};

export default SearchText;
