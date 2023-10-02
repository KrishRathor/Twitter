import { LoginForm } from "ui";
 
export default function Home() {

  const handleSubmit = () => {
    console.log('first');
  }

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2vh'}} >
      <LoginForm title="Log In" onSubmit={handleSubmit} />
    </div>
  )
}
