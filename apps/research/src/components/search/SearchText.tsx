import * as React from 'react';
import { SearchBox, RefinementList } from 'react-instantsearch-hooks-web';

const SearchText: React.FC = () => {
  return (
    <div id="search-section">
      <SearchBox placeholder="Search" autoFocus />
      <RefinementList attribute="tags" />
    </div>
  );
};

export default SearchText;
