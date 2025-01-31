'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

import style from './followRecommend.module.css';

import { User } from '@/model/User';

export default function FollowRecommend({ user }: Readonly<{ user: User }>) {
    const { data } = useSession();

    const onFollow = () => {
        if (!data?.user) {
            redirect('/login');
        }
    };

    return (
        <div className={style.container}>
            <div className={style.userLogoSection}>
                <div className={style.userLogo}>
                    <img src={user.image} alt={user.id} />
                </div>
            </div>
            <div className={style.userInfo}>
                <div className={style.title}>{user.nickname}</div>
                <div className={style.count}>@{user.id}</div>
            </div>
            <div className={style.followButtonSection}>
                <button onClick={onFollow}>팔로우</button>
            </div>
        </div>
    );
}
