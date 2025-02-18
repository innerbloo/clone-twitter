import { Metadata } from 'next';

import style from './explore.module.css';

import SearchForm from '@/app/(afterLogin)/_component/SearchForm';
import TrendSection from '@/app/(afterLogin)/explore/_component/TrendSection';

export const metadata: Metadata = {
    title: '탐색하기 / Y',
    description: '탐색해보세요.',
};

export default function Home() {
    return (
        <main className={style.main}>
            <div className={style.formZone}>
                <SearchForm />
            </div>
            <div className={style.trend}>
                <h3>나를 위한 트렌드</h3>
                <TrendSection />
            </div>
        </main>
    );
}
