import { Button, TextField, Typography, Box } from '@mui/material';
import { useMediaQuery } from 'react-responsive';
//Register
export default function Register() {
    const isMobile = useMediaQuery({maxWidth:768});
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            width: '100%',
            height: '100%'
        }}>
            <Box
                sx={{
                    flex: '1',
                    boxSizing: 'border-box',
                    background: "url('../src/assets/banner.jpg') center/cover no-repeat"
                }}
            ></Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: '1',
                    boxSizing: 'border-box',
                    m: 'auto',
                    // p: '0 5rem'
                }}
            >
                <Typography variant='h2'>Register</Typography>
                <TextField placeholder='User Name'></TextField>
                <TextField placeholder='Email'></TextField>
                <TextField placeholder='Password'></TextField>
                <Button color='primary'>Register</Button>
            </Box>

        </Box>
    );
}