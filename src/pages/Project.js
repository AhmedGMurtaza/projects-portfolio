import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";

// form and validation
import { Formik } from "formik";
import * as Yup from "yup";

// firebase
import firebase from "../firebase";
// router
import { useParams } from "react-router-dom";

function Project(props) {
  // db
  const db = firebase.firestore();
  // url param
  const { id } = useParams();

  // states
  const [vendors, setVendors] = useState([]);
  const [isEditMode, setIsEditMode] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [projectValues, setProjectValues] = useState({
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
    setProjectValues({ ...snapshot.data() });
    setLoading(false);
  };

  // Input field value change
  // const handleChange = (event) => {
  //   setProjectValues((prevValues) => ({
  //     ...prevValues,
  //     [event.target.name]: event.target.value,
  //   }));
  // };

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

  const formSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, "Too Short!!")
      .max(50, "Too Long!!")
      .required("Required"),
    prodVersion: Yup.string().min(3, "Must be atleast 3 characters").max(20),
    stagVersion: Yup.string().min(3, "Must be atleast 3 characters").max(20),
    vendor: Yup.string()
      .min(3, "Must be atleast 3 characters")
      .required("Required"),
    projectType: Yup.string().min(3, "Must be atleast 3 characters"),
    repoLink: Yup.string()
      .min(3, "Must be atleast 3 characters")
      .required("Required"),
    details: Yup.string().min(3, "Must be atleast 3 characters"),
    dateCreated: Yup.string()
      .min(3, "Must be atleast 3 characters")
      .required("Required"),
  });

  // save the product
  const onSubmit = async (values) => {
    const projectCollection = await db.collection("projects");
    projectCollection.add({
      ...values,
    });
  };

  if (isLoading) {
    return <p>Loading..</p>;
  } else {
    return (
      <Formik
        initialValues={projectValues}
        validationSchema={formSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <section className='text-left text-gray-600 body-font relative lg:w-8/12'>
              <div className='container px-5 py-12 mx-auto'>
                <div className='flex flex-col text-left w-full mb-5'>
                  <h1 className='sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900'>
                    {isEditMode ? "Edit" : "New"} Project
                  </h1>
                  {JSON.stringify(values)}
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
                          onChange={handleChange}
                          value={values.title}
                        />
                        {errors.title ? (
                          <p className='text-red-600 text-sm'>{errors.title}</p>
                        ) : null}
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
                          value={values.prodVersion}
                          className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-${props.theme}-500 focus:bg-white focus:ring-2 focus:ring-${props.theme}-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
                          onChange={handleChange}
                        />
                        {errors.prodVersion ? (
                          <p className='text-red-600 text-sm'>
                            {errors.prodVersion}
                          </p>
                        ) : null}
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
                          value={values.stagVersion}
                          className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-${props.theme}-500 focus:bg-white focus:ring-2 focus:ring-${props.theme}-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
                          onChange={handleChange}
                        />
                        {errors.stagVersion ? (
                          <p className='text-red-600 text-sm'>
                            {errors.stagVersion}
                          </p>
                        ) : null}
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
                          value={values.vendor}
                          onChange={handleChange}
                        >
                          {vendors &&
                            vendors.map((vendor) => {
                              return (
                                <option
                                  value={vendor.id}
                                  key={vendor.id.toString()}
                                >
                                  {vendor.name}
                                </option>
                              );
                            })}
                        </select>
                        {errors.vendor ? (
                          <p className='text-red-600 text-sm'>
                            {errors.vendor}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className='p-2 w-1/3'>
                      <div className='relative'>
                        <label
                          htmlFor='email'
                          className='leading-7 text-sm text-gray-600'
                        >
                          Project Type
                        </label>
                        <select
                          className='w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-${props.theme}-500 focus:bg-white focus:ring-2 focus:ring-${props.theme}-200 text-base outline-none text-gray-700 py-2 px-3 leading-8 transition-colors duration-200 ease-in-out'
                          name='projectType'
                          value={values.projectType}
                          onChange={handleChange}
                        >
                          <option value=''>Select type</option>
                          <option value='dog'>Dog</option>
                          <option value='cat'>Cat</option>
                          <option value='hamster'>Hamster</option>
                          <option value='parrot'>Parrot</option>
                          <option value='spider'>Spider</option>
                          <option value='goldfish'>Goldfish</option>
                        </select>
                        {errors.projectType ? (
                          <p className='text-red-600 text-sm'>
                            {errors.projectType}
                          </p>
                        ) : null}
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
                          value={values.repoLink}
                          className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-${props.theme}-500 focus:bg-white focus:ring-2 focus:ring-${props.theme}-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
                          onChange={handleChange}
                        />
                        {errors.repoLink ? (
                          <p className='text-red-600 text-sm'>
                            {errors.repoLink}
                          </p>
                        ) : null}
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
                          value={values.details}
                          className={`w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-${props.theme}-500 focus:bg-white focus:ring-2 focus:ring-${props.theme}-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out`}
                          onChange={handleChange}
                        ></textarea>
                        {errors.details ? (
                          <p className='text-red-600 text-sm'>
                            {errors.details}
                          </p>
                        ) : null}
                      </div>
                    </div>
                    <div className='p-2 w-full flex justify-end'>
                      <button
                        type='submit'
                        disabled={isSubmitting}
                        className={`flex text-white bg-${props.theme}-500 border-0 py-2 px-8 focus:outline-none hover:bg-${props.theme}-600 rounded text-lg`}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </form>
        )}
      </Formik>
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
