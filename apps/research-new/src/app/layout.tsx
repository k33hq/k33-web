'use client';
import { Poppins } from 'next/font/google';
import { ResearchHeader, RootStyleProvider } from '@/components';
import { Layout } from 'antd';
import 'antd/dist/reset.css';

const { Content } = Layout;
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
            <Content>{children}</Content>
          </Layout>
        </RootStyleProvider>
      </body>
    </html>
  );
}

// TODO: ask xavier about this
// TODO: decompose individual sections into its own component, maybe reuse it over the other pages
// TODO:
