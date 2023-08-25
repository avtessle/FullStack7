import styles from "./Profile.module.css";

function Profile({ soldProducts }) {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const allProducts = JSON.parse(localStorage.getItem("allProducts"));
  const isManager = user.status === "admin";

  //create a list of sorted sold products- for manager
  const sortedSoldProducts = {};
  for (const product of soldProducts) {
    if (sortedSoldProducts[product.productId]) {
      sortedSoldProducts[product.productId].quantity += product.quantity;
    } else {
      sortedSoldProducts[product.productId] = { ...product };
    }
  }
  const sortedSoldProductsArray = Object.values(sortedSoldProducts).sort(
    (a, b) => b.quantity - a.quantity
  );

  //get description of the sold product
  const getProductDescription = (productId) => {
    const product = allProducts.find((p) => p.id === productId);
    return product
      ? product.description
      : console.warn(`Product with ID not found in allProducts.`);
  };

  //create a list of grouped sold products of user- for user
  const groupedProducts = {};
  soldProducts.forEach((product) => {
    if (product.userId === user.id) {
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
                <div className={styles.purchaseHeader}>
                  <h3 className={styles.purchaseTitle}>
                    Purchase {purchaseId}
                  </h3>
                  <h4 className={styles.purchaseDate}>
                    {
                      new Date(groupedProducts[purchaseId][0].date)
                        .toISOString()
                        .split("T")[0]
                    }
                  </h4>
                </div>
                <ul className={styles.productList}>
                  {groupedProducts[purchaseId].map((product, index) => (
                    <li key={index} className={styles.productItem}>
                      <p className={styles.productDescription}>
                        {product.description}
                      </p>
                      <p className={styles.productQuantity}>
                        Quantity: {product.quantity}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {isManager && (
          <div className={styles.bestSellersContainer}>
            <h2 className={styles.soldProductsTitle}>Best Sellers</h2>
            <ul className={styles.soldProductsList}>
              {sortedSoldProductsArray.map((product) => (
                <li key={product.purchaseId} className={styles.soldProductItem}>
                  <span className={styles.productDescriptionM}>
                    {getProductDescription(product.productId)}
                  </span>
                  <span className={styles.productQuantityM}>
                    Quantity: {product.quantity}
                  </span>
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
