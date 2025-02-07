'use client';

import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Post from '@/app/(afterLogin)/_component/Post';
import { getPostRecommends } from '@/app/(afterLogin)/home/_lib/getPostRecommends';
import { Post as IPost } from '@/model/Post';

import { InfiniteData, useSuspenseInfiniteQuery } from '@tanstack/react-query';

export default function PostRecommends() {
    const { data, hasNextPage, fetchNextPage, isFetching } =
        useSuspenseInfiniteQuery<
            IPost[],
            object,
            InfiniteData<IPost[]>,
            [_1: string, _2: string],
            number
        >({
            queryKey: ['posts', 'recommends'],
            queryFn: getPostRecommends,
            initialPageParam: 0,
            getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
            staleTime: 60 * 1000,
            gcTime: 300 * 1000,
        });

    const { ref, inView } = useInView({
        threshold: 0,
        delay: 500,
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetching) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetching, fetchNextPage]);

    return (
        <>
            {data?.pages.map((page, i) => (
                <Fragment key={i}>
                    {page.map((post) => (
                        <Post key={post.postId} post={post} />
                    ))}
                </Fragment>
            ))}
            <div ref={ref} style={{ height: 50 }} />
        </>
    );
}
