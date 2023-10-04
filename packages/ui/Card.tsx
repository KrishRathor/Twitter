import React, { useEffect, useState } from "react";
import { Avatar, Typography } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { motion } from "framer-motion";
import { Replies } from "./Replies";

interface props {
    avatarPic: string,
    username: string,
    email: string,
    time: string,
    content: string,
    replyCount: number,
    retweet: number,
    likes: number,
    handleCommentPost: (id: string, content: string) => void,
    id: string
};

export const Card: React.FC<props> = ({
    avatarPic,
    username,
    email,
    time,
    content,
    replyCount,
    retweet,
    likes,
    handleCommentPost,
    id
}: props) => {

    const [isVisible, setIsVisible] = useState(false);

    return (
        <div style={{
            minHeight: '18vh',
            width: '34vw',
            border: '2px solid white',
            borderRadius: '10px',
            background: '#0A0A0A',
            marginTop: '20px'
        }}>
            <div style={{marginTop: '8px', marginLeft: '10px', display: 'flex'}}>
                <Avatar alt={username} src="/static/images/avatar/1.jpg" sx={{cursor: "pointer"}} />
                <div style={{
                    display: 'flex',
                    marginLeft: '30px',
                    alignItems: 'center'
                }}>
                    <Typography variant="subtitle1"> {username} </Typography>
                    <Typography variant="subtitle1" sx={{marginLeft: '20px', color: 'gray'}} > {email} </Typography>
                    <Typography variant="h5" sx={{marginLeft: '20px', color: 'gray', marginTop: '-15px'}} > . </Typography>
                    <Typography variant="subtitle1" sx={{marginLeft :'20px', color: 'gray'}} > {time} </Typography>
                </div>
            </div>
            <div style={{marginLeft: '20px', marginRight: '20px', marginTop: '10px'}}>
                <Typography variant="h6"> {content} </Typography>
            </div>
            <div style={{
                display: 'flex',
                marginTop: '15px',
                marginLeft: '20px',
                marginBottom: '10px',
                justifyContent: 'space-evenly'
            }}>
                <div style={{display: 'flex'}} >
                    <div onClick={() => { 
                        setIsVisible(!isVisible);
                    }} >
                        <ChatBubbleOutlineIcon sx={{cursor: 'pointer'}} />
                    </div>
                    {
                        isVisible ? 
                            <Replies 
                                id={id} 
                                toShow={setIsVisible} 
                                handleCommentPost={handleCommentPost} 
                            /> 
                            : ''
                    }
                    <Typography variant="subtitle1" sx={{color: 'gray', marginLeft: '3px'}}> {replyCount} </Typography>
                </div>
                <div style={{display: 'flex'}} >
                    <div>
                        <DynamicFeedIcon sx={{cursor: 'pointer'}} />
                    </div>
                    <Typography variant="subtitle1" sx={{color: 'gray', marginLeft: '3px'}}> {retweet} </Typography>
                </div>
                <div style={{display: 'flex'}} >
                    <div>
                        <FavoriteBorderIcon sx={{cursor: 'pointer'}} />
                    </div>
                    <Typography variant="subtitle1" sx={{color: 'gray', marginLeft: '3px'}}> {likes} </Typography>
                </div>
                <div>
                    <ShareIcon sx={{cursor: 'pointer'}} />
                </div>
            </div>
        </div>
    )
}