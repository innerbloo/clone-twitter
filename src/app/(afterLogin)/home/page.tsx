import style from './home.module.css';

import PostForm from '@/app/(afterLogin)/home/_component/PostForm';
import Tab from '@/app/(afterLogin)/home/_component/Tab';
import TabDecider from '@/app/(afterLogin)/home/_component/TabDecider';
import TabProvider from '@/app/(afterLogin)/home/_component/TabProvider';

import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from '@tanstack/react-query';

async function getPostRecommends() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/postRecommends`,
        {
            next: {
                tags: ['posts', 'recommends'],
            },
        },
    );
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export default async function Home() {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['posts', 'recommends'],
        queryFn: getPostRecommends,
    });
    const dehydratedState = dehydrate(queryClient);

    return (
        <main className={style.main}>
            <HydrationBoundary state={dehydratedState}>
                <TabProvider>
                    <Tab />
                    <PostForm />
                    <TabDecider />
                </TabProvider>
            </HydrationBoundary>
        </main>
    );
}
