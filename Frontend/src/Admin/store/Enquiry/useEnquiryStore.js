import { create } from 'zustand';
import axiosInstance from '../../../lib/axios';
import toast from 'react-hot-toast';

const useEnquiryStore = create((set) => ({
  loading: true,
  isUpdating: false,
  setIsUpdating: (val) => set({ isUpdating: val }),

  checkPending: (req) => {
    const pendingreq = req?.data?.data.filter(
      (item) => item.status === 'Pending'
    );
    return pendingreq?.length;
  },

  //   handleApprove: async (id) => {
  //     const loadingToast = toast.loading('Updating Status. Please wait...', {
  //       icon: (
  //         <div className="relative w-10 h-10">
  //           <div className="absolute w-5 h-5 border-4 top-0 animate-spin mx-4 border-peach border-l-darkgreen rounded-full"></div>
  //         </div>
  //       ),
  //       className: 'text-center flex item-center justify-center',
  //     });
  //     set({ isUpdating: true });

  //     try {
  //       const res = await axiosInstance.post(
  //         `admin/enquiry/update-umrah-enquiry/${id}`,
  //         {
  //           status: 'Approved',
  //         }
  //       );

  //       console.log(res);
  //       const msg = res?.data?.message;
  //       toast.dismiss(loadingToast);
  //       toast.success(msg, { autoClose: 5000 });
  //     } catch (error) {
  //       toast.dismiss(loadingToast);

  //       console.log(error);
  //     } finally {
  //       set({ isUpdating: false });
  //     }
  //   },

  handleStatus: async (
    fullname,
    servicename,
    email,
    url,
    status,
    id,
    refresh
  ) => {
    const loadingToast = toast.loading('Updating Status. Please wait...');

    set({ isUpdating: true });

    try {
      const res = await axiosInstance.post(`admin/enquiry/${url}/${id}`, {
        fullname: fullname,
        servicename: `${servicename}`,
        email: email,
        status: `${status}`,
      });

      console.log(res);
      console.log(fullname, servicename, url, status, id, refresh);
      const msg = res?.data?.message;
      toast.dismiss(loadingToast);
      toast.success(msg, { duration: 5000 });
      if (refresh) {
        refresh();
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to update status.');
      console.log(error);
      console.log(fullname, servicename, url, status, id, refresh);
    } finally {
      set({ isUpdating: false }); // Fixed: should set isUpdating to false in finally block
    }
  },

  handleDelete: async (url, id, refresh) => {
    const loadingToast = toast.loading('Deleting Status. Please wait...');

    set({ isUpdating: true });

    try {
      const res = await axiosInstance.delete(`admin/enquiry/${url}/${id}`);

      console.log(res);
      const msg = res?.data?.message;
      toast.dismiss(loadingToast);
      toast.success(msg, { duration: 5000 });
      if (refresh) {
        refresh();
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to delete status.');
      console.log(error);
    } finally {
      set({ isUpdating: false });
    }
  },
}));

export default useEnquiryStore;
