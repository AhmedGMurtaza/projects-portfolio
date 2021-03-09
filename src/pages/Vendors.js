import React, { useState } from "react";
import PropTypes from "prop-types";
import firebase from "../firebase";

function Vendors(props) {
  const db = firebase.firestore();
  const [allVendors, setAllVendors] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentVendor, setCurrentVendor] = useState({
    name: "",
    country: "",
    email: "",
  });

  const submitVendor = () => {
    const vendorCol = db.collection("vendors");
    vendorCol.add({
      ...currentVendor,
    });
    // empty all fields
    setCurrentVendor({ name: "", country: "", email: "" });
    // fetch table data
    fetchVendors();
  };

  // fetch vendors
  React.useEffect(() => {
    fetchVendors();
  }, [db]);

  async function fetchVendors() {
    const vendorsData = await db.collection("vendors").get();
    const data = await vendorsData.docs.map((doc) => {
      return { ...doc.data(), id: doc.id };
    });
    setAllVendors([...data]);
    setLoading(false);
  }

  // change input in name/email/country fields
  const updateCurrentVendor = (e) => {
    setCurrentVendor({
      ...currentVendor,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <section className='text-gray-600 body-font relative'>
      <div className='container px-5 pt-10 pb-5 mx-auto'>
        <h2 className='pl-10 text-gray-900 text-2xl mb-4 font-medium title-font'>
          Vendors
        </h2>
      </div>

      <div className='container px-5 pb-5 mx-auto flex sm:flex-nowrap flex-wrap'>
        <div className='lg:w-2/3 md:w-1/2  overflow-hidden sm:mr-10 p-10  relative'>
          {isLoading ? (
            "Loading..."
          ) : (
            <table className='table-auto w-full text-left whitespace-no-wrap'>
              <thead>
                <tr>
                  <th className='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>
                    Name
                  </th>
                  <th className='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>
                    Country
                  </th>
                  <th className='px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100'>
                    Email
                  </th>
                  <th className='w-10 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tr rounded-br'></th>
                </tr>
              </thead>
              <tbody>
                {allVendors.map((vendor, index) => {
                  let i = index;
                  return (
                    <tr key={vendor.id}>
                      <td key={vendor.name + "" + i++}>{vendor.name}</td>
                      <td key={vendor.email + "" + i++} className='text-sm'>
                        {vendor.email}
                      </td>
                      <td key={vendor.country + "" + i++}>{vendor.country}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <div className='lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0'>
          <h2 className='text-gray-900 text-lg mb-1 font-medium title-font'>
            New Vendor
          </h2>
          <div className='relative mb-4'>
            <label htmlFor='name' className='leading-7 text-sm text-gray-600'>
              Name
            </label>
            <input
              type='text'
              name='name'
              className={`w-full bg-white rounded border border-gray-300 focus:border-${props.theme}-500 focus:ring-2 focus:ring-${props.theme}-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
              onChange={updateCurrentVendor}
            />
          </div>
          <div className='relative mb-4'>
            <label htmlFor='email' className='leading-7 text-sm text-gray-600'>
              Email
            </label>
            <input
              type='email'
              name='email'
              className={`w-full bg-white rounded border border-gray-300 focus:border-${props.theme}-500 focus:ring-2 focus:ring-${props.theme}-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
              onChange={updateCurrentVendor}
            />
          </div>
          <div className='relative mb-4'>
            <label
              htmlFor='message'
              className='leading-7 text-sm text-gray-600'
            >
              Country
            </label>
            <input
              type='text'
              name='country'
              className={`w-full bg-white rounded border border-gray-300 focus:border-${props.theme}-500 focus:ring-2 focus:ring-${props.theme}-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
              onChange={updateCurrentVendor}
            />
          </div>
          <button
            className={`text-white bg-${props.theme}-500 border-0 py-2 px-6 focus:outline-none hover:bg-${props.theme}-600 rounded text-lg`}
            onClick={() => submitVendor()}
          >
            Add Vendor
          </button>
        </div>
      </div>
    </section>
  );
}

Vendors.defaultProps = {
  theme: "indigo",
};

Vendors.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default Vendors;
