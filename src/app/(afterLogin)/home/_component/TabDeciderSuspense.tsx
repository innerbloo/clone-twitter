import TabDecider from '@/app/(afterLogin)/home/_component/TabDecider';
import { getPostRecommends } from '@/app/(afterLogin)/home/_lib/getPostRecommends';

import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from '@tanstack/react-query';

export default async function TabDeciderSuspense() {
    const queryClient = new QueryClient();
    await queryClient.prefetchInfiniteQuery({
        queryKey: ['posts', 'recommends'],
        queryFn: getPostRecommends,
        initialPageParam: 0,
    });
    const dehydratedState = dehydrate(queryClient);
    return (
        <HydrationBoundary state={dehydratedState}>
            <TabDecider />
        </HydrationBoundary>
    );
}
