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
import Slider from 'react-slick';

const { useToken } = theme;
const { Text, Paragraph } = Typography;

const { useBreakpoint } = Grid;

interface ReportCarouselProps {
  reports: ReadonlyArray<ArticleWebWidget>;
}

const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4.2,
  slidesToScroll: 4.2,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const ReportCarousel: React.FC<ReportCarouselProps> = ({ reports }) => {
  const {
    token: { screenLG, screenSM, fontSizeHeading5, screenMDMin },
  } = useToken();

  const { md, sm } = useBreakpoint();

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4.2,
    slidesToScroll: 4.2,
    initialSlide: 0,
    autoplaySpeed: 500,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: screenLG,
        settings: {
          slidesToShow: 3.2,
          slidesToScroll: 3.2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: screenMDMin,
        settings: {
          slidesToShow: 2.4,
          slidesToScroll: 2.4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: screenSM,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1.2,
          initialSlide: 1.2,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <Carousel {...settings}>
      {reports.map(
        ({ article: { thumbnail, title }, publishedDate, articleSlug }) => (
          <Link
            key={articleSlug}
            href={`https://${process.env.NEXT_PUBLIC_WEB_DOMAIN}/research/articles/${articleSlug}`}
          >
            <Card
              style={{
                width: 224,
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
        )
      )}
    </Carousel>
  );
};

export default ReportCarousel;
