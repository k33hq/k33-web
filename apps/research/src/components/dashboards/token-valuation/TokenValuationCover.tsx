import * as React from 'react';
import { KVQTable, SectionDescriptionHeader } from '@/components';
import { TokenValuationIndex } from '@/types';

interface TokenValuationCoverProps
  extends React.PropsWithChildren,
    TokenValuationIndex {
  isNavigable?: boolean;
}

const TokenValuationCover: React.FC<TokenValuationCoverProps> = ({
  selectedTokensCollection,
  name,
  description,
  children,
  isNavigable = true,
  ...tableResource
}) => {
  return (
    <div id="index-cover-dashboard" className="half">
      <div id="k33-vinter-index-tables" className="stack">
        <SectionDescriptionHeader
          name={name}
          description={description}
          {...(isNavigable && {
            href: '/token-valuation/indexes',
          })}
        />
        <KVQTable tokens={selectedTokensCollection.items} {...tableResource} />
      </div>
      <div
        id="charts-and-hightlighted-articles"
        style={{
          width: '100%',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default TokenValuationCover;
