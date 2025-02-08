import {
  Compass,
  Landmark,
  Plane,
  BadgeCheck,
  Mail,
  Phone,
} from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="sticky top-16 bg-darkgreen/10 h-[calc(100dvh-64px)] w-72 hidden rounded-2xl md:flex flex-col items-center p-4 text-neutral-700 shadow-lg overflow-y-scroll no-scrollbar">
      <h2 className="text-2xl font-semibold flex items-center gap-2 my-4">
        <Compass className="text-green-600" /> Explore
      </h2>

      <div className="mt-4 space-y-4 w-full">
        {/* Featured Hajj/Umrah Package */}
        <div className="bg-white/50 p-4 rounded-xl shadow-md flex flex-col items-center text-center">
          <Landmark className="text-yellow-500 mb-2" size={28} />
          <h3 className="font-medium text-lg">Hajj & Umrah</h3>
          <p className="text-sm text-neutral-500">Best packages for 2025</p>
        </div>

        {/* Holiday & Hotel Packages */}
        <div className="bg-white/50 p-4 rounded-xl shadow-md flex flex-col items-center text-center">
          <Plane className="text-blue-500 mb-2" size={28} />
          <h3 className="font-medium text-lg">Holiday Packages</h3>
          <p className="text-sm text-neutral-500">Find the perfect getaway</p>
        </div>

        {/* Visa Assistance */}
        <div className="bg-white/50 p-4 rounded-xl shadow-md flex flex-col items-center text-center">
          <BadgeCheck className="text-green-500 mb-2" size={28} />
          <h3 className="font-medium text-lg">Visa Services</h3>
          <p className="text-sm text-neutral-500">
            Hassle-free visa processing
          </p>
        </div>

        {/* Contact Us */}
        <div className="bg-white/50 p-2 rounded-xl shadow-md flex flex-col  text-center border-t pt-4">
          <h3 className="font-medium text-lg flex justify-center items-center gap-2">
            <Mail className="text-red-500" size={20} /> Contact Us
          </h3>
          <p className="text-sm text-neutral-600 flex items-center gap-2 mt-2 font-mono">
            <Phone size={16} className="text-blue-500" /> +123 456 7890
          </p>
          <p className="text-sm text-neutral-600 flex items-center gap-2 font-mono">
            <Mail size={16} className="text-blue-500 shrink-0" />{' '}
            info@yourcompany.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
