import { templates } from "../data";

export const getTemplates = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return templates;
}
