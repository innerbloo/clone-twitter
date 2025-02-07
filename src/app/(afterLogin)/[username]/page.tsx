import style from './profile.module.css';

import UserInfo from '@/app/(afterLogin)/[username]/_component/UserInfo';
import UserPosts from '@/app/(afterLogin)/[username]/_component/UserPosts';
import { getUserPosts } from '@/app/(afterLogin)/[username]/_lib/getUserPosts';
import { getUserServer } from '@/app/(afterLogin)/[username]/_lib/getUserServer';
import { auth } from '@/auth';
import { User } from '@/model/User';

import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from '@tanstack/react-query';

type Props = {
    params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props) {
    const { username } = await params;
    const user: User = await getUserServer({ queryKey: ['users', username] });
    return {
        title: `${user.nickname} (${user.id}) / Y`,
        description: `${user.nickname} (${user.id}) 프로필`,
    };
}

export default async function Profile(props: Props) {
    const { username } = await props.params;
    const session = await auth();
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['users', username],
        queryFn: getUserServer,
    });
    await queryClient.prefetchQuery({
        queryKey: ['posts', 'users', username],
        queryFn: getUserPosts,
    });
    const dehydratedState = dehydrate(queryClient);

    return (
        <main className={style.main}>
            <HydrationBoundary state={dehydratedState}>
                <UserInfo username={username} session={session} />
                <div>
                    <UserPosts username={username} />
                </div>
            </HydrationBoundary>
        </main>
    );
}
