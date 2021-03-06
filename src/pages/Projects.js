import React, { useState } from "react";
import PropTypes from "prop-types";

function Projects(props) {
  return (
    <section className='text-gray-600 body-font'>
      <div className='container px-5 py-24 mx-auto'>
        <div className='flex flex-wrap -m-4'>
          <div className='p-4 md:w-1/3'>
            <div className='h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden'>
              <img
                className='lg:h-25 md:h-24 w-full object-cover object-center'
                src='https://dummyimage.com/720x400'
                alt='blog'
              />
              <div className='p-6'>
                <h2 className='tracking-widest text-xs title-font font-medium text-gray-400 mb-1'>
                  VENDOR
                </h2>
                <h1 className='title-font text-lg font-medium text-gray-900 mb-2'>
                  Asiacell Frontend App
                </h1>
                <p className='leading-relaxed text-gray-400 text-sm'>
                  Production#: v2.3.4
                </p>
                <p className='leading-relaxed mb-2 text-gray-400 text-sm'>
                  Stagging#: v2.2.4
                </p>
                <div className='flex items-center justify-end flex-wrap '>
                  <a
                    href
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
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='p-4 md:w-1/3'>
            <div className='h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden'>
              <img
                className='lg:h-25 md:h-24 w-full object-cover object-center'
                src='https://dummyimage.com/720x400'
                alt='blog'
              />
              <div className='p-6'>
                <h2 className='tracking-widest text-xs title-font font-medium text-gray-400 mb-1'>
                  VENDOR
                </h2>
                <h1 className='title-font text-lg font-medium text-gray-900 mb-2'>
                  Asiacell Frontend App
                </h1>
                <p className='leading-relaxed text-gray-400 text-sm'>
                  Production#: v2.3.4
                </p>
                <p className='leading-relaxed mb-2 text-gray-400 text-sm'>
                  Stagging#: v2.2.4
                </p>
                <div className='flex items-center justify-end flex-wrap '>
                  <a
                    href
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
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='p-4 md:w-1/3'>
            <div className='h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden'>
              <img
                className='lg:h-25 md:h-24 w-full object-cover object-center'
                src='https://dummyimage.com/720x400'
                alt='blog'
              />
              <div className='p-6'>
                <h2 className='tracking-widest text-xs title-font font-medium text-gray-400 mb-1'>
                  VENDOR
                </h2>
                <h1 className='title-font text-lg font-medium text-gray-900 mb-2'>
                  Asiacell Frontend App
                </h1>
                <p className='leading-relaxed text-gray-400 text-sm'>
                  Production#: v2.3.4
                </p>
                <p className='leading-relaxed mb-2 text-gray-400 text-sm'>
                  Stagging#: v2.2.4
                </p>
                <div className='flex items-center justify-end flex-wrap '>
                  <a
                    href
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
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Projects.defaultProps = {
  theme: "indigo",
};

Projects.propTypes = {
  theme: PropTypes.string.isRequired,
};

export default Projects;
