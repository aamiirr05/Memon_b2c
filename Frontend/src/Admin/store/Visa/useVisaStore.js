import { create } from 'zustand';

const useVisaStore = create((set) => ({
  getVisa: [''],
  loading: true,
  isCreating: false,
  isUpdating: false,
  isModalOpen: false,

  setVisa: (visa) => set({ getVisa: visa }),
  setIsModalOpen: (status) => set({ isModalOpen: status }),
  setIsUpdating: (status) => set({ isUpdating: status }),
  setLoading: (status) => set({ loading: status }),
  setIsCreating: (status) => set({ isCreating: status }),

  bookingterms : [  
    "All visa applications must be submitted with complete and accurate documents.",  
    "Visa processing time may vary based on embassy regulations and public holidays.",  
    "Full payment is required at the time of application submission.",  
    "Visa approval is at the sole discretion of the respective embassy or consulate.",  
    "Once the visa application is submitted, modifications or cancellations may not be possible.",  
    "Additional documents may be requested by the embassy at any stage of processing.",  
    "The applicant is responsible for verifying visa validity, travel restrictions, and entry requirements.",  
    "Visa fees are non-refundable, regardless of approval or rejection.",  
    "Memon Haj Umrah Tours and Travels is not liable for any visa rejection or delays by the embassy.",  
    "Applicants must comply with the immigration rules of the destination country.",  
    "OTB (OK to Board) approval, if required, must be arranged before travel.",  
    "Any fines or penalties due to overstaying or visa violations are the applicant’s responsibility.",  
    "Some countries may require biometrics or an in-person appointment; applicants must comply accordingly.",  
    "Visa extensions, if available, must be arranged before the visa expiry date.",  
    "Transit visas may be required for layovers in certain countries; applicants must check before travel.",  
    "Travel insurance may be mandatory for some visa types and is recommended for all travelers.",  
    "Memon Haj Umrah Tours and Travels is not responsible for airline boarding denials due to visa issues.",  
    "Embassy decisions are final, and reapplications may require new fees and documentation.",  
    "Any discrepancies in visa details must be reported immediately after issuance."  
  ],
  cancelpolicy : [  
    "Visa processing fees are non-refundable once the application is submitted.",  
    "Cancellation requests must be made in writing and are subject to approval.",  
    "If the visa application is already under process, no cancellations or refunds will be entertained.",  
    "Visa rejection by the embassy does not qualify for a refund.",  
    "Any additional charges incurred due to incorrect or incomplete documents are non-refundable.",  
    "Changes or cancellations after visa approval are not permitted.",  
    "In case of a delay or additional document request from the embassy, cancellation is not possible.",  
    "Refunds, if applicable, will be processed within 15-30 working days after approval.",  
    "Memon Haj Umrah Tours and Travels is not responsible for cancellations due to unforeseen embassy regulations.",  
    "Any government or embassy-imposed restrictions leading to cancellations will not be eligible for refunds."  
  ],
  termcondition : [  
    "All visa applications are subject to the rules and regulations of the respective embassy or consulate.",  
    "Visa approval and processing time are solely at the discretion of the embassy; delays may occur.",  
    "Applicants must provide accurate and complete documents; incorrect submissions may lead to rejections or delays.",  
    "Visa fees are non-refundable, regardless of approval or rejection.",  
    "Memon Haj Umrah Tours and Travels is not responsible for visa denials, delays, or additional document requests by the embassy.",  
    "OTB (OK to Board) approval, if required, must be arranged before travel; failure to do so may result in boarding denial.",  
    "The applicant is responsible for ensuring visa validity, travel restrictions, and entry requirements.",  
    "Some countries may require biometrics or in-person verification; applicants must comply accordingly.",  
    "Visa extensions, if applicable, must be requested before visa expiry and are subject to approval by the immigration authorities.",  
    "Any fines, penalties, or legal consequences due to visa violations or overstaying are the sole responsibility of the applicant.",  
    "Travel insurance may be mandatory for some visa types and is strongly recommended for all travelers.",  
    "Transit visas may be required for layovers in certain countries; applicants must check before travel.",  
    "Visa issuance does not guarantee entry; final approval remains at the discretion of immigration authorities at the destination.",  
    "Memon Haj Umrah Tours and Travels is not liable for airline boarding denials due to visa-related issues.",  
    "Any discrepancies in visa details must be reported immediately after issuance for necessary corrections.",  
    "Embassy decisions are final, and reapplications may require new documentation and fees.",  
    "Applicants must comply with all health, vaccination, and COVID-19-related travel requirements as mandated by the destination country.",  
    "Any changes in visa regulations by the embassy or government authorities are beyond our control and must be adhered to by applicants.",  
    "By applying for a visa through Memon Haj Umrah Tours and Travels, the applicant agrees to abide by all the terms and conditions stated above."  
  ],
  basicReq : [  
    "Valid passport with at least 6 months validity and 3 blank pages.",  
    "Recent passport-sized photograph in JPEG format.",  
    "Clear scanned copy of PAN card.",  
    "Completed visa application form, if required.",  
    "Additional documents as per embassy requirements.",  
    "100% advance payment per person is required to book your visa.",  
    "Once the visa is applied, the money is non-refundable.",  
    "Some applications may be randomly selected for blacklist checking, which can extend processing time.",  
    "If the visa is rejected, the payment remains non-refundable.",  
    "Visa approval or rejection is solely at the discretion of the embassy; full visa charges must be paid in advance.",  
  ],
  docReq : [  
    "Scanned copy of the first and last pages of the passport in JPEG format (valid for at least 6 months with 3 blank pages).",  
    "Recent passport-sized photograph in JPEG format.",  
    "Clear scanned copy of PAN card.",  
    "Confirmed return air ticket, if required by the embassy.",  
    "Hotel booking confirmation or sponsor details, if applicable.",  
    "Bank statements or financial proof, if required by the embassy.",  
    "No-objection certificate (NOC) from employer or school, if applicable.",  
    "Travel insurance as per embassy requirements.",  
    "Visa application form duly filled and signed.",  
    "Any additional documents as requested by the embassy."  
  ],

  setBookingTerms: (terms) => set(() => ({ bookingterms: terms })),
  updateBookingTerms: (items) => {
    set({ bookingterms: items });
  },
  setCancelPolicy: (policy) => set(() => ({ cancelpolicy: policy })),
  updateCancelPolicy: (policies) => {
    set({ cancelpolicy: policies });
  },
  setTermCondition: (conditions) => set(() => ({ termcondition: conditions })),
  updateTermCondition: (con) => {
    set({ termcondition: con });
  },

  setBasicReq: (req) => set({ basicReq: req }),
  updateBasicReq: (req) => {
    set({ basicReq: req });
  },

  setdocReq: (req) => set({ docReq: req }),
  updateDocReq: (req) => {
    set({ docReq: req });
  },

  addBasicReq: () => set((state) => ({ basicReq: [...state.basicReq, ''] })),

  removeBasicReq: (index) =>
    set((state) => ({
      basicReq: state.basicReq.filter((_, i) => i !== index),
    })),

  addDocReq: () => set((state) => ({ docReq: [...state.docReq, ''] })),

  removeDocReq: (index) =>
    set((state) => ({
      docReq: state.docReq.filter((_, i) => i !== index),
    })),

  addBookingTerms: () =>
    set((state) => ({ bookingterms: [...state.bookingterms, ''] })),
  removeBookingTerms: (index) =>
    set((state) => ({
      bookingterms: state.bookingterms.filter((_, i) => i !== index),
    })),

  addTermsCondition: () =>
    set((state) => ({ termcondition: [...state.termcondition, ''] })),
  removeTermsCondition: (index) =>
    set((state) => ({
      termcondition: state.termcondition.filter((_, i) => i !== index),
    })),

  addPolicy: () =>
    set((state) => ({ cancelpolicy: [...state.cancelpolicy, ''] })),
  removePolicy: (index) =>
    set((state) => ({
      cancelpolicy: state.cancelpolicy.filter((_, i) => i !== index),
    })),
}));

export default useVisaStore;
