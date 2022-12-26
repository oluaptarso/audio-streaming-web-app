import styles from "./MusicListSkeleton.module.scss";

export type MusicListSkeletonProps = {
  className?: string;
};

const MusicListSkeleton: React.FC<MusicListSkeletonProps> = ({
  className = "",
}) => {
  return (
    <ul className={`${className} ${styles.musicListSkeleton} `}>
      {[...Array(10)].map((_, i) => (
        <li key={`skel-${i}`}>
          <div className={styles.content}></div>
          <div className={styles.actions}>
            <div className={styles.action}></div>
            <div className={styles.action}></div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MusicListSkeleton;
