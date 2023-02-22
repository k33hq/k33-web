import * as React from 'react';

interface ArticleSubtitleProps {
  children: string | null;
}

const ArticleSubtitle: React.FC<ArticleSubtitleProps> = ({ children }) => {
  if (!children) return <></>;
  return (
    <p className="text-body4 text-label-light-secondary line-clamp-2 text-ellipsis">
      {children}
    </p>
  );
};

export default ArticleSubtitle;
