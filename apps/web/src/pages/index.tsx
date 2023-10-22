"use client"
import { trpc } from "@/utils/trpc";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Card, CreateTweetModal } from "ui";
import { useRouter } from "next/router";

let repliesMutation;

export default function Home() {

  const [CreateTweetModalDisplay, setCreateTweetModalDisplay] = useState(false);
  const [rerunTweetQuery, setRerunTweetQuery] = useState(false);
  const [user, setUser] = useState();
  const [tweets, setTweets] = useState<any[]>([]);
  const router = useRouter();  

  const userMuation = trpc.user.me.useMutation({
    onSuccess: data => {
      // @ts-ignore
      setUser(JSON.stringify(data.user));
    }
  });
  const tweetsQuery = trpc.tweet.getAllTweets.useMutation({
    onSuccess: data => {
      console.log("data", data.tweets);
      const sortedArray = data.tweets.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      setTweets(sortedArray);
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
  });
  repliesMutation = trpc.replies.getAllReplies.useMutation({
    onSuccess: data => {
      if (data.code === 403) {
        toast("An internal error occured");
      } else if (data.code === 200) {
        // do something
      } 
    }
  })

  const changeTweetState = async () => {
    await tweetsQuery.mutate();
    await setRerunTweetQuery(!rerunTweetQuery);
  }

  useEffect(() => {
    const fetchTweets = async () => {
      await tweetsQuery.mutate();
    }
    fetchTweets();
  }, [CreateTweetModalDisplay, rerunTweetQuery]);
  
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

  const createToast = (content: string) => {
    toast(content);
  }

  const push = (url: string) => {
    router.push(url);
  }

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
              handleCommentPost={async (id, content) => {
                await createPostMutation.mutate({
                  tweetId: id,
                  userId: localStorage.getItem('token'),
                  content: content
              })
              }}
              token={localStorage.getItem('token')}
              createToast={createToast}
              changeTweetState={changeTweetState}
              isReTweet={item.isReTweet}
              push={push}
            />
        ))
        }
      </div>
       {
        <CreateTweetModal 
          username={ user && JSON.parse(user) ? JSON.parse(user).username : ''}
          email={user && JSON.parse(user) ? JSON.parse(user).email : ''}
          toShow={CreateTweetModalDisplay}
          handleClose={() => {
            setCreateTweetModalDisplay(false);
          }}
          handleSubmit={async (data) => {
            createTweet.mutate(data);
          }}
        />
       }
       <button onClick={() => {
          setCreateTweetModalDisplay(true);
       }}>Post Tweet</button>
    </div>
  )
}

export { repliesMutation };