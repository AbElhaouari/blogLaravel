import React, { FormEventHandler, useEffect, useRef, useState } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export default function CreatePost({ auth }) {
    const [value, setValue] = useState("");
    const { data, setData, post, processing, recentlySuccessful } = useForm({
        title: "",
        body: value,
        user_id: auth.user.id,
    });
    useEffect(() => {
        setData("body", value);
    }, [value]);

    const SubmitPost: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("posts.store"));
    };
    return (
        <div>
            <AuthenticatedLayout user={auth.user}>
                <form onSubmit={SubmitPost}>
                    <InputLabel htmlFor="title" value="Title" />
                    <TextInput
                        value={data.title}
                        id="title"
                        onChange={(e) => setData("title", e.target.value)}
                    />
                    <ReactQuill
                        id="body"
                        theme="snow"
                        value={value}
                        onChange={setValue}
                    />
                    {/* <InputLabel htmlFor="body" value="Body" />
                    <TextInput
                        value={data.body}
                        id="body"
                        onChange={(e) => setData("body", e.target.value)}
                    /> */}
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>
                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        Saved...
                    </Transition>
                </form>
            </AuthenticatedLayout>
        </div>
    );
}
