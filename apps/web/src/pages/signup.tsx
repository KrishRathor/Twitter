"use client"
import { trpc } from "@/utils/trpc";
import { useRecoilState } from "recoil";
import { SignupForm } from "ui";
import { signupData } from "./state/user/Signupdata";

const Signup = () => {

    const userSignup = trpc.user.signup.useMutation({
        onSuccess: data => {
            console.log(data);
        }
    });

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '15vh'
        }} >
            <SignupForm title="Sign Up"  onSubmit={async (signupData) => {
                await userSignup.mutate(signupData);
            }}
            />
        </div>
    )
}

export default Signup;