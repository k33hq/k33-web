import * as React from 'react';
import { useSearchBox, useRefinementList } from 'react-instantsearch-hooks-web';
import { UserOutlined } from '@ant-design/icons';
import { Input, Space, Tag } from 'antd';
import styles from './styles.module.scss';

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

  useRefinementList({
    attribute: 'authors',
    operator: 'and',
  });

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    refine(event.target.value);
  };
  return (
    <div id="search-section" className={styles.searchBox}>
      <Input
        size="large"
        placeholder="Search by keyword, content or author"
        prefix={<UserOutlined />}
        onChange={handleSearch}
      />
      <div id="refinement-list" className={styles.refinementList}>
        {items.map((item) => (
          <CheckableTag
            style={{
              borderRadius: 4,
              border: !item.isRefined
                ? '1px solid var(--color-text, rgba(0, 0, 0, 0.88))'
                : '',
            }}
            key={item.value}
            checked={item.isRefined}
            onClick={(e) => refineSearch(item.value)}
          >
            {item.label}
          </CheckableTag>
        ))}
      </div>
    </div>
  );
};

export default SearchText;
