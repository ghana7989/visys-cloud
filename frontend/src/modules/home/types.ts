export type ITemplate = {
  id: number;
  image: string;
  name: string;
};
export interface ICategory {
  value: string;
  label: string;
}
export interface HomeFormValues {
  prompt: string;
  category: string;
  selectedTemplate: ITemplate | null;
  uploadedImages: string[] | null;
}

export interface ICustomerDetailsFormValues {
  fullName: string;
  companyName?: string;
  phone: string;
  email: string;
  workingDays?: string;
  workingHours?: string;
  address?: string;
  district?: string;
  state?: string;
  zip?: string;
  country?: string;
  latitude?: string;
  longitude?: string;
  aboutOrganization?: string;
  social?: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
  requireCustomWebsite?: boolean;
}

export interface IPricingPlan {
  name: string;
  price: string;
  period: string;
  features: string[];
  isPopular: boolean;
}
