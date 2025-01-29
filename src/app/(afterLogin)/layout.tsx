import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

import YLogo from '../../../public/ylogo.svg';

import LogoutButton from '@/app/(afterLogin)/_component/LogoutButton';
import NavMenu from '@/app/(afterLogin)/_component/NavMenu';
import RightFollowRecommendZone from '@/app/(afterLogin)/_component/RightFollowRecommendZone';
import RightSearchZone from '@/app/(afterLogin)/_component/RightSearchZone';
import TrendSection from '@/app/(afterLogin)/_component/TrendSection';
import style from '@/app/(afterLogin)/layout.module.css';

type Props = {
    children: ReactNode;
    modal: ReactNode;
};

export default function AfterLoginLayout({ children, modal }: Readonly<Props>) {
    return (
        <div className={style.container}>
            <header className={style.leftSectionWrapper}>
                <section className={style.leftSection}>
                    <div className={style.leftSectionFixed}>
                        <Link className={style.logo} href="/home">
                            <div className={style.logoPill}>
                                <Image
                                    src={YLogo}
                                    alt="y.com로고"
                                    width={32}
                                    height={32}
                                />
                            </div>
                        </Link>
                        <nav>
                            <ul>{<NavMenu />}</ul>
                            <Link
                                href="/compose/tweet"
                                className={style.postButton}
                            >
                                게시하기
                            </Link>
                        </nav>
                        <LogoutButton />
                    </div>
                </section>
            </header>
            <div className={style.rightSectionWrapper}>
                <div className={style.rightSectionInner}>
                    <main className={style.main}>{children}</main>
                    <section className={style.rightSection}>
                        <RightSearchZone />
                        <TrendSection />
                        <RightFollowRecommendZone />
                    </section>
                </div>
            </div>
            {modal}
        </div>
    );
}
