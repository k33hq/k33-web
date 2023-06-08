import { Article } from '@/types';
import * as React from 'react';
import styles from './styles.module.css';
import { DefaultRichTextRenderer } from '@/components';
import { Skeleton, Space } from 'antd';

interface PrivateArticleProps
  extends React.PropsWithChildren,
    Pick<Article, 'publicSnippet'> {}

const PrivateArticle: React.FC<PrivateArticleProps> = ({
  publicSnippet,
  children,
}) => {
  return (
    <>
      <div id="private-article" className={styles.privateArticle}>
        <DefaultRichTextRenderer document={publicSnippet} />
        <div className={styles.fadeOut}></div>
      </div>
      <Skeleton.Input active size="default" block />
      <Skeleton.Input active size="default" block />
      <Skeleton.Input active size="default" block />
      <Skeleton.Image active />
      <Skeleton.Input active size="default" block />
    </>
  );
};

export default PrivateArticle;
