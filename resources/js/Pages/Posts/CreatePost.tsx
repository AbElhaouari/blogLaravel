import React, {
    FormEventHandler,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import { Transition } from "@headlessui/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

//react qui imports
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { formats } from "./Partials/formats";

//firebase imports
import { storage } from "@/firebase";
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "firebase/storage";
import { error } from "console";

export default function CreatePost({ auth }) {
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

    //////////////////////////////// upload post/////////////////////////////
    const [value, setValue] = useState("");
    const { data, setData, post, processing, recentlySuccessful } = useForm({
        title: "",
        body: value,
        user_id: auth.user.id,
    });
    useEffect(() => {
        setData("body", value);
    }, [value]);

    const handleProcedureContentChange = (content: any) => {
        setValue(content);
    };

    const SubmitPost: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("posts.store"));
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
                <form onSubmit={SubmitPost} className="">
                    <InputLabel htmlFor="title" value="Title" />
                    <TextInput
                        value={data.title}
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
                    {/* <InputLabel htmlFor="body" value="Body" />
                    <TextInput
                        value={data.body}
                        id="body"
                        onChange={(e) => setData("body", e.target.value)}
                    /> */}
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
