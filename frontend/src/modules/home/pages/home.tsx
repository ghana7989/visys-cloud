import { CodeHighlight } from '@mantine/code-highlight';
import '@mantine/code-highlight/styles.css';
import {
  ActionIcon,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Group,
  Image,
  Paper,
  rem,
  Select,
  SimpleGrid,
  Text,
  Textarea,
  Title
} from '@mantine/core';
import { IconDownload, IconMaximize, IconStack2, IconTrash, IconUpload } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { bucketName, s3 } from '../../../services/s3';
import { getCategories } from '../api/getCategories';
import { getTemplates } from '../api/getTemplates';
import TemplateCard from '../components/template';
import { exampleCode, } from '../data';
import CustomerDetailsFormModal from '../modals/customer-details-form.modal';
import PricingModal from '../modals/pricing.modal';
import { useHomeStore } from '../store/useHomeStore';
import { HomeFormValues, ICategory, ITemplate } from '../types';

export default function Home() {
  const { setFormValues, formValues } = useHomeStore();
  
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [templates, setTemplates] = useState<ITemplate[]>([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<HomeFormValues> ({
    defaultValues: async () => {
      return {
        category: '',
        prompt: '',
        selectedTemplate: null,
        uploadedImages: null,
      }
    },
    mode:"onChange"
  });

  const handleFileUpload = async (onChange: (files: string[] | null) => void) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = 'image/*';
  
    input.onchange = async (e) => {
      const fileList = (e.target as HTMLInputElement).files;
      if (fileList && fileList.length > 0) {
        const filesArray = Array.from(fileList).slice(0, 10); // Limit to 10
        const uploadedUrls: string[] = [];
  
        for (const file of filesArray) {
          const params = {
            Bucket: bucketName, // Replace with your bucket name
            Key: `uploads/${file.name}`, // Define path and file name
            Body: file,
            ContentType: file.type,
          };
  
          try {
            const uploadResult = await s3.upload(params).promise();
            uploadedUrls.push(uploadResult.Location); // Get the file URL
          } catch (error) {
            console.error('Error uploading to S3:', error);
            return;
          }
        }
  
        setFormValues({
          ...formValues,
          uploadedImages: uploadedUrls,
        });
        onChange(uploadedUrls);
      }
    };
  
    input.click();
  };

  const onSubmit = (data: HomeFormValues) => {
    setFormValues(data);
    console.log('Form Submitted:', data);
  };
  
  useEffect(() => {
    getCategories().then(setCategories);
    getTemplates().then(setTemplates);
  }, []);
  console.log(formValues);
  return (
    <Container size="xl" py="xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid gutter="xl">
          {/* Left Column - Form */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Box>
              <Title order={2} mb="xs">Create Your Website with AI</Title>
              <Text c="dimmed" mb="xl">
                Fill out the form below to generate a custom website using AI. Select a category, describe your website in the prompt, and choose a template or upload your own images to get started.
              </Text>
              <Box mb="xl">
                <Text fw={500} mb="xs">Select Category</Text>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Select Category"
                      data={categories}
                      error={errors.category?.message}
                    />
                  )}
                />
              </Box>

              <Box mb="xl">
                <Text fw={500} mb="xs">Prompt</Text>
                <Controller
                  name="prompt"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      rows={6}
                      placeholder="Type your prompt..."
                      error={errors.prompt?.message}
                    />
                  )}
                />
              </Box>

              {/* Templates Section */}
              <Paper withBorder p="md" radius="md" mb="xl"
              bg="blue.1"
              >
                <Group justify="space-between" mb="md">
                  <Group>
                    <IconStack2 />
                    <Text fw={500}>Templates</Text>
                  </Group>
                  <Controller
                    name="uploadedImages"
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Button
                        rightSection={<IconUpload />}
                        onClick={() => handleFileUpload(onChange)}
                      >
                        Upload Images
                      </Button>
                    )}
                  />
                </Group>
                <Controller
                  name="selectedTemplate"
                  control={control}
                  render={({ field: {  onChange } }) => (
                    <SimpleGrid cols={2} spacing="md">
                      {templates.map((template) => (
                        <TemplateCard key={template.id} template={template} onClick={() => {
                          setFormValues({
                            ...formValues,
                            selectedTemplate: template
                          })
                          return onChange(template);
                        }} />
                      ))}
                    </SimpleGrid>
                  )}
                />
              </Paper>
              {/* if there are any uploaded images, show them here */}
              <Controller
                name="uploadedImages"
                control={control}
                render={({ field: { onChange } }) => (
                  <Paper my="xl">
                    <SimpleGrid cols={6}>
                      {formValues.uploadedImages?.map((imageURL, index) => (
                        <Box key={index} pos="relative">
                          <ActionIcon
                            pos="absolute"
                            top={5}
                            right={5}
                            variant="filled"
                            color="red"
                            size="sm"
                            onClick={() => {
                              const newImages = formValues.uploadedImages?.filter((_, i) => i !== index) || null;
                              setFormValues({
                                ...formValues,
                                uploadedImages: newImages
                              });
                              onChange(newImages);
                            }}
                          >
                            <IconTrash size={14} />
                          </ActionIcon>
                          <Image
                            src={imageURL}
                            alt="Uploaded Image"
                            w={100}
                            h={100}
                          />
                        </Box>
                      ))}
                    </SimpleGrid>
                  </Paper>
                )}
              />
            <CustomerDetailsFormModal/>
              <Button
                type="submit"
                fullWidth
                size="xl"
                bg="dark"
              >
                Generate Website
              </Button>
            </Box>
          </Grid.Col>

          {/* Right Column - Code Preview */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Flex
              w="100%"
              justify="flex-end"
              align="center"
              gap="xs"
              mb="md"
            >
              <Button variant="outline">
                Preview Website
              </Button>
              <PricingModal />
            </Flex>
            <Paper withBorder p="md" radius="md">
              <Group justify="flex-end" mb="md">
                <ActionIcon variant="subtle" size="md">
                  <IconMaximize style={{ width: rem(18) }} />
                </ActionIcon>
                <ActionIcon variant="subtle" size="md">
                  <IconDownload style={{ width: rem(18) }} />
                </ActionIcon>
              </Group>
              <CodeHighlight code={exampleCode} language="tsx" />
            </Paper>
          </Grid.Col>
        </Grid>
      </form>
    </Container>
  );
}
