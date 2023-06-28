import { ArticleWebWidget } from '@/types';
import {
  Card,
  Carousel,
  Col,
  Image,
  Space,
  theme,
  Typography,
  Grid,
  Row,
  Button,
} from 'antd';
import * as React from 'react';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import styles from './styles.module.scss';
import Link from 'next/link';
import { formatDateAndTime } from '@contentful/f36-datetime';
import { EllipsisConfig } from 'antd/es/typography/Base';
import { useBrowser } from '@/hooks';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, EffectFade } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const { useToken } = theme;
const { Text, Paragraph } = Typography;
const { useBreakpoint } = Grid;

interface ReportCarouselProps {
  reports: ReadonlyArray<ArticleWebWidget>;
}

const ReportCarousel: React.FC<ReportCarouselProps> = ({ reports }) => {
  const {
    token: { screenLG, screenSM, fontSizeHeading5, screenMDMin },
  } = useToken();

  const isBrowser = useBrowser();

  console.log(isBrowser);

  const { md, sm } = useBreakpoint();

  return (
    <div
      style={{
        width: 1000,
      }}
    >
      <Swiper
        modules={[Navigation, Pagination, A11y, EffectFade]}
        spaceBetween={16}
        slidesPerView={4.2}
        navigation
        pagination={{ clickable: true }}
      >
        {reports.map(
          ({ article: { thumbnail, title }, publishedDate, articleSlug }) => (
            <SwiperSlide>
              <Link
                key={articleSlug}
                href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/articles/${articleSlug}`}
              >
                <Card
                  style={{
                    width: 224,
                    height: 420,
                    overflow: 'hidden',
                  }}
                  size="small"
                  hoverable
                  cover={
                    <Image
                      style={{
                        width: 224,
                        height: 298,
                        objectFit: 'cover',
                      }}
                      src={thumbnail.url}
                      preview={false}
                      alt={thumbnail.description}
                    />
                  }
                  bordered
                >
                  <div
                    id="article-summary-information"
                    className={styles.articleSummaryBody}
                  >
                    <Space>
                      <Text type="secondary">
                        {formatDateAndTime(publishedDate, 'day')}
                      </Text>
                    </Space>

                    <Paragraph
                      strong
                      style={{
                        margin: 0,
                        fontSize: fontSizeHeading5,
                      }}
                      ellipsis={
                        md
                          ? ({
                              rows: 2,
                              tooltip: title,
                            } as EllipsisConfig)
                          : ({
                              rows: 2,
                            } as EllipsisConfig)
                      }
                    >
                      {title}
                    </Paragraph>
                  </div>
                </Card>
              </Link>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </div>
  );
};

export default ReportCarousel;
