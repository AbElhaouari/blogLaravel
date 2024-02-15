import React, { FormEventHandler } from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
export default function CreatePost({ auth }) {
    const { data, setData, post, processing, recentlySuccessful } = useForm({
        title: "",
        body: "",
        user_id: auth.user.id,
    });

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

                    <InputLabel htmlFor="body" value="Body" />
                    <TextInput
                        value={data.body}
                        id="body"
                        onChange={(e) => setData("body", e.target.value)}
                    />
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
