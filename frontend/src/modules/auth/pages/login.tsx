import { Box, Button, Center, Grid, Image, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useNavigate } from 'react-router';
import { api } from '../api';
import { useState } from 'react';

export default function Login() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState('pavan.ch@gmail.com');
  const [password, setPassword] = useState('welcome1');

  const handleLogin = async () => {
    setError('');
    setIsLoading(true);

    try {
      const response = await api.login({ user_id: userId, password });
      if (response.success) {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      setError('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Center
      style={{
        height: "90vh",
      }}
    >
      <Grid>
        {!isMobile && (
          <Grid.Col span={6}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image src="/login-illustration.png" alt="Login background"
                style={{
                  width: 400,
                  height: 400,
                  objectFit: "cover",
                }}
              />
            </Box>
          </Grid.Col>
        )}

        <Grid.Col span={isMobile ? 12 : 6}>
          <Box p={30}>
            <Title order={2} ta="left" mt="md">
              Sign In to build your dream website.
            </Title>
            <Text size="sm" ta="left" mt="md" mb={50}>
              Don't have an account yet? Create one to start building your website with AI. Our platform makes it easy to bring your vision to life.
            </Text>

            <TextInput 
              label="User ID" 
              placeholder="Enter your user ID" 
              size="md"
              onChange={(e) => setUserId(e.target.value)}
              value={userId}
              error={error}
            />
            <PasswordInput 
              label="Password" 
              placeholder="Your password" 
              mt="md" 
              size="md"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Button 
              fullWidth 
              mt="xl" 
              size="md" 
              onClick={handleLogin}
              loading={isLoading}
            >
              Login
            </Button>
          </Box>
        </Grid.Col>
      </Grid>
    </Center>
  );
}

