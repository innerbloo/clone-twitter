'use client';

import { Fragment, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Post from '@/app/(afterLogin)/_component/Post';
import { getFollowingPosts } from '@/app/(afterLogin)/home/_lib/getFollowingPosts';
import { Post as IPost } from '@/model/Post';

import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

export default function FollowingPosts() {
    const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery<
        IPost[],
        Object,
        InfiniteData<IPost[]>,
        [_1: string, _2: string],
        number
    >({
        queryKey: ['posts', 'followings'],
        queryFn: getFollowingPosts,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
        staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
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
