import {} from 'lucide-react';

const Enquiry = () => {
  const enquiries = [
    {
      enquiry_id: 'bbee38b0-3443-4a2c-9237-f9094c4eb3d4',
      salutation: 'Mr.',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      package_type: 'Economy',
      package_name: 'Umrah Basic',
      contact: '9876543210',
      traveller_date: '2025-05-10',
      total_adults: 2,
      total_children: 1,
      total_infants: 0,
      status: 'Pending',
      created_at: '2025-01-15',
    },
    {
      enquiry_id: 'bbee38b0-3443-4a2c-9237-f9094c4eb3d4',
      salutation: 'Mr.',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      package_type: 'Economy',
      package_name: 'Umrah Basic',
      contact: '9876543210',
      traveller_date: '2025-05-10',
      total_adults: 2,
      total_children: 1,
      total_infants: 0,
      status: 'Approved',
      created_at: '2025-01-15',
    },
    {
      enquiry_id: 'bbee38b0-3443-4a2c-9237-f9094c4eb3d4',
      salutation: 'Mr.',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      package_type: 'Economy',
      package_name: 'Umrah Basic',
      contact: '9876543210',
      traveller_date: '2025-05-10',
      total_adults: 2,
      total_children: 1,
      total_infants: 0,
      status: 'Pending',
      created_at: '2025-01-15',
    },
    {
      enquiry_id: 'bbee38b0-3443-4a2c-9237-f9094c4eb3d4',
      salutation: 'Mr.',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      package_type: 'Economy',
      package_name: 'Umrah Basic',
      contact: '9876543210',
      traveller_date: '2025-05-10',
      total_adults: 2,
      total_children: 1,
      total_infants: 0,
      status: 'Pending',
      created_at: '2025-01-15',
    },
    {
      enquiry_id: 'bbee38b0-3443-4a2c-9237-f9094c4eb3d4',
      salutation: 'Mr.',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      package_type: 'Economy',
      package_name: 'Umrah Basic',
      contact: '9876543210',
      traveller_date: '2025-05-10',
      total_adults: 2,
      total_children: 1,
      total_infants: 0,
      status: 'Rejected',
      created_at: '2025-01-15',
    },
    {
      enquiry_id: 'bbee38b0-3443-4a2c-9237-f9094c4eb3d4',
      salutation: 'Mr.',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      package_type: 'Economy',
      package_name: 'Umrah Basic',
      contact: '9876543210',
      traveller_date: '2025-05-10',
      total_adults: 2,
      total_children: 1,
      total_infants: 0,
      status: 'Pending',
      created_at: '2025-01-15',
    },
    {
      enquiry_id: 'bbee38b0-3443-4a2c-9237-f9094c4eb3d4',
      salutation: 'Mr.',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      package_type: 'Economy',
      package_name: 'Umrah Basic',
      contact: '9876543210',
      traveller_date: '2025-05-10',
      total_adults: 2,
      total_children: 1,
      total_infants: 0,
      status: 'Pending',
      created_at: '2025-01-15',
    },
    {
      enquiry_id: 'bbee38b0-3443-4a2c-9237-f9094c4eb3d4',
      salutation: 'Mr.',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      package_type: 'Economy',
      package_name: 'Umrah Basic',
      contact: '9876543210',
      traveller_date: '2025-05-10',
      total_adults: 2,
      total_children: 1,
      total_infants: 0,
      status: 'Pending',
      created_at: '2025-01-15',
    },
    {
      enquiry_id: 'bbee38b0-3443-4a2c-9237-f9094c4eb3d4',
      salutation: 'Mr.',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      package_type: 'Economy',
      package_name: 'Umrah Basic',
      contact: '9876543210',
      traveller_date: '2025-05-10',
      total_adults: 2,
      total_children: 1,
      total_infants: 0,
      status: 'Pending',
      created_at: '2025-01-15',
    },
    {
      enquiry_id: 'bbee38b0-3443-4a2c-9237-f9094c4eb3d4',
      salutation: 'Mr.',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      package_type: 'Economy',
      package_name: 'Umrah Basic',
      contact: '9876543210',
      traveller_date: '2025-05-10',
      total_adults: 2,
      total_children: 1,
      total_infants: 0,
      status: 'Pending',
      created_at: '2025-01-15',
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'text-green-800 bg-green-100 border border-green-600 ';
      case 'Rejected':
        return 'text-red-600 border border-red-600 bg-red-100';
      default:
        return 'text-yellow-800 bg-yellow-100 border border-yellow-600';
    }
  };

  return (
    <div className="w-full p-4 sm:p-6">
      <h1 className="text-xl font-semibold mb-4">Umrah Enquiry Records</h1>
      <div className="grid grid-rows-2 gap-5">
        <div
          className="grid gap-1 w-full bg-darkgreen shadow-lg rounded-lg row-span-full text-center text-peach text-md font-zodiak p-2"
          style={{ gridTemplateColumns: 'repeat(21, minmax(0, 1fr))' }}
        >
          <div className="py-2 px-2 col-span-2">Enquiry ID</div>
          <div className="py-2 px-2 col-span-2">Name</div>
          <div className="py-2 px-2 col-span-2">Email</div>
          <div className="py-2 px-2 col-span-2">Contact</div>
          <div className="py-2 px-2 col-span-2">Package</div>
          <div className="py-2 px-2 col-span-2">Total Person</div>
          <div className="py-2 px-2 col-span-3 text-center">Traveller Date</div>
          <div className="py-2 px-2 col-span-2">Status</div>
          <div className="py-2 px-2 col-span-2">Created At</div>
          <div className="py-2 px-2 col-span-2">Action</div>
        </div>
        {/*  */}
        <div className="rounded-xl flex flex-col gap-3 w-full  ">
          {enquiries.map((e, i) => {
            return (
              <div
                key={i}
                className="grid gap-1 hover:bg-darkgreen/5 shadow-lg rounded-md bg-peach/30 text-darkgreen text-center text-xs font-jakarta p-2"
                style={{ gridTemplateColumns: 'repeat(21, minmax(0, 1fr))' }}
              >
                <div className="py-2 px-2 col-span-2">
                  <span key={i}>{e.enquiry_id}</span>
                </div>
                <div className="py-2 px-2 col-span-2">
                  <span key={i}>{`${e.first_name} ${e.last_name}`}</span>
                </div>
                <div className="py-2 px-2 col-span-2 break-all">
                  <span key={i}>{e.email}</span>
                </div>
                <div className="py-2 px-2 col-span-2">
                  <span key={i}>{e.contact}</span>
                </div>
                <div className="py-2 px-2 col-span-2">
                  <span key={i}>
                    {e.package_name} ({e.package_type})
                  </span>
                </div>
                <div className="py-2 px-2 col-span-2 flex flex-col gap-1 justify-start items-center">
                  <>
                    <span> Adults({e.total_adults})</span>
                    <span>
                      Children(
                      {e.total_children})
                    </span>
                    <span>
                      Infants(
                      {e.total_infants})
                    </span>
                    <span className="font-bold text-sm">
                      {' '}
                      Total:{' '}
                      {e.total_adults + e.total_children + e.total_infants}
                    </span>
                  </>
                </div>
                <div className="py-2 px-2 col-span-3 text-center">
                  <span key={i}>{e.traveller_date}</span>
                </div>
                <div className="py-2 px-2 col-span-2">
                  <span
                    className={`px-4 py-1 rounded-lg border text-sm ${getStatusClass(e.status)}`}
                    key={i}
                  >
                    {e.status}
                  </span>
                </div>
                <div className="py-2 px-2 col-span-2">
                  <span key={i}>{e.created_at}</span>
                </div>
                <div className="py-2 px-2 col-span-2">
                  <span key={i}>{`Action`}</span>
                </div>
              </div>
            );
          })}
          {/*  */}
        </div>
      </div>
    </div>
  );
};

