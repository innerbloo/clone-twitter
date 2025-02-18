import { redirect } from 'next/navigation';

import Main from '@/app/(beforeLogin)/_component/Main';
import RedirectToLogin from '@/app/(beforeLogin)/login/_component/RedirectToLogin';
import { auth } from '@/auth';

export default async function Login() {
    const session = await auth();

    if (session?.user) {
        redirect('/home');
        return null;
    }

    return (
        <>
            <RedirectToLogin />
            <Main />
        </>
    );
}
