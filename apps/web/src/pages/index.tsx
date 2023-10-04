"use client"
import { handleCommentPost } from "@/helpers/handleCommentPost";
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
  const tweetsQuery = trpc.tweet.getAllTweets.useMutation({
    onSuccess: data => {
      setTweets(data.tweets)
    }
  });
  const createPostMutation = trpc.replies.postReply.useMutation({
    onSuccess: data => {
        if (data.code === 403) {
            toast(data.message);
        } else if (data.code === 201) {
            toast(data.message);
        }
    }
}) 

  useEffect(() => {
    tweetsQuery.mutate();
  }, [tweets])
  
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
      <div style={{
        overflowY: 'auto',
        maxHeight: '90vh'
      }}>
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
              id={item.id}
              handleCommentPost={(id, content) => {
                createPostMutation.mutate({
                  tweetId: id,
                  userId: localStorage.getItem('token'),
                  content: content
              })
              }}
            />
        ))
        }
      </div>
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
