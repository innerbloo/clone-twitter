'use client';

import { usePathname } from 'next/navigation';

import FollowRecommend from '@/app/(afterLogin)/_component/FollowRecommend';
import style from '@/app/(afterLogin)/layout.module.css';

export default function RightFollowRecommendZone() {
    const pathName = usePathname();

    // if (pathName.includes('/messages')) {
    //     return null;
    // }

    return (
        <div className={style.followRecommend}>
            <h3>팔로우 추천</h3>
            <FollowRecommend />
            <FollowRecommend />
            <FollowRecommend />
        </div>
    );
}
