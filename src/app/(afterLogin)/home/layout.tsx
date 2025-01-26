import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
};

export default async function HomeLayout({ children }: Readonly<Props>) {
    return (
        <div>
            홈 레이아웃
            {children}
        </div>
    );
}
