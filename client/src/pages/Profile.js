import styles from "./Profile.module.css";

function Profile({ soldProducts }) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const allProducts = JSON.parse(localStorage.getItem("allProducts"));

  const groupedProducts = {};

  soldProducts.forEach((product) => {
    if (!groupedProducts[product.purchaseId]) {
      groupedProducts[product.purchaseId] = [];
    }
    const correspondingProduct = allProducts.find(
      (p) => p.id === product.productId
    );

    groupedProducts[product.purchaseId].push({
      ...product,
      description: correspondingProduct.description,
    });
  });

  return (
    <div>
      <div className={styles.userProfile}>
        <h2 className={styles.userName}>User Profile</h2>
        <p className={styles.userInfo}>
          <strong>Name:</strong> {user.name}
        </p>
        <p className={styles.userInfo}>
          <strong>Email:</strong> {user.email}
        </p>
        <p className={styles.userInfo}>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p className={styles.userInfo}>
          <strong>Status:</strong> {user.status}
        </p>
      </div>

      <div className={styles.soldProducts}>
        <h2 className={styles.soldProductsTitle}>Shopping history</h2>
        {Object.keys(groupedProducts).map((purchaseId) => (
          <div key={purchaseId} className={styles.purchaseContainer}>
            <h3 className={styles.purchaseTitle}>Purchase: {purchaseId}</h3>
            <ul className={styles.productList}>
              {groupedProducts[purchaseId].map((product, index) => (
                <li key={index} className={styles.productItem}>
                  <p>{product.description}</p>
                  <p>Quantity: {product.quantity}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
