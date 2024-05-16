import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Button } from '@/Components/ui/button';
import { Task, columns } from '@/tasks/column';
import { DataTable } from '@/Components/DataTable';
import { useEffect, useState } from 'react';



export default function Welcome({ auth, laravelVersion, phpVersion, tasks }: PageProps<{ laravelVersion: string, phpVersion: string, tasks: Array<Task> }>) {
    return (
        <section>
            <Head title="Welcome" />
            <div className="container">
                <DataTable columns={columns} data={tasks} />
            </div>

        </section>
    );
}
