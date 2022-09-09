import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Page from '../components/Page';
// sections
import { LoginForm } from '../components/auth/login';
import AuthSocial from '../components/auth/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: -3,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(9),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 0, 0, 0),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '200%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(-1, -49, 0, 54),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 2080,
  left: 50,
  minHeight: '80vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(5, 0),
}));

// ----------------------------------------------------------------------

export default function Login() {
  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
      <RootStyle>
        <HeaderStyle>
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              Don’t have an account? {''}
              <Link variant="subtitle2" component={RouterLink} to="/register">
                Get started
              </Link>
            </Typography>
          )}
        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mb: 70}}>
              Aplicación Autobus
            </Typography>
          </SectionStyle>
        )}

        <Container maxWidth="md">
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Supercam-Bastilla
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 }}>Iniciar Sesión.</Typography>

            <AuthSocial />

            <LoginForm />

            {!smUp && (
              <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                Don’t have an account?{' '}
                <Link variant="subtitle2" component={RouterLink} to="/register">
                  Get started
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>

  );
}
