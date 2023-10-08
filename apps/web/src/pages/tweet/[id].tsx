"use client";
import React, { useState, useEffect } from "react";
import { Content } from "ui";
import { ControlButtons } from "ui";
import { PostReply } from "ui";
import { trpc } from "@/utils/trpc";

export const tweet: React.FC = () => {

    const [tweet, setTweet] = useState<any>();
    const [loading, setIsLoading] = useState<boolean>(true);

    const idFromUrl = () => {
        if (typeof window !== 'undefined') {
          const url = window.location.href;
          const idStartIndex = url.indexOf('tweet/') + 'tweet/'.length;
          const id = url.substring(idStartIndex);
          return id;
        }
        return null;
    };
    const id = idFromUrl();

    const tweetMuation = trpc.tweet.getTweetById.useMutation({
        onSuccess: data => {
            console.log(data.tweet);
            setTweet(data.tweet);
        }
    })

    useEffect(() => {
        const getTweet = async () => {
            if (typeof id !== 'string') {
                return;
            } else {
                console.log(id, typeof id);
                await tweetMuation.mutate({
                    id: id
                })
            }
        }
        getTweet();
        setIsLoading(false);
    }, [])

    if (loading) return <>Loading...</>

    return (
        <div>
            <Content tweet={tweet} />
            <ControlButtons />
            <PostReply />
        </div>
    )
}

export default tweet;