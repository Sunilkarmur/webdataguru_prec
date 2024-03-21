import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {useEffect, useState} from "react";
import moment from "moment";

export default function UsersReport({ auth, timeList }) {


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">User List</h2>}
        >
            <Head title="User List" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <table className="table">
                            <tr>
                                <th>ID</th>
                                <th>User ID</th>
                                <th>Date</th>
                                <th>Start time</th>
                                <th>Break time</th>
                                <th>End Time</th>
                            </tr>
                            {
                                timeList.map((user) => (
                                    <tr className="gap-6">
                                        <td>{user.id}</td>
                                        <td>{user.user_id}</td>
                                        <td>{moment(user.start_time).format('YYYY-MM-DD')}</td>
                                        <td>{moment(user.start_time).format('HH:mm:ss')}</td>
                                        <td>{user.break_time}</td>
                                        <td>{moment(user.end_time).format('HH:mm:ss')}</td>
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
