const ContactPage = () => {
  // *********************form fields********************
  // model EnquiryContact {
  //   enquiry_id String   @id @default(uuid())
  //   user       User?    @relation(fields: [user_id], references: [registration_id], onDelete: Cascade)
  //   user_id    String?
  //   salutation String
  //   first_name String
  //   last_name  String
  //   email      String
  //   contact    String
  //   message    String
  //   status     Status   @default(Pending)
  //   created_at DateTime @default(now())
  // }

  return (
    <div className="main-div w-full h-full flex bg-peach/20 ">
      {/* <div className="child-1 w-[80%] h-screen"></div> */}
      <div className="child-1 w-[80%] h-screen flex flex-col justify-center items-center relative ">
        <h2 className="text-4xl font-bold mb-4 font-zodiak">
          Get in <span className="text-darkgreen">Touch</span>
        </h2>
        <form className="space-y-4 w-1/2 font-jakarta">
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 rounded-lg text-gray-800 border border-transparent focus:border-white focus:outline-none"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg text-gray-800 border border-transparent focus:border-white focus:outline-none"
            />
          </div>
          <div>
            <input
              type="tel"
              placeholder="Phone number"
              className="w-full p-3 rounded-lg text-gray-800 border border-transparent focus:border-white focus:outline-none"
            />
          </div>
          <div>
            <select className="w-full p-3 rounded-lg text-gray-800 border border-transparent focus:border-white focus:outline-none">
              <option>Send Message</option>
              <option>Feedback</option>
              <option>Support</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-white text-green-500 font-semibold py-3 rounded-lg hover:bg-gray-200 transition"
          >
            SEND
          </button>
        </form>
        <div className="mt-6 space-y-2 text-darkgreen font-zodiak">
          <p>
            <strong>PHONE:</strong> 03 5432 1234
          </p>
          <p>
            <strong>FAX:</strong> 03 5432 1234
          </p>
          <p>
            <strong>EMAIL:</strong> info@marc.com.au
          </p>
        </div>
      </div>
      {/* Right Section with Map */}
      <div className="w-1/4 md:w-1/4 h-3/4 absolute top-[13rem] left-[58rem]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.9747598538665!2d72.8610838!3d19.2834638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b119ab9768ab%3A0x28e07076397e4fff!2sMemon%20Haj%20Umrah%20Tours%20And%20Travels!5e0!3m2!1sen!2sin!4v1737455011092!5m2!1sen!2sin"
          width="100%"
          height="100%"
          className="rounded-r-lg h-full"
          allowFullScreen=""
          loading="lazy"
          title="Map"
        ></iframe>
      </div>
      <div className="child-2 bg-darkgreen h-screen w-[30%] my-2 "></div>
    </div>
  );
};

export default ContactPage;
