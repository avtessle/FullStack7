import styles from "./Cart.module.css";

function Profile() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
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
    </div>
  );
}

export default Profile;
