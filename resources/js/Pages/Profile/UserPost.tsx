import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, useForm } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { Inertia } from "@inertiajs/inertia";
function UserPost({ posts, auth, userid }) {
    console.log(userid);

    const HandleDelete = (id) => {
        if (confirm("do you want to delete this post?")) {
            Inertia.delete(`/profile/userpost/${id}`);
        }
    };

    return (
        <div>
            <AuthenticatedLayout
                user={auth.user}
                header={
                    <h2 className="text-xl font-semibold ">
                        {userid.name} Post's
                    </h2>
                }
            >
                {auth.user.id == userid.id ? (
                    <>
                        <div className="flex justify-center m-9">
                            <Link
                                href={route("createpost")}
                                className=" rounded-xl bg-blue-800 p-5 text-white"
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
                                        <div className="flex  justify-between">
                                            <Link
                                                href={route("edit", {
                                                    id: e.id,
                                                })}
                                                className="rounded p-3 text-white bg-green-700 "
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                onClick={() =>
                                                    HandleDelete(e.id)
                                                }
                                                className="rounded p-3 text-white bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <>
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
                                        <div>{userid.name}</div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </AuthenticatedLayout>
        </div>
    );
}

export default UserPost;
