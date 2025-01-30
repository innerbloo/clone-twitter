import './globals.css';

import { MSWProvider } from '@/app/_component/MSWComponent';

if (
    process.env.NEXT_RUNTIME === 'nodejs' &&
    process.env.NODE_ENV !== 'production'
) {
    const { server } = require('@/mocks/http');
    server.listen();
}

type Props = {
    children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
            <body>
                <MSWProvider>{children}</MSWProvider>
            </body>
        </html>
    );
}
