'use client';

import { getUserPosts } from '../_lib/getUserPosts';

import Post from '@/app/(afterLogin)/_component/Post';
import { Post as IPost } from '@/model/Post';

import { useQuery, useQueryClient } from '@tanstack/react-query';

type Props = {
    username: string;
};
export default function UserPosts({ username }: Props) {
    const { data } = useQuery<
        IPost[],
        object,
        IPost[],
        [_1: string, _2: string, _3: string]
    >({
        queryKey: ['posts', 'users', username],
        queryFn: getUserPosts,
        staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
        gcTime: 300 * 1000,
    });
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData(['users', username]);
    if (user) {
        return data?.map((post) => <Post key={post.postId} post={post} />);
    }
    return null;
}
