import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, usePage } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

function MainPage({ posts, userInfo, auth }) {
    const { items } = usePage().props;

    return (
        <div>
            <Head title="PostIt" />

            <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-end">
                {auth.user ? (
                    <Link
                        href={route("dashboard")}
                        className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                    >
                        Dashboard
                    </Link>
                ) : (
                    <>
                        <Link
                            href={route("login")}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Log in
                        </Link>

                        <Link
                            href={route("register")}
                            className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>

            <div>
                {posts.data.map((e) => {
                    return (
                        <div>
                            {userInfo.map((userName) => {
                                return (
                                    <>
                                        {userName.id == e.user_id &&
                                            userName.name}
                                    </>
                                );
                            })}
                            {e.title}
                            <ReactQuill
                                readOnly={true}
                                value={e.body}
                                theme="bubble"
                            />
                        </div>
                    );
                })}
            </div>
            <div>
                {posts.prev_page_url && <a href={posts.prev_page_url}>prev</a>}
                {posts.next_page_url && <a href={posts.next_page_url}>next</a>}
            </div>
        </div>
    );
}

export default MainPage;
