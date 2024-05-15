import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className='container'>
                <h1>Home Page</h1>
            </div>
        </>
    );
}
