"use client"
import { trpc } from "@/utils/trpc";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, CreateTweetModal } from "ui"; 

export default function Home() {

  const [CreateTweetModalDisplay, setCreateTweetModalDisplay] = useState(false);
  const [user, setUser] = useState('');
  const [tweets, setTweets] = useState<any[]>([]);
  const userMuation = trpc.user.me.useMutation({
    onSuccess: data => {
      setUser(JSON.stringify(data.user))
    }
  });
  const tweetsQuery = trpc.tweet.getAllTweets.useQuery();

  useEffect(() => {
    if (!tweetsQuery.isLoading) {
      console.log(tweetsQuery.data?.tweets);
      if (tweetsQuery.data?.tweets) {
        setTweets(tweetsQuery.data.tweets);
      }
    }
  }, [tweetsQuery]);
  
  useEffect(() => {
    // here we are loading user information so that we can pass it in Card modal
    let token;
    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('token');
    }
    if (!token) {
      return;
    }
    userMuation.mutate({userID: token});
    
  }, [])

  const createTweet = trpc.tweet.createTweet.useMutation({
    onSuccess: data => {
      if (data.code === 201) {
        toast("Tweet created successfully!");
        setCreateTweetModalDisplay(false);
      } else if (data.code === 403) {
        toast(data.message);
      }
    }
  });

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }} >
      {
        tweets.map((item, key) => (
            <Card
              key={key}
              avatarPic={item.avatarPic}
              username={item.username}
              email={item.email}
              time="12 H"
              content={item.content}
              replyCount={item.RepliesCount}
              retweet={item.reTweetCount}
              likes={item.Likes}
            />
        ))
      }
       {
        user ? 
        <CreateTweetModal 
          username={JSON.parse(user).username}
          email={JSON.parse(user).email}
          toShow={CreateTweetModalDisplay}
          handleClose={() => {
            setCreateTweetModalDisplay(false);
          }}
          handleSubmit={async (data) => {
            createTweet.mutate(data);
          }}
        /> : ''
       }
       <button onClick={() => {
          setCreateTweetModalDisplay(true);
       }}>Post Tweet</button>
    </div>
  )
}
