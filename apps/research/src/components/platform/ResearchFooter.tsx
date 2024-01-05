import { Button, Divider, Layout, Space, theme, Row, Col } from 'antd';
import styles from './styles.module.scss';
import {
  MailOutlined,
  LinkedinFilled,
  TwitterOutlined,
} from '@ant-design/icons';
import { appStructure } from '@/config';
import Link from 'next/link';
import Script from 'next/script';

const { Footer, Content } = Layout;
const { useToken } = theme;

const ResearchFooter: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = useToken();
  return (
    <Footer
      style={{
        backgroundColor: colorBgContainer,
      }}
      className={styles.footer}
    >
      <Script
        type="text/javascript"
        strategy="afterInteractive"
        id="linked_k33_id"
        dangerouslySetInnerHTML={{
          __html: `_linkedin_partner_id = "2684138"; window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []; window._linkedin_data_partner_ids.push(_linkedin_partner_id);`,
        }}
      />

      <Script
        type="text/javascript"
        strategy="afterInteractive"
        id="linked_k33_script"
        dangerouslySetInnerHTML={{
          __html: `(function(l) { if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])}; window.lintrk.q=[]} var s = document.getElementsByTagName("script")[0]; var b = document.createElement("script"); b.type = "text/javascript";b.async = true; b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js"; s.parentNode.insertBefore(b, s);})(window.lintrk); `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src="https://px.ads.linkedin.com/collect/?pid=2684138&fmt=gif"
        />
      </noscript>
      <Divider />
      <div
        style={{
          maxWidth: 1440,
          alignSelf: 'center ',
          width: '100%',
        }}
      >
        <Row>
          <Col span={22} offset={1}>
            <div className={styles.footerContent}>
              <div id="navigation" className={styles.navigation}>
                {appStructure.navigation.map((nav) => (
                  <Link href={nav.url} key={nav.key}>
                    <Button key={nav.label} type="link" size="small">
                      {nav.label}
                    </Button>
                  </Link>
                ))}
                <Link href={'/pricing'} key={'pricing'}>
                  <Button key={'pricing'} type="link" size="small">
                    Pricing
                  </Button>
                </Link>
              </div>
              <div id="social-links">
                <Space wrap>
                  <Button
                    type="link"
                    icon={<MailOutlined />}
                    href="mailto:research@k33.com"
                  />
                  <Button
                    type="link"
                    icon={<LinkedinFilled />}
                    href="https://www.linkedin.com/showcase/k33research"
                  />
                  <Button
                    type="link"
                    icon={<TwitterOutlined />}
                    href="https://twitter.com/K33Research?ref_src=twsrc%5Etfw"
                  />
                </Space>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Footer>
  );
};

export default ResearchFooter;
