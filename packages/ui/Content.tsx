import React, { useEffect, useState } from "react";
import { Typography, Avatar } from "@mui/material";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useRouter } from "next/navigation";

interface props {
    tweet: any
}

export const Content: React.FC<props> = ({
    tweet
}) => {

    const router = useRouter();

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40vw',
            margin: 'auto',
            border: '2px solid white'
        }}>
            <div style={{display: 'flex', border: '2px solid white', width: '100%'}}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '10px',
                    cursor: 'pointer' 
                }} onClick={() => {
                    router.back();
                }} >
                    <KeyboardBackspaceIcon />
                </div>
                <Typography variant="h5" sx={{marginLeft: '1vw'}} >Post</Typography>
            </div>
            <div>
                <Avatar alt={tweet?.username} src="/static/images/avatar/1.jpg" sx={{cursor: "pointer"}} />
            </div>
        </div>
    )
}