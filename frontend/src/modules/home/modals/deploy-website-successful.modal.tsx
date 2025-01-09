import { Button, Stack, Text } from '@mantine/core';
import { ContextModalProps } from '@mantine/modals';
import { IconTrophy } from '@tabler/icons-react';

export function DeployWebsiteSuccessfulModalContent({
  context,
  innerProps,
}: ContextModalProps<{ websiteUrl?: string }>) {
  return (
    <Stack align="center" gap="lg" py="xl">
      <IconTrophy size={64} style={{ color: '#4C6EF5' }} />
      
      <Stack gap={4} align="center">
        <Text fz={{ base: 24, sm: 28 }} fw={500} ta="center">
          Congratulations! Your website is deployed successfully
        </Text>
        
        <Text size="sm" c="dimmed" ta="center">
          Your website has been crafted successfully download and utilize for the job you are looking
        </Text>
      </Stack>

      {innerProps.websiteUrl && (
        <Text 
          component="a" 
          href={innerProps.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          c="blue"
          style={{ textDecoration: 'none' }}
        >
          {innerProps.websiteUrl}
        </Text>
      )}

      <Button
        size="md"
        onClick={() => context.closeAll()}
      >
        Home
      </Button>
    </Stack>
  );
}
