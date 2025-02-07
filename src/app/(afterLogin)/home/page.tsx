import { Metadata } from 'next';
import { Suspense } from 'react';

import style from './home.module.css';

import PostForm from '@/app/(afterLogin)/home/_component/PostForm';
import Tab from '@/app/(afterLogin)/home/_component/Tab';
import TabDeciderSuspense from '@/app/(afterLogin)/home/_component/TabDeciderSuspense';
import TabProvider from '@/app/(afterLogin)/home/_component/TabProvider';
import Loading from '@/app/(afterLogin)/home/loading';
import { auth } from '@/auth';

export const metadata: Metadata = {
    title: '홈 / Y',
    description: '홈',
};

export default async function Home() {
    const session = await auth();

    return (
        <main className={style.main}>
            <TabProvider>
                <Tab />
                <PostForm me={session} />
                <Suspense fallback={<Loading />}>
                    <TabDeciderSuspense />
                </Suspense>
            </TabProvider>
        </main>
    );
}
