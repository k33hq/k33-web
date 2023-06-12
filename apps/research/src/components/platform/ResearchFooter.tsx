import { Button, Divider, Layout, Space, theme } from 'antd';
import styles from './styles.module.scss';
import {
  MailOutlined,
  LinkedinFilled,
  TwitterOutlined,
} from '@ant-design/icons';
import { appStructure } from '@/config';

const { Footer, Content } = Layout;
const { useToken } = theme;

const ResearchFooter: React.FC = () => {
  const {
    token: { colorBgContainer },
    // eslint-disable-next-line react-hooks/rules-of-hooks
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
              <Button key={nav.label} type="link" size="small">
                {nav.label}
              </Button>
            ))}
          </div>
          <div id="social-links">
            <Space wrap>
              <Button type="link" icon={<MailOutlined />} />
              <Button type="link" icon={<LinkedinFilled />} />
              <Button type="link" icon={<TwitterOutlined />} />
            </Space>
          </div>
        </Content>
      </Layout>
    </Footer>
  );
};

export default ResearchFooter;
