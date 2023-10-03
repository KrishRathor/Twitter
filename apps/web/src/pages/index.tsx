import { trpc } from "@/utils/trpc";
import { Card } from "ui"; 

export default function Home() {

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
    </div>
  )
}
