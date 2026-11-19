import { Head, Link, usePage } from '@inertiajs/react';
import { dashboard, login } from '@/routes';
import { register } from '@/routes';
import MainLayout from '@/layouts/MainLayout';

export default function Welcome() {
    const { auth } = usePage().props;

    return (
        <>
             <Head title="Home | Brandology" />

            <MainLayout quoteCount={0}>
                <div className="bg-white">
                  
                </div>
            </MainLayout>



        </>
    );
}
