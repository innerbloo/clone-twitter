'use client';

import cx from 'classnames';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import style from './chatRoom.module.css';

import BackButton from '@/app/(afterLogin)/_component/BackButton';

import { faker } from '@faker-js/faker';

dayjs.locale('ko');
dayjs.extend(relativeTime);

export default function Page() {
    const pathName = usePathname();

    const user = {
        id: 'hero',
        nickname: '영웅',
        image: faker.image.avatar(),
    };

    const messages = [
        {
            messageId: 1,
            roomId: 123,
            id: 'zerohch0',
            content: '안녕하세요.',
            createdAt: new Date(),
        },
        {
            messageId: 2,
            roomId: 123,
            id: 'hero',
            content: '안녕히가세요.',
            createdAt: new Date(),
        },
    ];

    if (!pathName.includes('/messages')) {
        return null;
    }

    return (
        <main className={style.main}>
            <div className={style.header}>
                <BackButton />
                <div>
                    <h2>{user.nickname}</h2>
                </div>
            </div>
            <Link href={user.nickname} className={style.userInfo}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={user.image} alt={user.id} />
                <div>
                    <b>{user.nickname}</b>
                </div>
                <div>@{user.id}</div>
            </Link>
            <div className={style.list}>
                {messages.map((m) => {
                    if (m.id === 'zerohch0') {
                        // 내 메시지면
                        return (
                            <div
                                key={m.messageId}
                                className={cx(style.message, style.myMessage)}
                            >
                                <div className={style.content}>{m.content}</div>
                                <div className={style.date}>
                                    {dayjs(m.createdAt).format(
                                        'YYYY년 MM월 DD일 A HH시 mm분',
                                    )}
                                </div>
                            </div>
                        );
                    }
                    return (
                        <div
                            key={m.messageId}
                            className={cx(style.message, style.yourMessage)}
                        >
                            <div className={style.content}>{m.content}</div>
                            <div className={style.date}>
                                {dayjs(m.createdAt).format(
                                    'YYYY년 MM월 DD일 A HH시 mm분',
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
}