export default Enquiry;

// <div className="w-full font-jakarta grid grid-cols-10 hover:bg-darkgreen/5">
//             {enquiries.map((enquiry) => (
//               <div
//                 key={enquiry.enquiry_id}
//                 className="flex   text-darkgreen text-sm p-2 "
//               >
//                 <div className="py-2 px-2        ">{enquiry.enquiry_id}</div>
//                 <div className="py-2 px-2      ">
//                   {enquiry.first_name} {enquiry.last_name}
//                 </div>
//                 <div className="py-2 px-2       ">{enquiry.email}</div>
//                 <div className="py-2 px-2      ">{enquiry.contact}</div>
//                 <div className="py-2 px-2      ">
//                   {enquiry.package_name} ({enquiry.package_type})
//                 </div>
//                 <div className="py-2 px-2   flex flex-col     ">
//                   <span>
//                     {' '}
//                     Adults({enquiry.total_adults}) Children(
//                     {enquiry.total_children})
//                   </span>{' '}
//                   <span>
//                     Infants(
//                     {enquiry.total_infants})
//                   </span>
//                   <span className="text-md font-bold">
//                     {' '}
//                     Total:{' '}
//                     {enquiry.total_adults +
//                       enquiry.total_children +
//                       enquiry.total_infants}
//                   </span>
//                 </div>
//                 <div className="py-2 px-2      ">{enquiry.traveller_date}</div>
//                 <div className="py-2 px-2   ">
//                   <span
//                     className={`px-2 py-1 rounded-xl border text-sm ${getStatusClass(enquiry.status)}`}
//                   >
//                     {enquiry.status}
//                   </span>
//                 </div>
//                 <div className="py-2 px-2">{enquiry.created_at}</div>
//                 <div className="py-2 px-2">Action</div>
//               </div>
//             ))}
//           </div>
