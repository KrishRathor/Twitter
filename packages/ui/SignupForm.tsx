import React, { useState } from "react";

import { Typography, Box, Button, Link } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

type SignupData = {
    username: string,
    email: string,
    password: string
};

interface props {
    title: string,
    onSubmit: (arg0: SignupData) => void
}

export const SignupForm : React.FC<props> = ({
    title,
    onSubmit
}: props) => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        const data = {
            email: email,
            username: username,
            password: password
        };
        onSubmit(data);
    }

    return (
        <div style={{background: '#333333', padding: '60px', borderRadius: '10px', width: '50vw', height: '60vh'}} >
            <Box sx={{display: 'flex', flexDirection: 'column', marginTop: '1vh', alignItems: 'center', justifyContent: 'center'}} >
                <Typography variant="h4">Welcome Back</Typography>
                <Typography variant="h6">{title} to Continue</Typography>
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: '3vh'}} >
                    <EmailIcon sx={{marginTop: '2vh'}} />
                    <input
                        type="text" 
                        style={{
                            width: '80%',
                            padding: '10px',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: '1px solid #fff',
                            color: '#fff',
                            outline: 'none',
                            transition: 'border-bottom-color 0.3s ease'
                        }}
                        placeholder="Enter your email" 
                        onFocus={(e) => {
                            e.target.style.borderBottomColor = '#00bcd4';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderBottomColor = '#fff';
                        }}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Box>
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}} >
                    <PersonIcon sx={{marginTop: '2vh'}} />
                    <input 
                        type="text" 
                        style={{
                            width: '80%',
                            padding: '10px',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: '1px solid #fff',
                            color: '#fff',
                            outline: 'none',
                            transition: 'border-bottom-color 0.3s ease',
                            marginTop: '1.5vh'
                        }}
                        placeholder="Enter your Username"
                        onFocus={(e) => {
                            e.target.style.borderBottomColor = '#00bcd4';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderBottomColor = '#fff';
                        }}
                        onChange={e => setUsername(e.target.value)}
                    />
                </Box>
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}} >
                    <LockIcon sx={{marginTop: '2vh'}} />
                    <input 
                        type="password"
                        style={{
                            width: '80%',
                            padding: '10px',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: '1px solid #fff',
                            color: '#fff',
                            outline: 'none',
                            transition: 'border-bottom-color 0.3s ease',
                            marginTop: '1.5vh'
                        }}
                        placeholder="Enter your Password"
                        onFocus={(e) => {
                            e.target.style.borderBottomColor = '#00bcd4';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderBottomColor = '#fff';
                        }} 
                        onChange={e => setPassword(e.target.value)}
                    />
                </Box>
                <Button sx={{marginTop: '3vh'}} onClick={handleSubmit} variant="contained">{title}</Button>
                <Link href="/login" sx={{marginTop: '10px'}} >Already Registered? Log In</Link>
                <hr style={{width: '100%', marginTop: '3vh'}} />
                <Typography variant="h5" sx={{marginTop: '2vh'}} >Or {title} with</Typography>
                <Box sx={{display: 'flex'}} >
                    <GoogleIcon sx={{width: '5vw', height: '5vh', marginTop: '2vh', cursor: 'pointer'}} />
                    <FacebookIcon sx={{width: '5vw', height: '5vh', marginTop: '2vh', cursor: 'pointer'}} />
                </Box>
            </Box>
        </div>
    )

}