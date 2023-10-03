import { trpc } from "@/utils/trpc";
import React from "react";
import { toast } from "react-toastify";
import { LoginForm } from "ui";
import { useRouter } from "next/router";

const Login: React.FC = () => {

    const router = useRouter();

    const userLogin = trpc.user.login.useMutation({
        onSuccess: data => {
            if (data.code === 401) {
                toast(data.message);
            } else if (data.code === 200) {
                localStorage.setItem('token', data.token);
                toast(data.message);
                router.push('/');
            }
        }
    });

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '15vh'
        }} >
            <LoginForm title="Log In" onSubmit={async data => {
                userLogin.mutate(data);
            }} />
        </div>
    )
}

export default Login;