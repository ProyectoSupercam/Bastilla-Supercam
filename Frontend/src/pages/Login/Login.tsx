import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Card, Link, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// sections
import { LoginForm } from '../../components/auth/login';
import AuthSocial from '../../components/auth/AuthSocial';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '155%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(-1, -45, 0, 50),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 2080,
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
      <Container maxWidth="md">
        <ContentStyle>
          <SectionStyle>
            <Typography variant="h2" gutterBottom>
              Supercam-Bastilla
            </Typography>

            <Typography sx={{ color: 'text.secondary', mb: 5 , ml:43}}>Iniciar Sesión.</Typography>

            <AuthSocial />

            <LoginForm />

          </SectionStyle>
        </ContentStyle>
      </Container>
    </RootStyle>

  );
}
