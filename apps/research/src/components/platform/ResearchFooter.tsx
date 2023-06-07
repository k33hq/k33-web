import { Button, Divider, Layout, Space } from 'antd';
import styles from './styles.module.scss';
import {
  MailOutlined,
  LinkedinFilled,
  TwitterOutlined,
} from '@ant-design/icons';

const { Footer, Content } = Layout;

const ResearchFooter: React.FC = () => {
  return (
    <Footer>
      <Divider />
      <Layout id="footer-main" className={styles.footer}>
        <Content id="footer-content">
          <div id="navigation">Nav</div>
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
