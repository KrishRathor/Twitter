"use client"
import { trpc } from "@/utils/trpc";
import { toast } from "react-toastify";
import { SignupForm } from "ui";
import { useRouter } from "next/router";

const Signup = () => {

    const router = useRouter();

    const userSignup = trpc.user.signup.useMutation({
        onSuccess: data => {
            if (data.code === 201) {
                toast("User created Successfully!");
            } else if (data.code === 403) {
                toast("Email already registered!");
            }
            router.push('/login')   
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