'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

import style from './trendSection.module.css';

import Trend from '@/app/(afterLogin)/_component/Trend';
import { getTrends } from '@/app/(afterLogin)/_lib/getTrends';
import { Hashtag } from '@/model/Hashtag';

import { useQuery } from '@tanstack/react-query';

export default function TrendSection() {
    const { data: session } = useSession();
    const { data } = useQuery<Hashtag[]>({
        queryKey: ['trends'],
        queryFn: getTrends,
        staleTime: 60 * 1000, // fresh -> stale, 5분이라는 기준
        gcTime: 300 * 1000,
        enabled: !!session?.user,
    });

    const pathName = usePathname();

    if (pathName === '/explore') return null;

    if (session?.user) {
        return (
            <div className={style.trendBg}>
                <div className={style.trend}>
                    <h3>나를 위한 트렌드</h3>
                    {data?.map((trend) => (
                        <Trend key={trend.title} trend={trend} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className={style.trendBg}>
            <div className={style.noTrend}>트렌드를 가져올 수 없습니다.</div>
        </div>
    );
}
