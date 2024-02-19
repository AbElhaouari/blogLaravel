import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { storage } from "@/firebase";
import { Link, useForm } from "@inertiajs/react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, {
    FormEventHandler,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { formats } from "./Partials/formats";
import { Transition } from "@headlessui/react";

export default function Edit({ post, user, auth }) {
    console.log(post);

    ////////////////////////////// quill image/////////////////////////////
    const [file, setFile] = useState("");

    const imageHandler = () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
            setFile(input.files[0]);
        };
    };

    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ size: [] }],
                    [{ font: [] }],
                    [{ align: ["right", "center", "justify"] }],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link", "image"],
                    [{ color: ["red", "#785412"] }],
                    [{ background: ["red", "#785412"] }],
                ],
                handlers: {
                    image: imageHandler,
                },
            },
        }),
        []
    );
    ///////////////////////////////////////////////////////////////////////

    ///////////////////////////// upload image/////////////////////////////
    var [isUploading, setIsUploading] = useState(false);
    const qref = useRef();
    const [prog, setProg] = useState(0);
    useEffect(() => {
        const upload = () => {
            const name = new Date().getTime() + file.name;
            const editor = qref.current.getEditor();
            const storageRef = ref(storage, name);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProg(progress);
                    switch (snapshot.state) {
                        case "running":
                            setIsUploading(true);
                            break;
                    }
                },
                (error) => {
                    ///// handling err
                },
                () => {
                    //// handling uploaded file
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            try {
                                setIsUploading(false);

                                const link = downloadURL;
                                console.log(downloadURL);

                                editor.insertEmbed(
                                    editor.getSelection(),
                                    "image",
                                    link
                                );
                            } catch (err) {
                                console.log("upload error :", err);
                            }
                        }
                    );
                }
            );
        };
        file && upload();
    }, [file]);
    /////////////////////////////////////////////////////////////////////////

    /////////////////////////// update post //////////////////////////////////
    const [value, setValue] = useState(post.body);
    const [titleValue, setTitleValue] = useState(post.title);
    const { data, setData, put, processing, recentlySuccessful } = useForm({
        title: titleValue,
        body: value,
        user_id: auth.user.id,
    });
    useEffect(() => {
        setData("body", value);
    }, [value]);

    const handleProcedureContentChange = (content: any) => {
        setValue(content);
    };
    const UpdatePost: FormEventHandler = (e) => {
        e.preventDefault();
        put(route("update", { id: post.id }));
    };

    //////////////////////////////////////////////////////////////////////////
    return (
        <div>
            <AuthenticatedLayout user={auth.user}>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 ">
                    <div
                        className="bg-blue-600 h-2.5 rounded-full "
                        style={{ width: `${prog}%` }}
                    ></div>
                </div>
                <form onSubmit={UpdatePost} className="">
                    <InputLabel htmlFor="title" value="Title" />
                    <TextInput
                        defaultValue={titleValue}
                        id="title"
                        onChange={(e) => setData("title", e.target.value)}
                    />
                    <ReactQuill
                        ref={qref}
                        id="body"
                        theme="snow"
                        value={value}
                        onChange={handleProcedureContentChange}
                        modules={modules}
                        formats={formats}
                    />

                    <PrimaryButton disabled={isUploading || processing}>
                        Save
                    </PrimaryButton>
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
