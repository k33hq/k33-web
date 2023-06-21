import {
  Col,
  Divider,
  Grid,
  Image,
  List,
  Row,
  Space,
  Typography,
  theme,
} from 'antd';
import * as React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { ArticleSummaryWidget } from '@/types';
import { formatDateAndTime } from '@contentful/f36-datetime';

const { Text, Link: AntLink, Title, Paragraph } = Typography;
const { useToken } = theme;
const { useBreakpoint } = Grid;

interface QuickTakesLatestProps {
  quickTakes: ReadonlyArray<ArticleSummaryWidget>;
}

const QuickTakesLatest: React.FC<QuickTakesLatestProps> = ({ quickTakes }) => {
  const {
    token: { colorTextDescription, fontSizeSM },
  } = useToken();

  const { md, lg } = useBreakpoint();

  return (
    <div id="latest-quick-takes">
      <div id="quick-takes-header" className={styles.sectionHeader}>
        <Text strong>Quick Takes</Text>
        <Link href={'/market-insights/quick-takes'}>
          <AntLink underline>See More</AntLink>
        </Link>
      </div>
      <Divider style={{ marginTop: 16, marginBottom: 16 }} />
      <List
        size="large"
        dataSource={md ? quickTakes.slice() : quickTakes.slice(0, 2)}
        renderItem={({
          article: { thumbnail, title, subtitle },
          articleSlug,
          publishedDate,
        }) => (
          <List.Item
            style={{
              padding: '24px 0px 24px 0px',
            }}
            key={articleSlug}
            {...(lg && {
              extra: (
                <Link href={'/articles/' + articleSlug}>
                  <Image
                    preview={false}
                    width={308}
                    alt={thumbnail.title}
                    src={thumbnail.url}
                  />
                </Link>
              ),
            })}
          >
            <div
              id="quick-take-body"
              style={{ width: '100%' }}
              className={styles.quickTakeBody}
            >
              <Text
                type="secondary"
                style={{
                  fontSize: fontSizeSM,
                }}
              >
                {formatDateAndTime(publishedDate, 'day')}
              </Text>
              <List.Item.Meta
                style={{
                  width: '100%',
                }}
                title={<Link href={'/articles/' + articleSlug}>{title}</Link>}
                {...(lg && {
                  description: (
                    <Paragraph
                      type="secondary"
                      style={{
                        color: colorTextDescription,
                      }}
                      ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}
                    >
                      {subtitle}
                    </Paragraph>
                  ),
                })}
              />
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default QuickTakesLatest;
