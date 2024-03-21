import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {useEffect, useState} from "react";

export default function UsersList({ auth, users }) {


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User List</h2>}
        >
            <Head title="User List" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <table>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th>Name</th>
                            </tr>
                            {
                                users.map((user) => (
                                    <tr>
                                        <td>{user.id}</td>
                                        <td>{user.email}</td>
                                        <td>{user.name}</td>
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
