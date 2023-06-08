import * as React from 'react';
import styles from './styles.module.scss';
import { DefaultRichTextRenderer } from '@/components';
import { Article } from '@/types';

interface ActionLayoutProps
  extends Pick<Article, 'publicSnippet'>,
    React.PropsWithChildren {}

const ActionLayout: React.FC<ActionLayoutProps> = ({
  publicSnippet,
  children,
}) => {
  return (
    <div id="private-article" className={styles.actionLayout}>
      <div id="public-snippet" className={styles.publicSnippet}>
        <DefaultRichTextRenderer document={publicSnippet} />
        <div className={styles.fadeOut}></div>
      </div>
      {children}
    </div>
  );
};

export default ActionLayout;
