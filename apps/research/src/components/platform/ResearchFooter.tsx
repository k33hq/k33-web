import { Button, Divider, Layout, Space, theme, Row, Col } from 'antd';
import styles from './styles.module.scss';
import {
  MailOutlined,
  LinkedinFilled,
  TwitterOutlined,
} from '@ant-design/icons';
import { appStructure } from '@/config';
import Link from 'next/link';

const { Footer, Content } = Layout;
const { useToken } = theme;

const ResearchFooter: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = useToken();
  return (
    <Footer
      className={styles.footer}
      style={{
        backgroundColor: colorBgContainer,
      }}
    >
      <Divider />
      <Layout
        id="footer-main"
        className={styles.footer}
        style={{
          backgroundColor: colorBgContainer,
        }}
      >
        <Content id="footer-content" className={styles.footerContent}>
          <div id="navigation" className={styles.navigation}>
            {appStructure.navigation.map((nav) => (
              <Link href={nav.url} key={nav.key}>
                <Button key={nav.label} type="link" size="small">
                  {nav.label}
                </Button>
              </Link>
            ))}
          </div>
          <div id="social-links">
            <Space wrap>
              <Button
                type="link"
                icon={<MailOutlined />}
                href="mailto:contact@k33.com"
              />
              <Button
                type="link"
                icon={<LinkedinFilled />}
                href="https://twitter.com/K33HQ?ref_src=twsrc%5Etfw"
              />
              <Button type="link" icon={<TwitterOutlined />} />
            </Space>
          </div>
        </Content>
      </Layout>
    </Footer>
  );
};

export default ResearchFooter;
