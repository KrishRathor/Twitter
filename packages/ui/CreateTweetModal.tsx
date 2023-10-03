import React, { useState } from "react";
import { Avatar, TextField, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface props {
    toShow: boolean,
    username: string,
    handleClose: () => void;
};

export const CreateTweetModal: React.FC<props> = ({
    toShow,
    username,
    handleClose
}: props) => {

    return (
        <div style={{
            display: toShow ? 'block' : 'none',
            position: 'fixed',
            zIndex: 1,
            left: 615,
            top: 200,
            width: '30vw',
            minHeight: '25vh',
            overflow: 'auto',
            background: '#333333',
            borderRadius: '10px'
        }} >
            <div style={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    marginLeft: '90%',
                    marginTop: '10px',
                    cursor: 'pointer',
                    width: '2vw'
                }} 
                onClick={handleClose} >
                <CloseIcon />
            </div>
            <div style={{
                display: 'flex',
            }} >
                <Avatar alt={username} src="/static/images/avatar/1.jpg" sx={{cursor: "pointer", marginLeft: '10px', marginTop: '20px'}} />
                <TextField
                    id="outlined-textarea"
                    label="Enter your tweet"
                    placeholder="Tweet..."
                    multiline
                    sx = {{
                        marginTop: '30px',
                        marginLeft: '20px',
                        width: '25vw',
                        border: '2px solid white'
                    }}
                    InputProps={{
                        style: { color: 'white' }, // Change 'red' to the desired text color
                    }}
                />
            </div>
            <hr style={{
                marginTop: '40px',
                width: '25vw',
                marginLeft: '40px'
            }} />
            <div style={{display: 'flex', flexDirection: 'row-reverse'}}>
                <Button variant="contained" sx={{
                    marginTop: '20px',
                    marginRight: '60px'
                }} >Post</Button>
            </div>
        </div>
    )

}