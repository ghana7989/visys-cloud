export const templates = [
  { id: 1, image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop', name: 'Template 1' },
  { id: 2, image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop', name: 'Template 2' },
  { id: 3, image: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?w=600&h=400&fit=crop', name: 'Template 3' },
  { id: 4, image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop', name: 'Template 4' },
  { id: 5, image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop', name: 'Template 5' },
  { id: 6, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop', name: 'Template 6' },
  { id: 7, image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=400&fit=crop', name: 'Template 7' },
  { id: 8, image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop', name: 'Template 8' },
  { id: 9, image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&h=400&fit=crop', name: 'Template 9' },
  { id: 10, image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop', name: 'Template 10' },
];

export const exampleCode = `import {
  Box,
  BoxProps,
  StylesApiProps,
  factory,
  ElementProps,
  useProps,
  useStyles,
  Factory,
} from '../../core';
import classes from './VisuallyHidden.module.css';

export type VisuallyHiddenStylesNames = 'root';

export interface VisuallyHiddenProps
  extends BoxProps,
    StylesApiProps<VisuallyHiddenFactory>,
    ElementProps<'div'> {}

export type VisuallyHiddenFactory = Factory<{
  props: VisuallyHiddenProps;
  ref: HTMLDivElement;
  stylesNames: VisuallyHiddenStylesNames;
}>;

const defaultProps: Partial<VisuallyHiddenProps> = {};

export const VisuallyHidden = factory<VisuallyHiddenFactory>((_props, ref) => {
  const props = useProps('VisuallyHidden', defaultProps, _props);
  const { classNames, className, style, styles, unstyled, vars, ...others } = props;

  const getStyles = useStyles<VisuallyHiddenFactory>({
    name: 'VisuallyHidden',
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
  });

  return <Box component="span" ref={ref} {...getStyles('root')} {...others} />;
});

VisuallyHidden.classes = classes;
VisuallyHidden.displayName = '@mantine/core/VisuallyHidden';
`;


export const pricingPlans = [
  {
    name: 'Basic plan',
    price: '$10',
    period: '/mth',
    features: [
      'Access to all basic features',
      'Basic reporting and analytics',
      'Up to 10 individual users',
      '20GB individual data each user',
      'Basic chat and email support',
    ],
    isPopular: false,
  },
  {
    name: 'Business plan',
    price: '$20',
    period: '/mth',
    features: [
      '200+ integrations',
      'Advanced reporting and analytics',
      'Up to 20 individual users',
      '40GB individual data each user',
      'Priority chat and email support',
    ],
    isPopular: true,
  },
  {
    name: 'Enterprise plan',
    price: '$40',
    period: '/mth',
    features: [
      'Advanced custom fields',
      'Audit log and data history',
      'Unlimited individual users',
      'Unlimited individual data',
      'Personalised+priority service',
    ],
    isPopular: false,
  },
];
