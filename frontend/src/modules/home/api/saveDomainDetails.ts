import { API_BASE_URL } from '../../../config';

export interface IDomainDetails {
  domain_name: string;
  cust_id: string;
  payment_id: string;
  website_deployed_flag: string;
  website_url: string;
}

export const saveDomainDetails = async (domainDetails: IDomainDetails) => {
  const response = await fetch(`${API_BASE_URL}/customers/domain-details`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...domainDetails,
      domain_id: 'DOMAIN' + Date.now().toString(),
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to save domain details');
  }

  return response.json();
}; 
