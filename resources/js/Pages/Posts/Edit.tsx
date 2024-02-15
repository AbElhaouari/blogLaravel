import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import React, { FormEventHandler } from "react";

export default function Edit({ post, user }) {
    const { data, setData, put, processing } = useForm({
        title: "",
        body: "",
    });
    console.log(user);

    const UpdatePost: FormEventHandler = (e) => {
        e.preventDefault();
        put(route("update", { id: post.id }));
    };
    return (
        <div>
            <div>
                <Link href={route("posts.index")}>Back</Link>
            </div>
            <form onSubmit={UpdatePost}>
                <InputLabel htmlFor="Author" value={user} />
                <InputLabel htmlFor="title" value="Title" />
                <TextInput
                    placeholder={post.title}
                    value={data.title}
                    id="title"
                    onChange={(e) => setData("title", e.target.value)}
                />
                <InputLabel htmlFor="body" value="Body" />
                <TextInput
                    placeholder={post.body}
                    value={data.body}
                    id="body"
                    onChange={(e) => setData("body", e.target.value)}
                />
                <PrimaryButton disabled={processing}>Update</PrimaryButton>
            </form>
        </div>
    );
}
