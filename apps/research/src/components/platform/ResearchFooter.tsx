import { Button, Divider, Layout, Space } from 'antd';
import styles from './styles.module.scss';
import {
  MailOutlined,
  LinkedinFilled,
  TwitterOutlined,
} from '@ant-design/icons';
import { appStructure } from '@/config';

const { Footer, Content } = Layout;

const ResearchFooter: React.FC = () => {
  return (
    <Footer className={styles.footer}>
      <Divider />
      <Layout id="footer-main" className={styles.footer}>
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
