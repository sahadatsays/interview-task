import { Link, Head } from '@inertiajs/react';
import { Button } from '@/Components/ui/button';

export default function Home({ auth, laravelVersion, phpVersion }) {
    return (
        <section>
            <Head title="Welcome" />
            <div className='container'>
                <h1>Home Page</h1>
                <Button variant='destructive'>Click Me</Button>
            </div>
        </section>
    );
}
