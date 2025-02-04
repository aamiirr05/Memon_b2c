import { Trash2, X } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import useEnquiryStore from '../store/Enquiry/useEnquiryStore';
import { useState } from 'react';
import ReactPaginate from 'react-paginate';

const EnquiryForex = () => {
  const { forexEnquiry } = useOutletContext();
  const { isUpdating, handleStatus, handleDelete } = useEnquiryStore();

  const totalEnquiry = forexEnquiry?.data?.data.length;

  const approvedEnquiry = forexEnquiry?.data?.data.filter((i) => {
    return i.status == 'Approved';
  });

  const pendingEnquiry = forexEnquiry?.data?.data.filter((i) => {
    return i.status == 'Pending';
  });
  const rejectedEnquiry = forexEnquiry?.data?.data.filter((i) => {
    return i.status == 'Rejected';
  });

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Adjust as needed

  const data = forexEnquiry.data?.data || [];
  const pageCount = Math.ceil(data.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = data.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'text-green-800 bg-green-100 border border-green-900 ';
      case 'Rejected':
        return 'text-red-600 border border-red-900 bg-red-100';
      default:
        return 'text-yellow-800 bg-yellow-100 border border-yellow-900';
    }
  };

  const isPending = (status) => {
    if (status === 'Pending') {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="flex items-center flex-col md:flex-row gap-4 md:gap-0 justify-between">
        <div className="flex items-center gap-2">
          Total Enquiries:<div className="font-semibold">{totalEnquiry}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-emerald-600">
            Approved
            <div className="flex font-semibold w-5 h-5 border border-dashed border-emerald-600 bg-emerald-100  rounded-full items-center justify-center text-xs">
              {approvedEnquiry?.length}
            </div>
          </div>
          <div className="flex items-center gap-2 text-yellow-600">
            Pending
            <div className="flex font-semibold w-5 h-5 border border-dashed border-yellow-600 bg-yellow-100  rounded-full items-center justify-center text-xs">
              {pendingEnquiry?.length}
            </div>
          </div>
          <div className="flex items-center gap-2 text-red-600">
            Rejected
            <div className="flex font-semibold w-5 h-5 border border-dashed border-red-600 bg-red-100  rounded-full items-center justify-center text-xs">
              {rejectedEnquiry?.length}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`overflow-x-scroll lg:overflow-hidden ${isUpdating ? 'blur-sm pointer-events-none' : 'blur-0 pointer-events-auto'}`}
      >
        <div className="mt-5 relative grid grid-rows-2 gap-5">
          <div
            className=" grid gap-1 w-full bg-darkgreen shadow-lg rounded-lg row-span-full text-center text-peach text-md font-zodiak p-2 grid-cols-[repeat(21,minmax(70px,1fr))] lg:grid-cols-[repeat(19,minmax(0,1fr))]"
            // style={{ gridTemplateColumns: 'repeat(21, minmax(0, 1fr))' }}
          >
            <div className="py-2 px-2 col-span-2">Enquiry ID</div>
            <div className="py-2 px-2 col-span-2">Name</div>
            <div className="py-2 px-2 col-span-2">Email</div>
            <div className="py-2 px-2 col-span-2">Contact</div>
            {/* <div className="py-2 px-2 col-span-2">Package</div> */}
            <div className="py-2 px-2 col-span-2">Amount Req</div>
            <div className="py-2 px-2 col-span-3 ">Address</div>
            <div className="py-2 px-2 col-span-2">Status</div>
            <div className="py-2 px-2 col-span-2">Created At</div>
            <div className="py-2 px-2 col-span-2">Action</div>
          </div>
          {/*  */}
          <div className="rounded-xl flex flex-col gap-3 w-full  ">
            {forexEnquiry.data && !forexEnquiry?.data?.data.length == 0 ? (
              currentItems.map((e, i) => {
                return (
                  <div
                    key={i}
                    className="grid gap-1 hover:bg-darkgreen/5 shadow-lg rounded-md bg-peach/30 text-darkgreen text-center text-xs font-jakarta p-2 grid-cols-[repeat(21,minmax(70px,1fr))] lg:grid-cols-[repeat(19,minmax(0,1fr))]"
                    // style={{ gridTemplateColumns: 'repeat(21, minmax(0, 1fr))' }}
                  >
                    <div className="py-2 px-2 col-span-2">
                      <span>{e.enquiry_id}</span>
                    </div>
                    <div className="py-2 px-2 col-span-2">
                      <span className="flex gap-2">
                        {' '}
                        <p className="font-bold">{e.salutation}</p>
                        {`${e.first_name} ${e.last_name}`}
                      </span>
                    </div>
                    <div className="py-2 px-2 col-span-2 break-all">
                      <span>{e.email}</span>
                    </div>
                    <div className="py-2 px-2 col-span-2">
                      <span>{e.contact}</span>
                    </div>

                    <div className="py-2 px-2 col-span-2 flex flex-col gap-1 justify-start items-center">
                      <>
                        <span className="font-semibold">
                          {e.amount_required}
                        </span>
                      </>
                    </div>
                    <div className="py-2 px-2 col-span-3 ">
                      <span>{e.address}</span>
                    </div>
                    <div className="py-2 px-2 flex flex-col items-center justify-center col-span-2">
                      <span
                        className={`px-4 py-1 rounded-lg border text-sm ${getStatusClass(e.status)}`}
                      >
                        {e.status}
                      </span>
                    </div>
                    <div className="py-2 px-2 col-span-2">
                      <span>{new Date(e.created_at).toDateString()}</span>
                    </div>
                    <div className="py-2 px-2 col-span-2 flex flex-col justify-center items-center ">
                      {isPending(e.status) ? (
                        <>
                          <div className="flex items-center gap-3 justify-center">
                            <span
                              onClick={() => {
                                handleStatus(
                                  'update-forex-enquiry',
                                  'Rejected',
                                  e.enquiry_id,
                                  forexEnquiry.refresh
                                );
                              }}
                              className="cursor-pointer text-red-600"
                            >
                              <X size={25} />
                            </span>
                            <span
                              onClick={() => {
                                handleDelete(
                                  'delete-forex-enquiry',
                                  e.enquiry_id,
                                  forexEnquiry.refresh
                                );
                              }}
                              className="cursor-pointer text-red-600"
                            >
                              <Trash2 size={20} />
                            </span>
                          </div>
                          <span
                            onClick={() => {
                              handleStatus(
                                'update-forex-enquiry',
                                'Approved',
                                e.enquiry_id,
                                forexEnquiry.refresh
                              );
                            }}
                            className="py-2 font-medium px-3 my-2 rounded-lg border border-darkgreen bg-green-100 cursor-pointer hover:bg-green-700 hover:text-peach"
                          >
                            Approve
                          </span>
                        </>
                      ) : (
                        <div className="flex flex-col gap-3 items-center">
                          <span
                            onClick={() => {
                              handleDelete(
                                'delete-forex-enquiry',
                                e.enquiry_id,
                                forexEnquiry.refresh
                              );
                            }}
                            className="cursor-pointer text-red-600"
                          >
                            <Trash2 size={20} />
                          </span>
                          <span
                            className={`px-4 py-1 rounded-lg border text-sm ${getStatusClass(e.status)}`}
                            key={i}
                          >
                            {e.status}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : forexEnquiry?.data?.data.length == 0 ? (
              <div className="text-3xl font-zodiak opacity-50 mt-32 flex items-center justify-center">
                No Enquiries found
              </div>
            ) : (
              Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="grid gap-1 hover:bg-darkgreen/5 shadow-lg rounded-md bg-peach/30 text-darkgreen text-center text-xs font-jakarta p-2 grid-cols-[repeat(21,minmax(70px,1fr))] lg:grid-cols-[repeat(21,minmax(0,1fr))]"
                  // style={{ gridTemplateColumns: 'repeat(21, minmax(0, 1fr))' }}
                >
                  <div className="py-2 px-2 col-span-2">
                    <div className="bg-gray-300 rounded-md animate-pulse p-3"></div>
                  </div>
                  <div className="py-2 px-2 col-span-2">
                    <div className="bg-gray-300 rounded-md animate-pulse p-3"></div>
                  </div>
                  <div className="py-2 px-2 col-span-2 break-all">
                    <div className="bg-gray-300 rounded-md animate-pulse p-3"></div>
                  </div>
                  <div className="py-2 px-2 col-span-2">
                    <div className="bg-gray-300 rounded-md animate-pulse p-3"></div>
                  </div>
                  <div className="py-2 px-2 col-span-2">
                    <div className="bg-gray-300 rounded-md animate-pulse p-3"></div>
                  </div>
                  <div className="py-2 px-2 col-span-2 flex flex-col gap-1 justify-start items-center bg-gray-300 rounded-md animate-pulse p-3">
                    <></>
                  </div>
                  <div className="py-2 px-2 col-span-3 ">
                    <div className="bg-gray-300 rounded-md animate-pulse p-3"></div>
                  </div>
                  <div className="py-2 px-2 flex flex-col items-center justify-center col-span-2">
                    <div className="bg-gray-300 rounded-md animate-pulse p-3 w-full"></div>
                  </div>
                  <div className="py-2 px-2 col-span-2">
                    <div className="bg-gray-300 rounded-md animate-pulse p-3"></div>
                  </div>
                  <div className="py-2 px-2 col-span-2 flex gap-2 flex-col justify-center items-center ">
                    {forexEnquiry ? (
                      <>
                        <div className="flex items-center justify-center gap-3">
                          <div className="bg-gray-300 rounded-full animate-pulse p-3 w-full"></div>
                          <div className="bg-gray-300 rounded-full animate-pulse p-3 w-full"></div>
                        </div>
                        <div className="bg-gray-300 rounded-md animate-pulse p-3 w-full"></div>
                      </>
                    ) : (
                      <div className="bg-gray-100 rounded-md animate-pulse p-3">
                        gg
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
            {/*  */}
          </div>

          <div className="flex justify-center my-4">
            <ReactPaginate
              previousLabel={'←'}
              nextLabel={'→'}
              breakLabel={'...'}
              pageCount={pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={'flex list-none gap-2'}
              pageClassName={
                'cursor-pointer px-3 py-1 border border-darkgreen rounded-md'
              }
              activeClassName={'bg-darkgreen text-white'}
              previousClassName={
                'cursor-pointer px-3 py-1 border border-darkgreen rounded-md'
              }
              nextClassName={
                'cursor-pointer px-3 py-1 border border-darkgreen rounded-md'
              }
              disabledClassName={'opacity-50 cursor-not-allowed'}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EnquiryForex;
