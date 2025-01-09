import { Button, Checkbox, Modal, Title, Text } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { saveCustomerDetails, saveAdditionalDetails } from '../api/saveCustomerDetails';
import { useAuth } from '../../../context/AuthContext';

import { Group, Select, Textarea, TextInput, Stack } from '@mantine/core';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandYoutube,
  IconBuilding,
  IconClock,
  IconMail,
  IconMapPin,
  IconPhone,
  IconUser,
  IconWorld,
} from '@tabler/icons-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ICustomerDetailsFormValues } from '../types';
import { useHomeStore } from '../store/useHomeStore';
import { useState } from 'react';


function CustomerDetailsForm() {
  const { register, handleSubmit, formState: { errors } ,reset} = useForm<ICustomerDetailsFormValues>();
  const { setCustomerDetails } = useHomeStore();
  const { setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useMediaQuery('(max-width: 48em)');

  const onSubmit: SubmitHandler<ICustomerDetailsFormValues> = async (data) => {
    setIsLoading(true);
    try {
      // First, save customer details
      const customerResponse = await saveCustomerDetails(data);
      
      // Get the customer ID from the response and store it in auth context
      const custId = customerResponse.cust_id;
      setAuth(custId);
      
      // Then, save additional details with the customer ID
      await saveAdditionalDetails(data, custId);
      
      setCustomerDetails(data);
      notifications.show({
        title: 'Success',
        message: 'Customer details saved successfully',
        color: 'green',
      });
      reset();
    } catch (error) {
      console.error('Error saving customer details:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to save customer details';
      notifications.show({
        title: 'Error',
        message: errorMessage,
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Full Name and Company Name */}
      <Group grow={!isMobile} gap="xl">
        <TextInput
          label="Full Name"
          placeholder="Name of the customer"
          leftSection={<IconUser />}
          {...register('fullName', { required: 'Full Name is required' })}
          error={errors.fullName?.message}
          mb={isMobile ? "sm" : 0}
        />
        <TextInput
          label="Company Name"
          placeholder="Enter company name"
          leftSection={<IconBuilding />}
          {...register('companyName')}
        />
      </Group>

      {/* Phone Number and Email */}
      <Group grow={!isMobile} gap="xl" mt="md">
        <TextInput
          label="Phone Number"
          placeholder="Enter phone number"
          leftSection={<IconPhone />}
          {...register('phone', { required: 'Phone number is required' })}
          error={errors.phone?.message}
          mb={isMobile ? "sm" : 0}
        />
        <TextInput
          label="Email"
          placeholder="Enter email"
          leftSection={<IconMail />}
          {...register('email', { required: 'Email is required' })}
          error={errors.email?.message}
        />
      </Group>

      {/* Working Days and Working Hours */}
      <Group grow={!isMobile} gap="xl" mt="md">
        <TextInput
          label="Working Days"
          placeholder="Enter days"
          leftSection={<IconClock />}
          {...register('workingDays')}
          mb={isMobile ? "sm" : 0}
        />
        <TextInput
          label="Working Hours"
          placeholder="Enter hours"
          leftSection={<IconClock />}
          {...register('workingHours')}
        />
      </Group>

      {/* Address Details */}
      <Group grow={!isMobile} gap="xl" mt="md">
        <TextInput
          label="Address"
          placeholder="Enter address"
          {...register('address')}
          mb={isMobile ? "sm" : 0}
        />
        <TextInput
          label="District"
          placeholder="Enter district"
          {...register('district')}
        />
      </Group>

      <Group grow={!isMobile} gap="xl" mt="md">
        <Select
          label="State"
          placeholder="Select state"
          data={['State 1', 'State 2', 'State 3']}
          {...register('state')}
          onChange={(value) => {
            const event = { target: { value } };
            register('state').onChange(event);
          }}
          mb={isMobile ? "sm" : 0}
        />
        <TextInput
          label="Zip"
          placeholder="Enter zip"
          {...register('zip')}
        />
      </Group>

      <Group grow={!isMobile} gap="xl" mt="md">
        <Select
          label="Country"
          placeholder="Select country"
          data={['Country 1', 'Country 2', 'Country 3']}
          leftSection={<IconWorld />}
          {...register('country')}
          onChange={(value) => {
            const event = { target: { value } };
            register('country').onChange(event);
          }}
          mb={isMobile ? "sm" : 0}
        />
        <Stack gap="sm">
          <TextInput
            label="Google Map Latitude"
            placeholder="Enter latitude"
            leftSection={<IconMapPin />}
            {...register('latitude')}
            mb={isMobile ? "sm" : 0}
          />
          <TextInput
            label="Google Map Longitude"
            placeholder="Enter longitude"
            leftSection={<IconMapPin />}
            {...register('longitude')}
          />
        </Stack>
      </Group>

      {/* About Organization */}
      <Textarea
        label="About Organization"
        placeholder="Write about the organization"
        mt="md"
        {...register('aboutOrganization')}
      />

      {/* Social Links */}
      <Stack gap="sm" mt="md">
        <Text fw={500}>Social Links</Text>
        <Group grow={!isMobile} gap="sm">
          <TextInput
            label="LinkedIn"
            placeholder="Enter LinkedIn URL"
            leftSection={<IconBrandLinkedin />}
            {...register('social.linkedin')}
            mb={isMobile ? "sm" : 0}
          />
          <TextInput
            label="Instagram"
            placeholder="Enter Instagram URL"
            leftSection={<IconBrandInstagram />}
            {...register('social.instagram')}
          />
        </Group>
        <Group grow={!isMobile} gap="sm">
          <TextInput
            label="Facebook"
            placeholder="Enter Facebook URL"
            leftSection={<IconBrandFacebook />}
            {...register('social.facebook')}
            mb={isMobile ? "sm" : 0}
          />
          <TextInput
            label="YouTube"
            placeholder="Enter YouTube URL"
            leftSection={<IconBrandYoutube />}
            {...register('social.youtube')}
          />
        </Group>
      </Stack>

      <Group grow={!isMobile} gap="xl" mt="md">
        <Checkbox label="Require Custom Website" {...register('requireCustomWebsite')} />
      </Group>

      {/* Submit Button */}
      <Button type="submit" fullWidth mt="xl" loading={isLoading}>
        Submit Details
      </Button>
    </form>
  );
}

export default function CustomerDetailsFormModal() {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 48em)');
  
  return (
    <>
      <Modal 
        opened={opened} 
        onClose={close} 
        size={isMobile ? "100%" : "90%"} 
        radius="md"
        padding={isMobile ? "xs" : "md"}
      >
        <Modal.Header>
          <Title order={2}>Customer Details</Title>
        </Modal.Header>
        <Modal.Body>
          <CustomerDetailsForm />
        </Modal.Body>
      </Modal>
      <Button
        variant="outline"
        fullWidth
        mb="md"
        leftSection="+"
        onClick={open}>
        Add Customer Details
      </Button>
    </>
  );
}
