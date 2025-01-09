import { Button, Group, Modal, Radio, Stack, Text, TextInput } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ContextModalProps, modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { AvailableModals } from '../../../modals';
import { checkDomainAvailability } from '../api/checkDomainAvailability';
import { saveDomainDetails } from '../api/saveDomainDetails';
import { useAuth } from '../../../context/AuthContext';

function FindDomain({
  domain,
  setDomain,
  isAvailable,
  loading,
  onCheckAvailability,
}: {
  domain: string;
  setDomain: (value: string) => void;
  isAvailable: boolean | null;
  loading: boolean;
  onCheckAvailability: () => void;
}) {
  return (
    <Stack gap="xs">
      <Text fw={500}>Find Domain</Text>
      <Group
        align="center"
        justify="space-between"
        gap="xs"
      >
        <TextInput
          flex={1}
          placeholder="Enter anything"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          />
        <Button
          onClick={onCheckAvailability}
          disabled={!domain.trim() || loading}
          loading={loading}
          py="sm"
        >
          Check Availability
        </Button>
        </Group>
      {isAvailable !== null && (
        <Text size="sm" c={isAvailable ? 'teal' : 'red'} mt="xs">
          {isAvailable ? 'Available' : 'Not Available'}
        </Text>
      )}
    </Stack>
  );
}

function ExistingDomain({
  domain,
  setDomain,
}: {
  domain: string;
  setDomain: (value: string) => void;
}) {
  return (
    <Stack gap="xs">
      <Text fw={500}>Enter Domain</Text>
      <TextInput
        placeholder="Enter domain"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
      />
    </Stack>
  );
}

export function DeployWebsiteFormModalContent({
  context,
  id,
  innerProps
}: ContextModalProps<{paymentId: string}>) {
  const [domainType, setDomainType] = useState<'find' | 'existing'>('find');
  const [domain, setDomain] = useState('');
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery('(max-width: 48em)');
  console.log(innerProps);
  const handleCheckAvailability = async () => {
    if (!domain.trim()) return;
    setLoading(true);
    try {
      const data = await checkDomainAvailability(domain);
      const isAvailable = data.status === 'available';
      setIsAvailable(isAvailable);
    } catch (error) {
      console.error('Error checking domain availability:', error);
      setIsAvailable(null); // Reset to neutral state on error
    } finally {
      setLoading(false);
    }
  };

  const handleDeploy = async () => {
    if (!innerProps.paymentId) return;
    const customerId = sessionStorage.getItem('customerId');
    try {
      const domainDetails = {
        domain_name: domain,
        cust_id: customerId!, // Get from auth context
        payment_id: innerProps.paymentId, // This will be updated after payment
        website_deployed_flag: 'N',
        website_url: `https://${domain}`
      };

      await saveDomainDetails(domainDetails);

      modals.openContextModal({
        modal: AvailableModals.DEPLOY_WEBSITE_SUCCESSFUL_MODAL,
        innerProps: {
          websiteUrl: domainDetails.website_url
        },
        fullScreen: Boolean(isMobile),
        size: '90%',
        transitionProps: { transition: 'pop', duration: 300 },
        centered: true,
        padding: "md",
        onClose: () => {
          context.closeAll();
        }
      });
    } catch (error) {
      console.error('Error saving domain details:', error);
      notifications.show({
        title: 'Error',
        message: error instanceof Error ? error.message : 'Failed to save domain details',
        color: 'red'
      });
    }
  };

  return (
    <>
      <Modal.Title>
        <Stack gap="xs" mb="md">
          <Text size="sm" c="blue">
            Deploy
          </Text>
          <Text fz={{ base: 24, sm: 28, md: 32 }} fw={500} lh={1.2}>
            Deploy Your Website
          </Text>
          <Text c="dimmed" fz={{ base: 14, md: 16 }}>
            Choose a domain name for your website and deploy it to our secure cloud infrastructure. Your website will be live and accessible within minutes.
          </Text>
        </Stack>
      </Modal.Title>

      <Stack mt="xl">
        <Radio.Group
          value={domainType}
          onChange={(value) => {
            setDomainType(value as 'find' | 'existing');
            setIsAvailable(null); // Reset availability state when switching
          }}
        >
          <Group>
            <Radio value="find" label="Find a domain" />
            <Radio value="existing" label="I already have a domain" />
          </Group>
        </Radio.Group>

        {domainType === 'find' ? (
          <FindDomain
            domain={domain}
            setDomain={(value) => {
              setDomain(value);
              setIsAvailable(null); // Reset availability state on input change
            }}
            isAvailable={isAvailable}
            loading={loading}
            onCheckAvailability={handleCheckAvailability}
          />
        ) : (
          <ExistingDomain domain={domain} setDomain={setDomain} />
        )}

        <Group justify="flex-end" mt="xl">
          <Button variant="default" onClick={() => context.closeModal(id)}>
            Cancel
          </Button>
          <Button onClick={handleDeploy} disabled={!domain.trim() || loading || !isAvailable}>Deploy</Button>
        </Group>
      </Stack>
    </>
  );
}


export default function DeployWebsiteFormModal() {
  const isMobile = useMediaQuery('(max-width: 48em)');
const auth = useAuth();

  const handleDeployWebsiteClick = () => {
    modals.openContextModal({
      modal: AvailableModals.DEPLOY_WEBSITE_FORM_MODAL,
      fullScreen: Boolean(isMobile),
      size: '50%',
      transitionProps: { transition: 'pop', duration: 300 },
      padding: "md",
      centered: true,
      // keeping innerProps empty to avoid error
      innerProps: {}
    })
  }

  return (
    <Button
      disabled={!auth.isAuthenticated}
      onClick={handleDeployWebsiteClick}>
      Deploy Website
    </Button>
  );
}
