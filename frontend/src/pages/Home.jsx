import { useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation from "../components/InPageNavigation";
import Loader from "../components/Loader";
import axios from "axios";
import ProjectPostCard from "../components/ProjectPostCard";

const Home = () => {

    let [projects, setProjects] = useState(null);

    const fetchLatestProjects = () => {
        axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/api/project/get")
            .then(({ data }) => {
                setProjects(data.projects);
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        fetchLatestProjects();
    }, []);
    return (
        <AnimationWrapper>
            <section className="h-cover flex justify-center gap-10">
                {/* Latest projects */}
                <div className="w-full">
                    <InPageNavigation routes={["home", "trending projects"]} defaultHidden={["trending projects"]}>
                        <>
                            {
                                projects === null ? <Loader /> :
                                    projects.map((project, i) => {
                                        return <AnimationWrapper key={i} transition={{ duration: 1, delay: i * .1 }}>
                                            <ProjectPostCard content={project} author={project.author.personal_info} />
                                        </AnimationWrapper>
                                    })
                            }
                        </>
                        <h1>Trending Projects Here</h1>
                    </InPageNavigation>
                </div>

                {/* filters and trending projects */}
                <div>
                </div>
            </section>
        </AnimationWrapper>
    )
}

export default Home;
