import { ICustomerDetailsFormValues } from '../types';
import { API_BASE_URL } from '../../../config';

// Transform form data to CustomerDetails model format
export const transformToCustomerDetails = (formData: ICustomerDetailsFormValues) => {
  return {
    company_name: formData.companyName,
    company_desc: formData.aboutOrganization || '',
    contact_name: formData.fullName,
    address1: formData.address,
    address2: null,
    address3: null,
    address4: null,
    address5: null,
    city: formData.district, // Using district as city since we don't have city in form
    district: formData.district,
    zip_code: formData.zip,
    state: formData.state,
    country: formData.country,
    email: formData.email,
    phone_no1: formData.phone,
    phone_no2: null,
    active_flag: 'Y'
  };
};

// Transform form data to CustomerAdditionalDetails model format
export const transformToAdditionalDetails = (formData: ICustomerDetailsFormValues, custId: string) => {
  return {
    cust_id: custId,
    category_id: 'CAT001', // Default values - you might want to make these configurable
    theme_id: 'THM001',
    uiux_id: 'UIUX001',
    cust_working_days: formData.workingDays,
    cust_working_hrs: formData.workingHours,
    instagram_flag: formData.social?.instagram ? 'Y' : 'N',
    whatsapp_flag: 'N', // Not in form
    facebook_flag: formData.social?.facebook ? 'Y' : 'N',
    youtube_flag: formData.social?.youtube ? 'Y' : 'N',
    chatbot_flag: 'N', // Not in form
    google_analytics: 'Y',
    google_map_latitude: formData.latitude || '0',
    google_map_longitude: formData.longitude || '0',
    arg1: formData.requireCustomWebsite ? 'Y' : 'N'
  };
};

// Save customer details and return the customer ID
export const saveCustomerDetails = async (formData: ICustomerDetailsFormValues) => {
  const customerData = transformToCustomerDetails(formData);
  
  const response = await fetch(`${API_BASE_URL}/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customerData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to save customer details');
  }

  const customerResponse = await response.json();
  return customerResponse;
};

// Save additional details using the customer ID from the first call
export const saveAdditionalDetails = async (formData: ICustomerDetailsFormValues, custId: string) => {
  const additionalData = transformToAdditionalDetails(formData, custId);
  
  const response = await fetch(`${API_BASE_URL}/customers/additional-details`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(additionalData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to save additional details');
  }

  return response.json();
}; 
