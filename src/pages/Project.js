import React, { useState } from "react";
import PropTypes from "prop-types";
import firebase from "../firebase";
import moment from "moment";
import { useParams } from "react-router-dom";

function Project(props) {
  const db = firebase.firestore();
  const [vendors, setVendors] = useState([]);
  const { id } = useParams();
  const [isEditMode, setIsEditMode] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [projectDetails, setProjectDetails] = useState({
    title: "",
    prodVersion: "",
    stagVersion: "",
    repoLink: "",
    vendor: "",
    projectType: "",
    dateCreated: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
    details: "",
    userId: "",
  });

  // decide EDIT or NEW screen
  React.useEffect(() => {
    if (id === "null") {
      setIsEditMode(false);
      setLoading(false);
    } else {
      setIsEditMode(true);
      getDataById(id);
    }
  }, [id]);

  // get project data
  const getDataById = async (id) => {
    const snapshot = await db.collection("projects").doc(id).get();
    setProjectDetails({ ...snapshot.data() });
    setLoading(false);
  };

  // save the product
  const submit = async () => {
    const projectCollection = await db.collection("projects");
    projectCollection.add({
      ...projectDetails,
    });
  };

  // Input field value change
  const changeValue = (event) => {
    console.log(event.target.name, event.target.value);
    setProjectDetails({
      ...projectDetails,
      [event.target.name]: event.target.value,
    });
  };

  // fetch vendors
  React.useEffect(() => {
    fetchVendors();
  }, [db, fetchVendors]);

  async function fetchVendors() {
    const vendorsData = await db.collection("vendors").get();
    const data = await vendorsData.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setVendors([...data]);
  }

  if (isLoading) {
    return <p>Loading..</p>;
  } else {
    return (
      <section className='text-left text-gray-600 body-font relative lg:w-8/12'>
        <div className='container px-5 py-12 mx-auto'>
          <div className='flex flex-col text-left w-full mb-5'>
            <h1 className='sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900'>
              {isEditMode ? "Edit" : "New"} Project
            </h1>
          </div>
          <div className='mx-auto'>
            <div className='flex flex-wrap -m-2'>
              <div className='p-2 w-1/3'>
                <div className='relative'>
                  <label
                    htmlFor='name'
                    className='leading-7 text-sm text-gray-600'
                  >
                    Title
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='title'
                    className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-${props.theme}-500 focus:bg-white focus:ring-2 focus:ring-${props.theme}-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
                    onChange={changeValue}
                    value={projectDetails.title}
                  />
                </div>
              </div>
              <div className='p-2 w-1/3'>
                <div className='relative'>
                  <label
                    htmlFor='prod-ver'
                    className='leading-7 text-sm text-gray-600'
                  >
                    Production version #
                  </label>
                  <input
                    type='text'
                    id='prod-ver'
                    name='prodVersion'
                    value={projectDetails.prodVersion}
                    className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-${props.theme}-500 focus:bg-white focus:ring-2 focus:ring-${props.theme}-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
                    onChange={changeValue}
                  />
                </div>
              </div>

              <div className='p-2 w-1/3'>
                <div className='relative'>
                  <label
                    htmlFor='stag-ver'
                    className='leading-7 text-sm text-gray-600'
                  >
                    Stagging version #
                  </label>
                  <input
                    type='text'
                    id='stag-ver'
                    name='stagVersion'
                    value={projectDetails.stagVersion}
                    className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-${props.theme}-500 focus:bg-white focus:ring-2 focus:ring-${props.theme}-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
                    onChange={changeValue}
                  />
                </div>
              </div>

              <div className='p-2 w-1/3'>
                <div className='relative'>
                  <label
                    htmlFor='repo'
                    className='leading-7 text-sm text-gray-600'
                  >
                    Vendor
                  </label>
                  <select
                    className='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-${props.theme}-500 focus:bg-white focus:ring-2 focus:ring-${props.theme}-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out'
                    name='vendor'
                    value={projectDetails.vendor}
                    onChange={changeValue}
                  >
                    {vendors &&
                      vendors.map((vendor) => {
                        return (
                          <option value={vendor.id} key={vendor.id.toString()}>
                            {vendor.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>

              <div className='p-2 w-1/3'>
                <div className='relative'>
                  <label
                    htmlFor='email'
                    className='leading-7 text-sm text-gray-600'
                  >
                    Category
                  </label>
                  <select
                    className='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-${props.theme}-500 focus:bg-white focus:ring-2 focus:ring-${props.theme}-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out'
                    name='projectType'
                    value={projectDetails.projectType}
                    onChange={changeValue}
                  >
                    <option value=''>Select category</option>
                    <option value='dog'>Dog</option>
                    <option value='cat'>Cat</option>
                    <option value='hamster'>Hamster</option>
                    <option value='parrot'>Parrot</option>
                    <option value='spider'>Spider</option>
                    <option value='goldfish'>Goldfish</option>
                  </select>{" "}
                </div>
              </div>
              <div className='p-2 w-1/3'>
                <div className='relative'>
                  <label
                    htmlFor='repo'
                    className='leading-7 text-sm text-gray-600'
                  >
                    Repo Link
                  </label>
                  <input
                    type='text'
                    id='repo'
                    name='repoLink'
                    value={projectDetails.repoLink}
                    className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-${props.theme}-500 focus:bg-white focus:ring-2 focus:ring-${props.theme}-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
                    onChange={changeValue}
                  />
                </div>
              </div>

              <div className='p-2 w-full'>
                <div className='relative'>
                  <label
                    htmlFor='details'
                    className='leading-7 text-sm text-gray-600'
                  >
                    Details
                  </label>
                  <textarea
                    id='details'
                    name='details'
                    value={projectDetails.details}
                    className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-${props.theme}-500 focus:bg-white focus:ring-2 focus:ring-${props.theme}-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out`}
                    onChange={changeValue}
                  ></textarea>
                </div>
              </div>
              <div className='p-2 w-full flex justify-end'>
                <button
                  onClick={submit}
                  className={`flex text-white bg-${props.theme}-500 border-0 py-2 px-8 focus:outline-none hover:bg-${props.theme}-600 rounded text-lg`}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Project.defaultProps = {
  theme: "indigo",
};

Project.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default Project;
