import express from 'express';
import { customerController } from '../controllers/customer.controller';

const router = express.Router();

// Customer basic details routes
router.post('/', customerController.createCustomer);
router.get('/', customerController.getAllCustomers);

// Customer additional details routes
router.post('/additional-details', customerController.createCustomerAdditionalDetails);

// Customer browse upload images routes
router.post('/browse-upload-images', customerController.createBrowseUploadImages);
router.get('/browse-upload-images/:cust_id', customerController.getBrowseUploadImages);

// Customer mobile upload images routes
router.post('/mobile-upload-images', customerController.createMobileUploadImages);
router.get('/mobile-upload-images/:cust_id', customerController.getMobileUploadImages);

// Customer payment details routes
router.post('/payment-details', customerController.createPaymentDetails);
router.get('/payment-details/:cust_id', customerController.getPaymentDetails);

// Razorpay payment routes
router.post('/create-payment-order', customerController.createPaymentOrder);
router.post('/verify-payment', customerController.verifyPaymentCallback);

// Customer preview website routes
router.post('/preview-website', customerController.createPreviewWebsite);
router.get('/preview-website/:cust_id', customerController.getPreviewWebsite);

// Customer website domain details routes
router.post('/domain-details', customerController.createWebsiteDomainDetails);
router.get('/domain-details/:cust_id', customerController.getWebsiteDomainDetails);


export { router as customerRouter }; 
