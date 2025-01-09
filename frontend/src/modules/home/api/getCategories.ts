
const dummyCategories = [
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'blog', label: 'Blog' },
]

export const getCategories = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return dummyCategories;
}
