import { IMusic } from "interfaces/music";
import styles from "./MusicSummary.module.scss";

export type MusicSummaryProps = {
  music?: IMusic;
  className?: string;
};

const MusicSummary: React.FC<MusicSummaryProps> = ({
  music,
  className,
}: MusicSummaryProps) => {
  return music ? (
    <div className={`${className} ${styles.summary}`}>
      <span className={styles.author}>{music.author}</span> -{" "}
      <span className={styles.title}>{music.name}</span>
    </div>
  ) : (
    <div className={`${className} ${styles.summary}`}>
      <span className={styles.title}>🎵 Play some music 🎵</span>
    </div>
  );
};

export default MusicSummary;
