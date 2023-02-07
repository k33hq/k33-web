import * as React from 'react';

interface ArticleSubtitleProps {
  children: string | null;
}

const ArticleSubtitle: React.FC<ArticleSubtitleProps> = ({ children }) => {
  if (!children) return <></>;
  return (
    <p className="text-body4 text-label-light-secondary truncate">{children}</p>
  );
};

export default ArticleSubtitle;
