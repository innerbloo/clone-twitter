import style from './singlePost.module.css';

import CommentForm from '@/app/(afterLogin)/[username]/status/[id]/_component/CommentForm';
import Comments from '@/app/(afterLogin)/[username]/status/[id]/_component/Comments';
import SinglePost from '@/app/(afterLogin)/[username]/status/[id]/_component/SinglePost';
import { getComments } from '@/app/(afterLogin)/[username]/status/[id]/_lib/getComments';
import { getSinglePost } from '@/app/(afterLogin)/[username]/status/[id]/_lib/getSinglePost';
import BackButton from '@/app/(afterLogin)/_component/BackButton';

import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
} from '@tanstack/react-query';

type Props = {
    params: Promise<{ id: string; username: string }>;
};

export default async function Page({ params }: Props) {
    const { id } = await params;

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ['posts', id],
        queryFn: getSinglePost,
    });
    await queryClient.prefetchQuery({
        queryKey: ['posts', id, 'comments'],
        queryFn: getComments,
    });
    const dehydratedState = dehydrate(queryClient);

    return (
        <div className={style.main}>
            <HydrationBoundary state={dehydratedState}>
                <div className={style.header}>
                    <BackButton />
                    <h3 className={style.headerTitle}>게시물</h3>
                </div>
                <SinglePost id={id} />
                <CommentForm />
                <div>
                    <Comments id={id} />
                </div>
            </HydrationBoundary>
        </div>
    );
}
