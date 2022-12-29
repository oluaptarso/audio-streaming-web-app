import {
  addMusicToPlaylist,
  playMusic,
} from "providers/audioPlayerSlice";
import { IoListOutline, IoPlayOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import ActionButton from "components/ActionButton/ActionButton";
import styles from "./MusicItem.module.scss";
import { IMusic } from "interfaces/music";

export type MusicItemProps = {
  className?: string;
  music: IMusic;
};

const MusicItem: React.FC<MusicItemProps> = ({ className, music }) => {
  const dispatch = useDispatch();

  const addToPlaylist = () => {
    const id = +new Date();
    dispatch(addMusicToPlaylist({ ...music, id }));
  };

  const playThisMusic = () => {
    dispatch(playMusic({ music, fromPlaylist: false }));
  };

  return (
    <div className={`${className} ${styles.musicItem}`}>
      <div className={styles.content}>
        <span className={styles.author}>{music.author}</span>-
        <span className={styles.title}>{music.name}</span>
      </div>
      <div className={styles.actions}>
        <ActionButton
          onClick={playThisMusic}
          icon={IoPlayOutline}
        ></ActionButton>
        <ActionButton
          onClick={addToPlaylist}
          icon={IoListOutline}
        ></ActionButton>
      </div>
    </div>
  );
};

export default MusicItem;
