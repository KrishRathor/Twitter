import React, { useEffect, useState } from "react";
import { Avatar, Typography, Box } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Replies } from "./Replies";
import { trpc } from "../../apps/web/src/utils/trpc";

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
    id: string,
    token: string | null,
    createToast: (arg0: string) => void,
    changeTweetState: () => void,
    isReTweet: boolean,
    push: (id: string) => void
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
    id,
    token,
    createToast,
    changeTweetState,
    isReTweet,
    push
}: props) => {

    const [isVisible, setIsVisible] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [fromUserEmail, setFromUserEmail] = useState<string>();
    const [isLoading, setIsLoading] = useState(true);
    const [display, setDisplay] = useState<boolean>(false);
    const [shareLink, setShareLink] = useState('');

    const checkLikeMutation = trpc.likes.ifLike.useMutation({
        onSuccess: data => {
            setIsLiked(data.status);
        }
    });

    const likeMutation = trpc.likes.like.useMutation({
        onSuccess: async data => {
            setIsLiked(true);
            await changeTweetState();
        }
    });

    const unLikeMutation = trpc.likes.unLike.useMutation({
        onSuccess: async data => {
            setIsLiked(false);
            await changeTweetState();
        }
    });

    useEffect(() => {
        const getLikeData = async () => {
            await checkLikeMutation.mutate({
                tweetId: id,
                userEmail: token
            })
        }
        getLikeData();
    }, [id, token])

    const reTweetMutation = trpc.reTweet.reTweet.useMutation({
        onSuccess: async data => {
            console.log(data)
            await changeTweetState();
        }
    })

    const getFromUser = trpc.reTweet.getFromUser.useMutation({
        onSuccess: data => {
            console.log(data);
            setFromUserEmail(data.fromUserEmail);
        }
    })

    useEffect(() => {
        const getUser = async () => {
            await getFromUser.mutate({
                tweetId: id,
                userEmail: token
            })
        }
        getUser();
        setIsLoading(false);
    }, [])

    const handleShare = (id: string) => {
        const urlToShare = `http://localhost:3000/tweet/${id}`;
        console.log(urlToShare);
        setShareLink(urlToShare);
        setDisplay(!display);
    }

    if (isLoading) return <>Loading...</>;

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

            {
                isReTweet ? 
                    <div 
                        style={{
                            marginLeft: '5vw'  
                        }} 
                    >
                        <Typography variant="subtitle2" sx={{color: 'gray'}} > retweeted from {fromUserEmail} </Typography>
                    </div>
                : ''
            }
            
            <div style={{marginLeft: '20px', marginRight: '20px', marginTop: '10px', cursor: 'pointer'}} onClick={() => {
                push(`tweet/${id}`);  
            }} >
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
                    <div onClick={async () => {
                        console.log('clicked retweet');
                        if (!token) {
                            createToast("Please login before continuing");
                        }
                        await reTweetMutation.mutate({
                            tweetId: id,
                            userEmail: token,
                            fromUserEmail: email
                        })
                    }} >
                        <DynamicFeedIcon sx={{cursor: 'pointer'}} />
                    </div>
                    <Typography variant="subtitle1" sx={{color: 'gray', marginLeft: '3px'}}> {retweet} </Typography>
                </div>
                <div style={{display: 'flex'}} >
                    <div onClick={async () => {
                        if (!token) {
                            createToast("Please login before continuing");
                            return;
                        }
                        isLiked ? 
                            await unLikeMutation.mutate({
                                tweetId: id,
                                userEmail: token
                            })
                            :
                            await likeMutation.mutate({
                                tweetId: id,
                                userEmail: token
                            })
                    }} >
                        <FavoriteBorderIcon sx={{cursor: 'pointer', color: isLiked ? 'red' : '' }} />
                    </div>
                    <Typography variant="subtitle1" sx={{color: 'gray', marginLeft: '3px'}}> {likes} </Typography>
                </div>
                <div>
                    <ShareIcon sx={{cursor: 'pointer'}} onClick={() => handleShare(id)} />
                </div>
            </div>
            <div style={{
                position: 'relative',
                display: display ? 'block' : 'none',
                justifyContent: 'center',
                alignItems: 'center',
                background: 'gray',
                width: '90%',
                margin: 'auto',
                padding: '2px',
                borderRadius: '5px'
            }} >
                <Box sx={{
                    display: 'flex'
                }} >
                    <Typography variant="subtitle1">{shareLink}</Typography>
                    <div style={{
                        cursor: 'pointer'
                    }} onClick={async () => {
                        await navigator.clipboard.writeText(shareLink);
                        createToast("Link copied successfully!")
                    }} >
                        <ContentCopyIcon />
                    </div>
                </Box>
            </div>
        </div>
    )
}