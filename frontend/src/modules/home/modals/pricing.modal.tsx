/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Card, Group, List, Modal, SimpleGrid, Stack, Text, ThemeIcon } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ContextModalProps, modals } from '@mantine/modals';
import { IconCheck } from '@tabler/icons-react';
import { pricingPlans } from '../data';
import { useDeployStore } from '../store/useDeployStore';
import { IPricingPlan } from '../types';
import { AvailableModals } from '../../../modals';
import { notifications } from '@mantine/notifications';
import axios from 'axios';
import { RAZORPAY_KEY_ID } from '../../../services/razorpay';
import { API_BASE_URL } from '../../../config';
import { createOrder } from '../api/createOrder';
import { useEffect } from 'react';

declare global {
  interface Window {
    Razorpay: any;
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

export function PricingModalContent({
  context,
}:ContextModalProps) {
  const { planSelected, setPlanSelected } = useDeployStore();
  const isMobile = useMediaQuery('(max-width: 48em)');
  const isWebView = Boolean(window.ReactNativeWebView);
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = resolve;
      document.body.appendChild(script);
    });
  };
  // Handle successful payment
  const handlePaymentSuccess = async (response: any) => {
    try {
      const customerId = sessionStorage.getItem('customerId');
      if (!customerId) {
        notifications.show({
          title: 'Error',
          message: 'Customer ID not found. Please fill the customer details form first.',
          color: 'red'
        });
        return;
      }

      const verificationResponse = await axios.post(API_BASE_URL + '/customers/verify-payment', {
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        payment_amount: Number(planSelected?.price.replace(/[^0-9.-]+/g, "")),
        cust_id: customerId
      });

      if (verificationResponse.data.message === 'Payment verified successfully') {
        notifications.show({
          title: 'Success',
          message: 'Payment successful! Proceeding with deployment.',
          color: 'green'
        });

        context.openContextModal(AvailableModals.DEPLOY_WEBSITE_FORM_MODAL, {
          innerProps: {
            paymentId: response.razorpay_payment_id
          },
          fullScreen: Boolean(isMobile),
          size: '50%',
          transitionProps: { transition: 'pop', duration: 300 },
          centered: true,
          padding: "md",
        });
      }
    } catch (error) {
      console.error(error);
      notifications.show({
        title: 'Error',
        message: 'Payment verification failed. Please contact support.',
        color: 'red'
      });
    }
  };
  useEffect(() => {
    if (isWebView) {
      const handleMessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'PAYMENT_SUCCESS') {
            handlePaymentSuccess(data.payload);
          }
        } catch (error) {
          console.error('Error processing message:', error);
        }
      };

      window.addEventListener('message', handleMessage);
      return () => window.removeEventListener('message', handleMessage);
    }
  }, [isWebView]);
  const handlePayment = async (plan: IPricingPlan) => {
    try {
      // Load Razorpay script
      await loadRazorpayScript();

      // Create order
      const { data } =await createOrder(plan);

      const options = {
        key: RAZORPAY_KEY_ID || 'rzp_test_YOUR_KEY_ID',
        amount: data.data.amount,
        currency: data.data.currency,
        name: 'Visys Cloud',
        description: `Payment for ${plan.name} Plan`,
        order_id: data.data.id,
        handler: async (response: any) => {
          try {
            const customerId = sessionStorage.getItem('customerId');
            if (!customerId) {
              notifications.show({
                title: 'Error',
                message: 'Customer ID not found. Please fill the customer details form first.',
                color: 'red'
              });
              return;
            }
            const verificationResponse = await axios.post(API_BASE_URL + '/customers/verify-payment', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              payment_amount: Number(plan.price.replace(/[^0-9.-]+/g,"")),
              cust_id: sessionStorage.getItem('customerId')
            });

            if (verificationResponse.data.message === 'Payment verified successfully') {
              notifications.show({
                title: 'Success',
                message: 'Payment successful! Proceeding with deployment.',
                color: 'green'
              });

              // Open deploy website form
              context.openContextModal(AvailableModals.DEPLOY_WEBSITE_FORM_MODAL, {
                innerProps: {
                  paymentId: response.razorpay_payment_id
                },
                fullScreen: Boolean(isMobile),
                size: '50%',
                transitionProps: { transition: 'pop', duration: 300 },
                centered: true,
                padding: "md",
              });
            }
          } catch (error) {
            console.error(error);
            notifications.show({
              title: 'Error',
              message: 'Payment verification failed. Please contact support.',
              color: 'red'
            });
          }
        },
        theme: {
          color: '#228be6'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      notifications.show({
        title: 'Error',
        message: 'Failed to initiate payment. Please try again.',
        color: 'red'
      });
    }
  };

  const handlePlanSelected = (plan: IPricingPlan) => {
    setPlanSelected(plan);
    handlePayment(plan);
  }

  return (
    <Box p="md">
      <Modal.Title>
        <Stack gap="xs" mb="md">
          <Text size="sm" c="blue">Pricing</Text>
          <Text fz={{ base: 24, sm: 28, md: 32 }} fw={500} lh={1.2}>
            Simple, transparent pricing
          </Text>
          <Text c="dimmed" fz={{ base: 14, md: 16 }}>
            We believe Untitled should be accessible to all companies, no matter the size.
          </Text>
        </Stack>
      </Modal.Title>
      <SimpleGrid 
        cols={{ base: 1, md: 2, lg: 3 }}
        spacing="md"
        verticalSpacing="xl"
      >
        {pricingPlans.map((plan) => (
          <Card
            key={plan.name}
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            style={{
              position: 'relative',
              boxShadow: '0px 8.48px 11.31px -2.83px rgba(16, 24, 40, 0.08)',
            }}
          >
            {plan.isPopular && (
              <Text
                size="sm"
                c="blue"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'white',
                  padding: '0 10px',
                }}
              >
                Most popular!
              </Text>
            )}
            <Stack gap="xs" align="center">
              <Stack gap={0} align="center">
                <Group gap={4} wrap="nowrap">
                  <Text fz={{ base: 24, sm: 28, md: 32 }} fw={700}>{plan.price}</Text>
                  <Text size="sm" c="dimmed">{plan.period}</Text>
                </Group>
                <Text fw={500}>{plan.name}</Text>
                <Text size="sm" c="dimmed" mb="md">Billed annually.</Text>
              </Stack>

              <List
                spacing="sm"
                size="sm"
                center
                styles={{
                  itemWrapper: {
                    width: '100%',
                  }
                }}
                icon={
                  <ThemeIcon color="teal" size={24} radius="xl">
                    <IconCheck size={16} />
                  </ThemeIcon>
                }
              >
                {plan.features.map((feature) => (
                  <List.Item key={feature}>{feature}</List.Item>
                ))}
              </List>

              <Button
                fullWidth
                mt="xl"
                size="md"
                variant={planSelected?.name === plan.name ? 'filled' : 'light'}
                onClick={() => handlePlanSelected(plan)}
              >
                Get started
              </Button>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
}
interface PricingModalProps {
  buttonText?: string;
}
export default function PricingModal({ buttonText = 'Deploy Website' }: PricingModalProps) {
  const isMobile = useMediaQuery('(max-width: 48em)');
  const handleDeployWebsiteClick = () => {
      modals.openContextModal({
      modal: AvailableModals.PRICING_MODAL,
      fullScreen: Boolean(isMobile),
      size: '90%',
      transitionProps: { transition: 'pop', duration: 300 },
        padding: "md",
      centered: true,
      // keeping innerProps empty to avoid error
      innerProps: {}
    })
  }
  return (
      <Button onClick={handleDeployWebsiteClick}>
        {buttonText}
      </Button>
  );
}
