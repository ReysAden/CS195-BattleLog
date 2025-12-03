import "./Auth.css"

function Register ()
{
  return (
    <div className="register-Box">
      <h1>Register</h1>
      <input type="text" placeholder="Enter a username" />
      <button type="submit">Submit</button>
      <footer>click here to sign in</footer>
    </div>
  )
}

export default Register;