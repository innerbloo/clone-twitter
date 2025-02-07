import { Metadata } from 'next';
import React from 'react';

import style from './singlePost.module.css';

import { getUserServer } from '@/app/(afterLogin)/[username]/_lib/getUserServer';
import CommentForm from '@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm';
import Comments from '@/app/(afterLogin)/[username]/status/[id]/_component/Comments';
import SinglePost from '@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost';
import { getComments } from '@/app/(afterLogin)/[username]/status/[id]/_lib/getComments';
import { getSinglePostServer } from '@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePostServer';
import BackButton from '@/app/(afterLogin)/_component/BackButton';
import { Post } from '@/model/Post';
import { User } from '@/model/User';

import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from '@tanstack/react-query';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { username, id } = await params;
    const [user, post]: [User, Post] = await Promise.all([
        getUserServer({ queryKey: ['users', username] }),
        getSinglePostServer({ queryKey: ['posts', id] }),
    ]);
    return {
        title: `Y에서 ${user.nickname} 님 : "${post.content}"`,
        description: post.content,
    };
}

type Props = {
    params: Promise<{ id: string; username: string }>;
};
export default async function Page({ params }: Props) {
    const { id } = await params;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['posts', id],
        queryFn: getSinglePostServer,
    });
    await queryClient.prefetchQuery({
        queryKey: ['posts', id, 'comments'],
        queryFn: getComments,
    });
    const dehydratedState = dehydrate(queryClient);

    return (
        <div className={style.main}>
            <HydrationBoundary state={dehydratedState}>
                <div className={style.header}>
                    <BackButton />
                    <h3 className={style.headerTitle}>게시물</h3>
                </div>
                <SinglePost id={id} />
                <CommentForm id={id} />
                <div>
                    <Comments id={id} />
                </div>
            </HydrationBoundary>
        </div>
    );
}
