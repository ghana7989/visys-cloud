import { Request, Response } from 'express';
import CustomerDetails from '../models/CustomerDetails';
import CustomerAdditionalDetails from '../models/CustomerAdditionalDetails';
import CustomerBrowseUploadImages from '../models/CustomerBrowseUploadImages';
import CustomerPaymentDetails from '../models/CustomerPaymentDetails';
import CustomerMobileUploadImages from '../models/CustomerMobileUploadImages';
import CustomerPreviewWebsite from '../models/CustomerPreviewWebsite';
import CustomerWebsiteDomainDetails from '../models/CustomerWebsiteDomainDetails';
import { createOrder, verifyPayment } from '../services/razorpay.service';

export class CustomerController {
  async createCustomer(req: Request, res: Response) {
    try {
      const customerData = req.body;
      const customer = await CustomerDetails.create(customerData);
      res.status(201).json(customer);
    } catch (error) {
      console.error('Error creating customer:', error);
      res.status(500).json({ 
        message: 'Error creating customer',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async getAllCustomers(req: Request, res: Response) {
    try {
      const customers = await CustomerDetails.findAll();
      res.json(customers);
    } catch (error) {
      console.error('Error fetching customers:', error);
      res.status(500).json({ 
        message: 'Error fetching customers',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async createCustomerAdditionalDetails(req: Request, res: Response) {
    try {
      const { cust_id, ...additionalData } = req.body;

      if (!cust_id) {
        return res.status(400).json({ message: 'Customer ID is required' });
      }

      // Check if customer exists
      const customer = await CustomerDetails.findByPk(cust_id);
      if (!customer) {
        return res.status(404).json({ 
          message: 'Customer not found. Cannot create additional details for non-existent customer.'
        });
      }

      // Check if additional details already exist for this customer
      const existingDetails = await CustomerAdditionalDetails.findOne({
        where: { cust_id }
      });
      if (existingDetails) {
        return res.status(409).json({ 
          message: 'Additional details already exist for this customer.'
        });
      }

      // Create additional details
      const customerAdditionalDetails = await CustomerAdditionalDetails.create({
        cust_id,
        ...additionalData
      });

      res.status(201).json({
        message: 'Customer additional details created successfully',
        data: customerAdditionalDetails
      });
    } catch (error) {
      console.error('Error creating customer additional details:', error);
      res.status(500).json({ 
        message: 'Error creating customer additional details',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async createBrowseUploadImages(req: Request, res: Response) {
    try {
      const { cust_id, ...imageData } = req.body;

      if (!cust_id) {
        return res.status(400).json({ message: 'Customer ID is required' });
      }

      // Check if customer exists
      const customer = await CustomerDetails.findByPk(cust_id);
      if (!customer) {
        return res.status(404).json({ 
          message: 'Customer not found. Cannot create upload images for non-existent customer.'
        });
      }

      // Create browse upload images
      const browseUploadImages = await CustomerBrowseUploadImages.create({
        cust_id,
        ...imageData
      });

      res.status(201).json({
        message: 'Customer browse upload images created successfully',
        data: browseUploadImages
      });
    } catch (error) {
      console.error('Error creating customer browse upload images:', error);
      res.status(500).json({ 
        message: 'Error creating customer browse upload images',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async getBrowseUploadImages(req: Request, res: Response) {
    try {
      const { cust_id } = req.params;

      if (!cust_id) {
        return res.status(400).json({ message: 'Customer ID is required' });
      }

      const browseUploadImages = await CustomerBrowseUploadImages.findOne({
        where: { cust_id }
      });

      if (!browseUploadImages) {
        return res.status(404).json({ message: 'No browse upload images found for this customer' });
      }

      res.json(browseUploadImages);
    } catch (error) {
      console.error('Error fetching customer browse upload images:', error);
      res.status(500).json({ 
        message: 'Error fetching customer browse upload images',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async createPaymentDetails(req: Request, res: Response) {
    try {
      const { cust_id, payment_amount, ...paymentData } = req.body;

      if (!cust_id) {
        return res.status(400).json({ message: 'Customer ID is required' });
      }

      if (!payment_amount) {
        return res.status(400).json({ message: 'Payment amount is required' });
      }

      // Check if customer exists
      const customer = await CustomerDetails.findByPk(cust_id);
      if (!customer) {
        return res.status(404).json({ 
          message: 'Customer not found. Cannot create payment details for non-existent customer.'
        });
      }

      // Create payment details
      const paymentDetails = await CustomerPaymentDetails.create({
        cust_id,
        payment_amount,
        ...paymentData
      });

      res.status(201).json({
        message: 'Customer payment details created successfully',
        data: paymentDetails
      });
    } catch (error) {
      console.error('Error creating customer payment details:', error);
      res.status(500).json({ 
        message: 'Error creating customer payment details',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async getPaymentDetails(req: Request, res: Response) {
    try {
      const { cust_id } = req.params;

      if (!cust_id) {
        return res.status(400).json({ message: 'Customer ID is required' });
      }

      const paymentDetails = await CustomerPaymentDetails.findAll({
        where: { cust_id }
      });

      if (!paymentDetails.length) {
        return res.status(404).json({ message: 'No payment details found for this customer' });
      }

      res.json(paymentDetails);
    } catch (error) {
      console.error('Error fetching customer payment details:', error);
      res.status(500).json({ 
        message: 'Error fetching customer payment details',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async createMobileUploadImages(req: Request, res: Response) {
    try {
      const { cust_id, ...imageData } = req.body;

      if (!cust_id) {
        return res.status(400).json({ message: 'Customer ID is required' });
      }

      // Check if customer exists
      const customer = await CustomerDetails.findByPk(cust_id);
      if (!customer) {
        return res.status(404).json({ 
          message: 'Customer not found. Cannot create mobile upload images for non-existent customer.'
        });
      }

      // Create mobile upload images
      const mobileUploadImages = await CustomerMobileUploadImages.create({
        cust_id,
        ...imageData
      });

      res.status(201).json({
        message: 'Customer mobile upload images created successfully',
        data: mobileUploadImages
      });
    } catch (error) {
      console.error('Error creating customer mobile upload images:', error);
      res.status(500).json({ 
        message: 'Error creating customer mobile upload images',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async getMobileUploadImages(req: Request, res: Response) {
    try {
      const { cust_id } = req.params;

      if (!cust_id) {
        return res.status(400).json({ message: 'Customer ID is required' });
      }

      const mobileUploadImages = await CustomerMobileUploadImages.findOne({
        where: { cust_id }
      });

      if (!mobileUploadImages) {
        return res.status(404).json({ message: 'No mobile upload images found for this customer' });
      }

      res.json(mobileUploadImages);
    } catch (error) {
      console.error('Error fetching customer mobile upload images:', error);
      res.status(500).json({ 
        message: 'Error fetching customer mobile upload images',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async createPreviewWebsite(req: Request, res: Response) {
    try {
      const { cust_id, preview_url, ...previewData } = req.body;

      if (!cust_id) {
        return res.status(400).json({ message: 'Customer ID is required' });
      }

      if (!preview_url) {
        return res.status(400).json({ message: 'Preview URL is required' });
      }

      // Check if customer exists
      const customer = await CustomerDetails.findByPk(cust_id);
      if (!customer) {
        return res.status(404).json({ 
          message: 'Customer not found. Cannot create preview website for non-existent customer.'
        });
      }

      // Check if preview website already exists for this customer
      const existingPreview = await CustomerPreviewWebsite.findOne({
        where: { cust_id }
      });
      if (existingPreview) {
        return res.status(409).json({ 
          message: 'Preview website already exists for this customer.'
        });
      }

      // Create preview website
      const previewWebsite = await CustomerPreviewWebsite.create({
        cust_id,
        preview_url,
        ...previewData
      });

      res.status(201).json({
        message: 'Customer preview website created successfully',
        data: previewWebsite
      });
    } catch (error) {
      console.error('Error creating customer preview website:', error);
      res.status(500).json({ 
        message: 'Error creating customer preview website',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async getPreviewWebsite(req: Request, res: Response) {
    try {
      const { cust_id } = req.params;

      if (!cust_id) {
        return res.status(400).json({ message: 'Customer ID is required' });
      }

      const previewWebsite = await CustomerPreviewWebsite.findOne({
        where: { cust_id }
      });

      if (!previewWebsite) {
        return res.status(404).json({ message: 'No preview website found for this customer' });
      }

      res.json(previewWebsite);
    } catch (error) {
      console.error('Error fetching customer preview website:', error);
      res.status(500).json({ 
        message: 'Error fetching customer preview website',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async createWebsiteDomainDetails(req: Request, res: Response) {
    try {
      const { cust_id, payment_id, domain_name, website_url, ...domainData } = req.body;

      if (!cust_id) {
        return res.status(400).json({ message: 'Customer ID is required' });
      }

      if (!payment_id) {
        return res.status(400).json({ message: 'Payment ID is required' });
      }

      if (!domain_name) {
        return res.status(400).json({ message: 'Domain name is required' });
      }

      if (!website_url) {
        return res.status(400).json({ message: 'Website URL is required' });
      }

      // Check if customer exists
      const customer = await CustomerDetails.findByPk(cust_id);
      if (!customer) {
        return res.status(404).json({ 
          message: 'Customer not found. Cannot create domain details for non-existent customer.'
        });
      }

      // Check if payment exists
      const payment = await CustomerPaymentDetails.findOne({
        where: {
          arg2: payment_id
        }
      });
      if (!payment) {
        return res.status(404).json({ 
          message: 'Payment not found. Cannot create domain details for non-existent payment.'
        });
      }

      // Check if domain name already exists
      const existingDomain = await CustomerWebsiteDomainDetails.findByPk(domain_name);
      if (existingDomain) {
        return res.status(409).json({ 
          message: 'Domain name already exists.'
        });
      }

      // Create domain details
      const domainDetails = await CustomerWebsiteDomainDetails.create({
        cust_id,
        payment_id,
        domain_name,
        website_url,
        ...domainData
      });

      res.status(201).json({
        message: 'Customer website domain details created successfully',
        data: domainDetails
      });
    } catch (error) {
      console.error('Error creating customer website domain details:', error);
      res.status(500).json({ 
        message: 'Error creating customer website domain details',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async getWebsiteDomainDetails(req: Request, res: Response) {
    try {
      const { cust_id } = req.params;

      if (!cust_id) {
        return res.status(400).json({ message: 'Customer ID is required' });
      }

      const domainDetails = await CustomerWebsiteDomainDetails.findAll({
        where: { cust_id }
      });

      if (!domainDetails.length) {
        return res.status(404).json({ message: 'No domain details found for this customer' });
      }

      res.json(domainDetails);
    } catch (error) {
      console.error('Error fetching customer website domain details:', error);
      res.status(500).json({ 
        message: 'Error fetching customer website domain details',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async createPaymentOrder(req: Request, res: Response) {
    try {
      const { amount, currency = 'INR' } = req.body;

      if (!amount) {
        return res.status(400).json({ message: 'Amount is required' });
      }

      const order = await createOrder(amount, currency);
      
      res.status(200).json({
        message: 'Order created successfully',
        data: order
      });
    } catch (error) {
      console.error('Error creating order:', error);
      res.status(500).json({ 
        message: 'Error creating order',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async verifyPaymentCallback(req: Request, res: Response) {
    try {
      const { 
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        cust_id,
        payment_amount
      } = req.body;

      const isValid = verifyPayment(
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      );

      if (!isValid) {
        return res.status(400).json({ message: 'Invalid payment signature' });
      }

      // Create payment record
      const paymentDetails = await CustomerPaymentDetails.create({
        cust_id,
        payment_amount,
        payment_flag: 'Y',
        arg1: razorpay_order_id,
        arg2: razorpay_payment_id,
      });

      res.status(200).json({
        message: 'Payment verified successfully',
        data: paymentDetails
      });
    } catch (error) {
      console.error('Error verifying payment:', error);
      res.status(500).json({ 
        message: 'Error verifying payment',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
}

export const customerController = new CustomerController(); 
