export default function Login() {
  return (
    <main className="page">
      <h1 className="page-title">Login</h1>
      <form className="auth-form">
        <label>
          Username
          <input type="text" />
        </label>
        <label>
          Password
          <input type="password" />
        </label>
        <button type="submit">Log In</button>
      </form>
    </main>
  );
}
