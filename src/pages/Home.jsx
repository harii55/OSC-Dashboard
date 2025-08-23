function Home({ user, signOut }) {
  const username =
    user?.user_metadata?.user_name || user?.user_metadata?.full_name || "User";
  const email = user?.email;

  return (
    <div>
      <h1>Welcome, {username}!</h1>
      <p>Email: {email}</p>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}

export default Home;
