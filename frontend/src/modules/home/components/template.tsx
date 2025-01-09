import { Image, Paper, Text } from "@mantine/core";
import { type ITemplate } from "../types";
import { useHomeStore } from "../store/useHomeStore";

interface TemplateProps  {
  template: ITemplate;
  onClick: () => void;
}

export default function TemplateCard({ template, onClick }: TemplateProps) {
  const { formValues } = useHomeStore();
  const isSelected = formValues.selectedTemplate?.id === template.id;
  return (
    <Paper
      key={template.id}
      p={8}
      style={{ 
        cursor: 'pointer', 
        overflow: 'hidden',
        backgroundColor: isSelected ? 'var(--mantine-color-blue-6)' : undefined,
        padding: isSelected ? '20px' : '1px',
        boxShadow: isSelected ? '0 0 10px 0 rgba(0, 0, 0, 0.8)' : undefined,
      }}
      onClick={onClick}
      radius="md"
      >
      <Image
        src={template.image}
        alt={`Template ${template.id}`}
        h={150}
        fit="cover"
        radius="md"
      />
      <Text ta="center" fw={500}
        c={isSelected ? 'white' : 'black'}
      >{template.name}</Text>
    </Paper>
  );
}
