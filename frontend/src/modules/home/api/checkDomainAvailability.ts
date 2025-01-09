export const checkDomainAvailability = async (domain: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Mock response with random availability
  const isAvailable = Math.random() > 0.5;
  
  return {
    status: isAvailable ? 'available' : 'unavailable',
    domain: domain
  };
};
