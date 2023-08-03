function Cart() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Your cart</h2>
    </div>
  );
}

export default Cart;
