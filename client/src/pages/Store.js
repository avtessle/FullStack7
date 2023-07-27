function Store() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <h1>Hello, {user.name}!</h1>
  );
}

export default Store;