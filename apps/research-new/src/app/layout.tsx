'use client';
import { Poppins } from 'next/font/google';
import { ResearchHeader, RootStyleProvider } from '@/components';
import { Button, Layout } from 'antd';
import 'antd/dist/reset.css';

const { Header, Content } = Layout;
const poppins = Poppins({
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <RootStyleProvider>
          <Layout
            style={{
              maxHeight: 1024,
            }}
          >
            <ResearchHeader />
            <Content className="site-layout">{children}</Content>
          </Layout>
        </RootStyleProvider>
      </body>
    </html>
  );
}
