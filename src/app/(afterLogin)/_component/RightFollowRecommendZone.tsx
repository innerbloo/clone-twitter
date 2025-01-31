'use client';

import FollowRecommend from '@/app/(afterLogin)/_component/FollowRecommend';
import { getFollowRecommends } from '@/app/(afterLogin)/_lib/getFollowRecommends';
import style from '@/app/(afterLogin)/layout.module.css';
import { User } from '@/model/User';

import { useQuery } from '@tanstack/react-query';

export default function RightFollowRecommendZone() {
    const { data } = useQuery<User[]>({
        queryKey: ['users', 'followRecommends'],
        queryFn: getFollowRecommends,
        staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
        gcTime: 300 * 1000,
    });

    console.log(data);

    return (
        <div className={style.followRecommend}>
            <h3>팔로우 추천</h3>
            {data?.map((user) => <FollowRecommend key={user.id} user={user} />)}
        </div>
    );
}
