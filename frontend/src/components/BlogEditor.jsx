import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast';
import EditorJS from "@editorjs/editorjs";

import AnimationWrapper from "../common/page-animation";
import { uploadImage } from "../common/cloudinary";
import { EditorContext } from "../pages/Editor";
import { tools } from "./Tools";

const defaultBanner = "https://res.cloudinary.com/avdhesh-varshney/image/upload/v1741270498/project_banner_wpphwm.png";

const BlogEditor = () => {

    let { blog, blog: { title, banner, content, tags, des }, setBlog, textEditor, setTextEditor, setEditorState } = useContext(EditorContext);

    useEffect(() => {
        setTextEditor(new EditorJS({
            holder: "textEditor",
            data: content,
            tools: tools,
            placeholder: "Let's write an awesome story"
        }));
    }, [])

    const handleBannerUpload = (e) => {
        let img = e.target.files[0];

        if (img) {

            let loadingToast = toast.loading('Uploading...');
            uploadImage(img)
                .then((url) => {
                    if (url) {
                        toast.dismiss(loadingToast);
                        toast.success('Uploaded successfully');
                        setBlog({ ...blog, banner: url });
                    }
                })
                .catch((err) => {
                    toast.dismiss(loadingToast);
                    return toast.error(err);
                });
        }
    }

    const handleTitleKeyDown = (e) => {
        if (e.keyCode === 13) { // Enter key
            e.preventDefault();
        }
    }

    const handleTitleChange = (e) => {
        let input = e.target;

        input.style.height = 'auto';
        input.style.height = (input.scrollHeight) + 'px';

        setBlog({ ...blog, title: input.value });
    }

    const handlePublishEvent = () => {
        if (!banner.length) {
            return toast.error("Upload a project banner to publish it");
        }
        if (!title.length) {
            return toast.error("Title is required to publish a project");
        }
        if (textEditor.isReady) {
            textEditor.save()
                .then((outputData) => {
                    if (outputData.blocks.length) {
                        setBlog({ ...blog, content: outputData });
                        setEditorState("publish");
                    } else {
                        return toast.error("Write something in your project to publish it");
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    return (
        <>
            <nav className="navbar">
                <Link to="/" className="flex-none w-10">
                    <img src="logo.png" />
                </Link>
                <p className="max-md:hidden text-black line-clamp-1 w-full">
                    {title.length ? title : "New Project"}
                </p>

                <div className="flex gap-4 ml-auto">
                    <button className="btn-dark py-2"
                        onClick={handlePublishEvent}
                    >
                        Publish
                    </button>
                    <button className="btn-light py-2">
                        Save Draft
                    </button>
                </div>
            </nav>

            <Toaster />

            <AnimationWrapper>
                <section>
                    <div className="mx-auth max-w-[900px] w-full">
                        <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-gray-200">
                            <label htmlFor="uploadBanner">
                                <img
                                    src={banner ? banner : defaultBanner}
                                    className="z-20"
                                />
                                <input
                                    id="uploadBanner"
                                    type="file"
                                    accept=".png, .jpg, .jpeg"
                                    hidden
                                    onChange={handleBannerUpload}
                                />
                            </label>
                        </div>

                        <textarea
                            defaultValue={title}
                            placeholder="Project Title"
                            className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
                            onKeyDown={handleTitleKeyDown}
                            onChange={handleTitleChange}
                        ></textarea>

                        <hr className="w-full opacity-10 my-5" />

                        <div id="textEditor" className="font-gelasio"></div>
                    </div>
                </section>
            </AnimationWrapper>
        </>
    )
}

export default BlogEditor;
