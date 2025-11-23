export default function Register() {
  return (
    <main className="page">
      <h1 className="page-title">Register</h1>
      <form className="auth-form">
        <label>
          Username
          <input type="text" />
        </label>
        <label>
          Password
          <input type="password" />
        </label>
        <label>
          Confirm Password
          <input type="password" />
        </label>
        <button type="submit">Create Account</button>
      </form>
    </main>
  );
}
