import React, { useState } from "react";
import PropTypes from "prop-types";
import firebase from "../firebase";
import { Link } from "react-router-dom";

function Projects(props) {
  const db = firebase.firestore();
  const [projects, setProjects] = useState([]);
  const [isLoading, setLoading] = useState(true);

  // fetch projects
  React.useEffect(() => {
    const fetchAllProjects = async () => {
      const data = await db.collection("projects").get();
      setProjects(
        data.docs.map((doc) => {
          console.log(doc.data());
          return { ...doc.data(), id: doc.id };
        })
      );
      setLoading(false);
    };
    fetchAllProjects();
  }, [db]);

  if (isLoading) {
    return <p>Loading...</p>;
  } else {
    return (
      <section className='text-gray-600 body-font'>
        <div className='container px-5 py-24 mx-auto'>
          <div className='flex flex-wrap -m-4'>
            {projects &&
              projects.map((project) => (
                <div className='p-4 md:w-1/3' key={project.id}>
                  <div className='h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden'>
                    <div className='p-6'>
                      <h2 className='tracking-widest text-xs title-font font-medium text-gray-400 mb-1'>
                        {project.vendor}
                      </h2>
                      <h1 className='title-font text-lg font-medium text-gray-900 mb-2'>
                        {project.title}
                      </h1>
                      <p className='leading-relaxed text-gray-400 text-sm'>
                        Production#: {project.prodVersion}
                      </p>
                      <p className='leading-relaxed mb-2 text-gray-400 text-sm'>
                        Stagging#: {project.stagVersion}
                      </p>
                      <div className='flex items-center justify-end flex-wrap '>
                        <Link
                          to={`/projects/${project.id}`}
                          className={`text-${props.theme}-500 inline-flex items-center md:mb-2 lg:mb-0`}
                        >
                          View details
                          <svg
                            className='w-4 h-4 ml-2'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                            strokeWidth={2}
                            fill='none'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                          >
                            <path d='M5 12h14' />
                            <path d='M12 5l7 7-7 7' />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    );
  }
}

Projects.defaultProps = {
  theme: "indigo",
};

Projects.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default Projects;
