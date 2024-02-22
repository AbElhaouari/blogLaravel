import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, useForm } from "@inertiajs/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
function UserPost({ posts, auth, userid }) {
    const [isOpen, setIsOpen] = useState(false);
    const [clicked, setClicked] = useState("");

    const HandleDelete = (id) => {
        if (confirm("do you want to delete this post?")) {
            Inertia.delete(`/profile/userpost/${id}`);
        }
    };

    const HandeOpen = (id) => {
        posts.map((e) => {
            if (e.id == id) {
                console.log("equals");
                setClicked(e.id);
                setIsOpen(true);
            }
        });
    };

    const handleDiv = () => {
        if (isOpen) {
            setIsOpen(!isOpen);
        }
    };

    const SliceString = (str) => {
        return str.length > 10 ? str.substring(0, 10) : str;
    };
    return (
        <>
            <div onClick={() => handleDiv()}>
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
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-11 m-20">
                                {posts.map((e) => {
                                    return (
                                        <div className="flex flex-col p-5 rounded-lg shadow-2xl gap-7 ">
                                            <div className="flex justify-between ">
                                                <div>{auth.user.name}</div>

                                                <div className="font-semibold text-2xl ">
                                                    {e.title}
                                                </div>
                                                <div className="">
                                                    {isOpen &&
                                                    e.id == clicked ? (
                                                        <>
                                                            <div className="absolute rounded shadow-lg p-3 bg-slate-300">
                                                                <div className="flex flex-col  justify-end gap-3">
                                                                    <div
                                                                        onClick={() =>
                                                                            setIsOpen(
                                                                                false
                                                                            )
                                                                        }
                                                                    >
                                                                        X
                                                                    </div>

                                                                    <Link
                                                                        href={route(
                                                                            "edit",
                                                                            {
                                                                                id: e.id,
                                                                            }
                                                                        )}
                                                                        className=""
                                                                    >
                                                                        Edit
                                                                    </Link>

                                                                    <button
                                                                        onClick={() =>
                                                                            HandleDelete(
                                                                                e.id
                                                                            )
                                                                        }
                                                                        className=""
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button
                                                                className="w-14 "
                                                                onClick={() =>
                                                                    HandeOpen(
                                                                        e.id
                                                                    )
                                                                }
                                                            >
                                                                :
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                {SliceString(e.created_at)}
                                            </div>

                                            <div>
                                                <ReactQuill
                                                    readOnly={true}
                                                    value={e.body}
                                                    theme="bubble"
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-11 m-20">
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
        </>
    );
}

export default UserPost;
