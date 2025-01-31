'use client';

import { useContext } from 'react';

import FollowingPosts from '@/app/(afterLogin)/home/_component/FollowingPosts';
import PostRecommends from '@/app/(afterLogin)/home/_component/PostRecommends';
import { TabContext } from '@/app/(afterLogin)/home/_component/TabProvider';

export default function TabDecider() {
    const { tab } = useContext(TabContext);
    if (tab === 'rec') {
        return <PostRecommends />;
    }
    return <FollowingPosts />;
}
