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
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'text-green-800 bg-green-100 border border-green-600 ';
      case 'Rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-yellow-800 bg-yellow-100 border border-yellow-600';
    }
  };

  return (
    <div className="p-4 sm:p-6 ">
      <h1 className="text-xl font-semibold mb-4">Umrah Enquiry Records</h1>
      <div className="shadow-xl bg-peach/30 border ">
        <div className="rounded-xl">
          <div className=" flex  bg-darkgreen text-peach text-md font-zodiak p-2">
            <div className="py-2 px-2  w-52 text-center">Enquiry ID</div>
            <div className="py-2 px-2  w-32 text-center">Name</div>
            <div className="py-2 px-2  w-52 text-center">Email</div>
            <div className="py-2 px-2  w-32 text-center">Contact</div>
            <div className="py-2 px-2  w-32 text-center">Package</div>
            <div className="py-2 px-2  w-32 text-center ">Total Person</div>
            <div className="py-2 px-2  w-36 text-center">Traveller Date</div>
            <div className="py-2 px-2  w-32 text-center">Status</div>
            <div className="py-2 px-2  w-32 text-center">Created At</div>
          </div>
          <div className="font-jakarta">
            {enquiries.map((enquiry) => (
              <div
                key={enquiry.enquiry_id}
                className="flex  hover:bg-darkgreen/5 text-darkgreen text-sm p-2 "
              >
                <div className="py-2 px-2 w-52 text-center ">
                  {enquiry.enquiry_id}
                </div>
                <div className="py-2 px-2 w-32 text-center">
                  {enquiry.first_name} {enquiry.last_name}
                </div>
                <div className="py-2 px-2 w-52 text-center">
                  {enquiry.email}
                </div>
                <div className="py-2 px-2 w-32 text-center">
                  {enquiry.contact}
                </div>
                <div className="py-2 px-2 w-32 text-center">
                  {enquiry.package_name} ({enquiry.package_type})
                </div>
                <div className="py-2 px-2 w-32 flex flex-col text-center ">
                  <span>
                    {' '}
                    Adults({enquiry.total_adults}) Children(
                    {enquiry.total_children})
                  </span>{' '}
                  <span>
                    Infants(
                    {enquiry.total_infants})
                  </span>
                  <span className="text-md font-bold">
                    {' '}
                    Total:{' '}
                    {enquiry.total_adults +
                      enquiry.total_children +
                      enquiry.total_infants}
                  </span>
                </div>
                <div className="py-2 px-2 w-32 text-center">
                  {enquiry.traveller_date}
                </div>
                <div className="py-2 px-2 w-32 ">
                  <span
                    className={`px-2 py-1 rounded-xl border text-sm r  ${getStatusClass(enquiry.status)}`}
                  >
                    {enquiry.status}
                  </span>
                </div>
                <div className="py-2 px-2 w-32 text-center">
                  {enquiry.created_at}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enquiry;
