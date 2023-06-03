'use client';
import * as React from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';

interface RootStyleRegistryProps extends React.PropsWithChildren {}

export const RootStyleRegistry: React.FC<RootStyleRegistryProps> = ({
  children,
}) => {
  const [cache] = React.useState(() => createCache());

  useServerInsertedHTML(() => {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `</script>${extractStyle(cache)}<script>`,
        }}
      />
    );
  });

  return <StyleProvider cache={cache}>{children}</StyleProvider>;
};
