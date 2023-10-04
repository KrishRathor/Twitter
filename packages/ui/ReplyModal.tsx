import React from "react";
import { Typography } from "@mui/material";

interface props {
    item: {
        id: string,
        tweetId: string,
        userId: string,
        content: string,
        createdAt: string
    }
}

export const ReplyModal: React.FC<props> = ({
    item
}: props) => {
    return (
        <div style={{
            margin: '10px'
        }} >
            <hr style={{color: 'white'}} />
            <p>{item.userId}</p>
            <Typography variant={'h6'}>{item.content}</Typography>
            <hr style={{color: 'white'}} />
        </div>
    )
}