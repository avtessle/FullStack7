import styles from "./Profile.module.css";

function Profile({ soldProducts }) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const allProducts = JSON.parse(localStorage.getItem("allProducts"));
  const isManager = user.status === "admin";
  const groupedProducts = {};

  const sortedSoldProducts = [...soldProducts].sort(
    (a, b) => b.quantity - a.quantity
  );

  const getProductDescription = (productId) => {
    const product = allProducts.find((p) => p.id === productId);
    return product
      ? product.description
      : console.warn(`Product with ID not found in allProducts.`);
  };

  soldProducts.forEach((product) => {
    if (!groupedProducts[product.purchaseId]) {
      groupedProducts[product.purchaseId] = [];
    }

    const correspondingProduct = allProducts.find(
      (p) => p.id === product.productId
    );

    if (correspondingProduct) {
      groupedProducts[product.purchaseId].push({
        ...product,
        description: correspondingProduct.description,
      });
    } else {
      console.warn(
        `Product with ID ${product.productId} not found in allProducts.`
      );
    }
  });

  return (
    <div>
      <div className={styles.userProfile}>
        <h1>{user.name}</h1>
        <h3>{user.email}</h3>
        <h3> {user.phone}</h3>
        <h3> {user.status}</h3>
      </div>

      <div className={styles.soldProducts}>
        {!isManager && (
          <div>
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
        )}

        {isManager && (
          <div>
            <h2 className={styles.soldProductsTitle}>Best Sellers</h2>
            <ul>
              {sortedSoldProducts.map((product) => (
                <li key={product.id}>
                  {getProductDescription(product.productId)} - Quantity:{" "}
                  {product.quantity}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
