import { PricingModalContent } from "./modules/home/modals/pricing.modal";
import { DeployWebsiteFormModalContent } from "./modules/home/modals/deploy-website-form.modal";
import { DeployWebsiteSuccessfulModalContent } from "./modules/home/modals/deploy-website-successful.modal";

export const modals = {
  "pricing-modal": PricingModalContent,
  "deploy-website-form-modal": DeployWebsiteFormModalContent,
  "deploy-website-successful-modal": DeployWebsiteSuccessfulModalContent
}

export enum AvailableModals {
  PRICING_MODAL = "pricing-modal",
  DEPLOY_WEBSITE_FORM_MODAL = "deploy-website-form-modal",
  DEPLOY_WEBSITE_SUCCESSFUL_MODAL = "deploy-website-successful-modal"
}
