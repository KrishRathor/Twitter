import { useState } from "react";
import { Card, CreateTweetModal } from "ui"; 

export default function Home() {

  const [CreateTweetModalDisplay, setCreateTweetModalDisplay] = useState(false);

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh'}} >
      <Card 
          avatarPic=""
          username="Krish"
          email="@krishrathor18"
          time="12 H"
          content="success depends on the request method used: GET: The requested resource has been fetched and transmitted to the message body"
          replyCount={120}
          retweet={24}
          likes={450}
       />
       <CreateTweetModal username="Krish" toShow={CreateTweetModalDisplay} handleClose={() => {
        setCreateTweetModalDisplay(false);
       }} />
       <button onClick={() => {
          console.log('first');
          setCreateTweetModalDisplay(true);
       }}>Post Tweet</button>
    </div>
  )
}
