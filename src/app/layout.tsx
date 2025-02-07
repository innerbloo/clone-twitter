import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';

import AuthSession from '@/app/_component/AuthSession';
import { MSWProvider } from '@/app/_component/MSWComponent';

if (
    process.env.NEXT_RUNTIME === 'nodejs' &&
    process.env.NODE_ENV !== 'production' &&
    process.env.NEXT_PUBLIC_MSW_ENABLED !== 'false'
) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { server } = require('@/mocks/http');
    server.listen();
}

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Y. 무슨 일이 일어나고 있나요? / Y',
    description: 'Y.com inspired by X.com',
};

type Props = {
    children: React.ReactNode;
};
export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <MSWProvider>
                    <AuthSession>{children}</AuthSession>
                </MSWProvider>
            </body>
        </html>
    );
}
