import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link } from "@inertiajs/react";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
function UserPost({ posts, auth }) {
    return (
        <div>
            <AuthenticatedLayout user={auth.user}>
                <div className="flex justify-center m-9">
                    <Link
                        href={route("createpost")}
                        className=" rounded-xl bg-red-700 p-5 text-white"
                    >
                        Create Post
                    </Link>
                </div>
                <div className="grid grid-cols-3 gap-11 m-20">
                    {posts.map((e) => {
                        return (
                            <div className="flex flex-col p-8 rounded-lg shadow-2xl gap-7 ">
                                <div>{e.title}</div>
                                <div>
                                    <ReactQuill
                                        readOnly={true}
                                        value={e.body}
                                        theme="bubble"
                                    />
                                </div>
                                <div>{auth.user.name}</div>
                            </div>
                        );
                    })}
                </div>
            </AuthenticatedLayout>
        </div>
    );
}

export default UserPost;
