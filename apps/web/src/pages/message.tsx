import websocket from "@/helpers/websocket";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Message = () => {

    const ws = new WebSocket("ws://localhost:2000");
    const router = useRouter();

    const sendMessage = () => {
        ws.send("hi");
    }

    const [currentUser, setCurrentUser] = useState<string>("");

    useEffect(() => {
        const user = localStorage.getItem('token');
        if (user) {
            setCurrentUser(user);
        }
    }, [])



    return (
        <div>
            <button onClick={sendMessage} >Click</button>
            <ul>
                <li onClick={() => {
                    router.push('/chat/a');
                    ws.send(JSON.stringify({
                        from: currentUser,
                        to: 'a',
                        type: 'join'
                    }))
                }} >a</li>
                <li onClick={() => {
                    router.push('/chat/b') 
                }} >b</li>
                <li onClick={() => {
                    router.push('/chat/c') 
                }} >c</li>
            </ul>
        </div>
    )
}

export default Message;