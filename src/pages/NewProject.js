import React, { useState } from "react";
import PropTypes from "prop-types";
import firebase from "../firebase";

function NewProject(props) {
  const db = firebase.firestore();
  const { vendors, setVendors } = useState([]);
  const { projectDetails, setProjectDetails } = useState({
    title: "",
    vendorId: "",
    date_created: "",
    projectType: "", //mobile app/web app
    teamMembers: [],
    repoLink: "",
    latestBuildTag: "",
  });

  // save the product
  React.useEffect(() => {
    const submitProduct = async () => {
      const projectCol = db.collection("projects");
      await projectCol.doc(new Date().toString()).set({
        ...projectDetails,
      });
    };
    submitProduct();
  }, []);

  // fetch vendors
  React.useEffect(() => {
    async function fetchVendors() {
      const vendorsData = await db.collection("vendors").get();
      setVendors(
        vendorsData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    }
    fetchVendors();
  }, []);

  return (
    <section className='text-left text-gray-600 body-font relative lg:w-8/12'>
      <div className='container px-5 py-12 mx-auto'>
        <div className='flex flex-col text-left w-full mb-5'>
          <h1 className='sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900'>
            New Project
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
                  name='name'
                  className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-${props.theme}-500 focus:bg-white focus:ring-2 focus:ring-${props.theme}-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
                />
              </div>
            </div>
            <div className='p-2 w-1/3'>
              <div className='relative'>
                <label
                  htmlFor='name'
                  className='leading-7 text-sm text-gray-600'
                >
                  Production version #
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-${props.theme}-500 focus:bg-white focus:ring-2 focus:ring-${props.theme}-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
                />
              </div>
            </div>

            <div className='p-2 w-1/3'>
              <div className='relative'>
                <label
                  htmlFor='name'
                  className='leading-7 text-sm text-gray-600'
                >
                  Stagging version #
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-${props.theme}-500 focus:bg-white focus:ring-2 focus:ring-${props.theme}-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
                />
              </div>
            </div>

            <div className='p-2 w-1/3'>
              <div className='relative'>
                <label
                  htmlFor='name'
                  className='leading-7 text-sm text-gray-600'
                >
                  Vendor
                </label>
                <select
                  class='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-${props.theme}-500 focus:bg-white focus:ring-2 focus:ring-${props.theme}-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out'
                  name='vendors'
                >
                  {vendors.map((vendor) => {
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
                  class='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-${props.theme}-500 focus:bg-white focus:ring-2 focus:ring-${props.theme}-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out'
                  name='animals'
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
                  htmlFor='name'
                  className='leading-7 text-sm text-gray-600'
                >
                  Repo Link
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-${props.theme}-500 focus:bg-white focus:ring-2 focus:ring-${props.theme}-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
                />
              </div>
            </div>

            <div className='p-2 w-full'>
              <div className='relative'>
                <label
                  htmlFor='message'
                  className='leading-7 text-sm text-gray-600'
                >
                  Details
                </label>
                <textarea
                  id='message'
                  name='message'
                  className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-${props.theme}-500 focus:bg-white focus:ring-2 focus:ring-${props.theme}-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out`}
                ></textarea>
              </div>
            </div>
            <div className='p-2 w-full flex justify-end'>
              <button
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

NewProject.defaultProps = {
  theme: "indigo",
};

NewProject.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default NewProject;
