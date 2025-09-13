import { LockOutlined } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import agent from '../../app/api/agent';
const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function Register() {

  const navigate = useNavigate()
  // const dispatch = useDispatch<any>()
  const { register, handleSubmit, setError, formState: { isSubmitting, errors, isValid } } = useForm({
    mode: 'onTouched'
  })


  function handleApiErrors(errors: any) {
    if (Array.isArray(errors)) {
      if (errors) {
        errors.forEach((error: string) => {
          if (error.includes('Password')) {
            setError('password', { message: error })
          } else if (error.includes('Email')) {
            setError('email', { message: error })
          } else if (error.includes('Username')) {
            setError('username', { message: error })
          }
        })
      }
    }
  }

  return (

    <SignInContainer direction="column" justifyContent="space-between">
      <Card variant="outlined">
        <Avatar sx={{ m: 1, bgcolor: 'scondary.main' }}>
          <LockOutlined />
        </Avatar>
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
        >
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(data => agent.Account.register(data)
            .then(() => {
              toast.success('Registeration successful! - you can now login')
              navigate('/login')
            })
            .catch(error => handleApiErrors(error)))}
          noValidate
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="email"></FormLabel>
            <TextField
              margin='normal'
              label="Username"
              placeholder="Username"
              autoFocus
              fullWidth
              variant="outlined"
              {...register('username', { required: 'Passwordd is required!' })}
              error={!!errors.username}
              helperText={errors?.username?.message as string}
            />
            <TextField
              margin='normal'
              label="Email"
              placeholder="your@email.com"
              fullWidth
              variant="outlined"
              {...register('email', {
                required: 'Email is required!',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Not a valid email address'
                }

              })}
              error={!!errors.email}
              helperText={errors?.email?.message as string}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password"></FormLabel>
            <TextField
              label="Password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="current-password"
              fullWidth
              variant="outlined"
              {...register('password', {
                required: 'Passwordd is required!',
                pattern: {
                  value: /^(?=(?:.*[A-Z]))(?=(?:.*[a-z]))(?=(?:.*\d)|(?:.*\W)).{8,}$/,
                  message: "Password must be at least 8 characters long and contain characters from at least three of the following categories: uppercase letters, lowercase letters, numbers, and special characters."
                }
              })}
              error={!!errors.password}
              helperText={errors?.password?.message as string}
            />
          </FormControl>
          <LoadingButton
            loading={isSubmitting}
            type="submit"
            fullWidth
            variant="contained"
            disabled={!isValid}
          >
            Register
          </LoadingButton>
        </Box>
        <Divider>or</Divider>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography sx={{ textAlign: 'center' }}>
            Aleardy have an account?{' '}
            <Link
              to='/login'
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </Card>
    </SignInContainer>
  );
}