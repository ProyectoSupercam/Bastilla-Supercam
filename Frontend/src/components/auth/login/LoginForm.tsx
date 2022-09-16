import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment, styled, Button } from '@mui/material';
// components
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import Iconify from '../../Iconify';
import { auth } from '../../../firebase-config';


// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")



//@ts-ignore
  const RegistrarUser = (e) =>{
    e.preventDefault()
    try {
      auth.createUserWithEmailAndPassword(email,password)
    } catch (error) {
      
    }
  }
  
  //se ocupa yup para validar datos 

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Ingrese un mail valido').required('Email es requerido'),
    password: Yup.string().required('Contraseña es requerida'),
  });

  //Valores por defectos
  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };
  // usamos reack hook form y lo vinculamos con Yup
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

    //hacemos el submit
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

    //en el caso que la validacion sea true, lo redireccionará al home
  const onSubmit = async () => {
    navigate('/home', { replace: true });
  };

  return (
      //usamos material ui para hacer la interface
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
        <Stack spacing={3}>
          <RHFTextField name="email" label="Dirección de Email" />

          <RHFTextField
            name="password"
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">

                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} sx={undefined} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <RHFCheckbox name="remember" label="Recordar" />
          <Link variant="subtitle2" underline="hover">
            ¿Olvidaste la contraseña?
          </Link>
        </Stack>

        <button className ="bottonLogin btn" type="submit" >
          Iniciar Sesión
        </button>
      </FormProvider>


  );
}
