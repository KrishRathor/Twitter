import { SignupForm } from "ui";

const Signup = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '15vh'
        }} >
            <SignupForm title="Sign Up" onSubmit={() => console.log('first')} />
        </div>
    )
}

export default Signup;