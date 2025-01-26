import React, { ReactNode } from 'react';

import './globals.css';

type Props = {
    children: ReactNode;
};

export default function RootLayout({ children }: Readonly<Props>) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
