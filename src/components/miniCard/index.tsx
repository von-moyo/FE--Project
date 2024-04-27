import styles from "./styles.module.scss";
interface MiniCardData {
  users: string;
  header: string;
  image: string;
}

const MiniCard: React.FC<MiniCardData> = ({ users, header, image }) => {
  return (
    <div className={styles.users}>
      <img src={image} alt="" className={styles.icon}/>
      <p className={styles.usersHead}>{header}</p>
      <div className={styles.usersNumber}>{users}</div>
    </div>
  );
};

export { MiniCard };
