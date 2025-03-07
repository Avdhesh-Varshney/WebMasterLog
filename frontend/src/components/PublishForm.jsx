import toast, { Toaster } from "react-hot-toast";
import AnimationWrapper from "../common/page-animation";
import { useContext } from "react";
import { EditorContext } from "../pages/Editor";
import Tag from "./Tags";

const PublishForm = () => {

    let characterLimit = 200;
    let tagLimit = 10;

    let { blog, blog: { banner, title, tags, des }, setBlog, setEditorState } = useContext(EditorContext);

    const handleCloseEvent = () => {
        setEditorState("editor");
    }

    const handleTitleKeyDown = (e) => {
        if (e.keyCode === 13) { // Enter key
            e.preventDefault();
        }
    }

    const handleProjectTitleChange = (e) => {
        let input = e.target;
        setBlog({ ...blog, title: input.value })
    }

    const handleProjectDesChange = (e) => {
        let input = e.target;
        setBlog({ ...blog, des: input.value })
    }

    const handleKeyDown = (e) => {
        if (e.keyCode === 13 || e.keyCode === 188) {
            e.preventDefault();
            let tag = e.target.value;

            if (tags.length < tagLimit) {
                if (!tags.includes(tag) && tag.length) {
                    setBlog({ ...blog, tags: [...tags, tag] });
                }
            } else {
                toast.error(`You can add maximum ${tagLimit} tags`);
            }
            e.target.value = "";
        }
    }

    return (
        <AnimationWrapper>
            <section className="w-screen min-h-screen grid items-center lg:grid-cols-2 py-16 lg:gap-4">
                <Toaster />

                <button className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%]"
                    onClick={handleCloseEvent}
                >
                    <i className="fi fi-br-cross"></i>
                </button>

                <div className="max-w-[550px] center">
                    <p className="text-dark-grey mb-1"> Preview</p>

                    <div className="w-full aspect-video rounded-lg overflow-hidden bg-gray-200 mt-4">
                        <img src={banner} alt="" />
                    </div>

                    <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">{title}</h1>
                    <p className="font-gelasio line-clamp-2 text-xl leading-7 mt-4">{des}</p>
                </div>

                <div className="border-gray-200 lg:border-1 lg:pl-8">
                    <p className="text-dark-grey mb-2 mt-9">Project Title</p>
                    <input type="text" placeholder="Project Title" defaultValue={title} className="input-box pl-4" onChange={handleProjectTitleChange} />

                    <p className="text-dark-grey mb-2 mt-9">Short description about your project</p>

                    <textarea
                        maxLength={characterLimit}
                        defaultValue={des}
                        className="h-40 resize-none leading-7 input-box pl-4"
                        onChange={handleProjectDesChange}
                        onKeyDown={handleTitleKeyDown}
                    >
                    </textarea>

                    <p className="mt-1 text-dark-grey text-sm text-right">{characterLimit - des.length} characters left</p>

                    <p className="text-dark-grey mb-2 mt-9">Topics - (Helps in searching and ranking your project post)</p>

                    <div className="relative input-box pl-2 py-2 pb-4">
                        <input type="text" placeholder="Add topics" className="sticky input-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white" onKeyDown={handleKeyDown} />
                        {
                            tags.map((tag, i) => {
                                return <Tag tag={tag} tagIndex={i} key={i} />
                            })
                        }
                    </div>
                    <p className="mt-1 mb-4 text-dark-grey text-right">{tagLimit - tags.length} Tags left</p>

                    <button className="btn-dark px-8">Publish</button>
                </div>
            </section>
        </AnimationWrapper>
    )
}

export default PublishForm;
