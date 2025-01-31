'use client';

import Post from '@/app/(afterLogin)/_component/Post';
import { getFollowingPosts } from '@/app/(afterLogin)/home/_lib/getFollowingPosts';
import { Post as IPost } from '@/model/Post';

import { useQuery } from '@tanstack/react-query';

export default function FollowingPosts() {
    const { data } = useQuery<IPost[]>({
        queryKey: ['posts', 'followings'],
        queryFn: getFollowingPosts,
        staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
        gcTime: 300 * 1000,
    });
    return data?.map((post) => <Post key={post.postId} post={post} />);
}
