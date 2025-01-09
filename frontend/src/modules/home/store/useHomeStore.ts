import { create } from 'zustand';
import { HomeFormValues, ICustomerDetailsFormValues } from '../types';

interface HomeStore {
  formValues: HomeFormValues;
  setFormValues: (values: HomeFormValues) => void;
  customerDetails: ICustomerDetailsFormValues | null;
  setCustomerDetails: (values: ICustomerDetailsFormValues) => void;
}

export const useHomeStore = create<HomeStore>((set) => ({
  formValues: {
    category: '',
    prompt: '',
    selectedTemplate: null,
    uploadedImages: null,
  },
  customerDetails: null,
  setFormValues: (values: HomeFormValues) => set({ formValues: values }),
  setCustomerDetails: (values: ICustomerDetailsFormValues) => set({ customerDetails: values }),
}));
