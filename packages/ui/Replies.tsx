import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import { TextField, Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { trpc } from "../../apps/web/src/utils/trpc";
import { ReplyModal } from "./ReplyModal";

interface props {
    toShow: any,
    handleCommentPost: (id: string, content: string) => void,
    id: string,
}

export const Replies: React.FC<props> = ({
    toShow,
    handleCommentPost,
    id
}: props) => {

    const [content, setContent] = useState('');
    const [replies, setReplies] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const repliesMutation = trpc.replies.getAllReplies.useMutation({
        onSuccess: data => {
            if (data.code === 403) {
                console.log("An internal error occured while fetching replies");
            } else if (data.code === 200) {
                // @ts-ignore
                setReplies(data.replies);
            }
        }
    })

    useEffect(() => {
        repliesMutation.mutate({
            tweetId: id
        })
        setIsLoading(false);
    }, [replies])

    return (
        <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            style={{
                width: '25vw',
                minHeight: '50vh',
                maxHeight: '50vh',
                border: '2px solid white',
                zIndex: 1,
                overflow: 'auto',
                position: 'fixed',
                top: 20,
                background: '#333333',
                borderRadius: '10px',
                overflowY: 'auto'
            }}
        >
            <div  
                onClick={() => {
                    toShow(false);
                }}
                style={{cursor: 'pointer'}}
            >
                <CloseFullscreenIcon />
            </div>
            <div style={{
                border: '2px solid black',
                minHeight: '33vh',
                width: '20vw',
                margin: 'auto',
                marginTop: '10px',
                borderRadius: '5px',
                overflowY: 'auto' 
            }} >
                {
                    !isLoading ? 
                            replies.map(item => 
                                <ReplyModal item={item} />
                            )
                            : 'Loading...'
                }
            </div>
            <div style={{
                display: 'flex',
                marginLeft: '80px',
                marginTop: '30px',
                alignItems: 'center'
            }} >
                <TextField
                    id="standard-basic"
                    label="Reply..."
                    variant="standard"
                    onChange={e => setContent(e.target.value)}
                    inputProps={{
                        style: {
                        color: 'white', // Text color
                        },
                        placeholder: 'Your Placeholder Text', // Placeholder text
                    }}
                    InputProps={{
                        style: {
                        borderBottomColor: 'green', // Underline color
                        },
                    }}
                />
                <Button variant="contained" endIcon={<SendIcon />} sx={{
                    height: '3vh',
                    marginLeft: '20px',
                    marginTop: '10px'
                }} onClick={() => {
                    handleCommentPost(id, content);
                }} >Send</Button>
            </div>
        </motion.div>
    )
}