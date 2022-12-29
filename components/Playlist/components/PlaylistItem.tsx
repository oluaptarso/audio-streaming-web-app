import {
  removeFromPlaylist,
  playMusic,
} from "providers/audioPlayerSlice";
import { IoCloseOutline, IoPlayOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import ActionButton from "components/ActionButton/ActionButton";
import styles from "./PlaylistItem.module.scss";
import { IMusic } from "interfaces/music";

export type PlaylistItemProps = {
  className?: string;
  music: IMusic;
  playing : boolean
};

const PlaylistItem: React.FC<PlaylistItemProps> = ({ className, music, playing }) => {
  const dispatch = useDispatch();

  const remove = () => {
    dispatch(removeFromPlaylist(music));
  };

  const playThisMusic = () => {
    dispatch(playMusic({ music, fromPlaylist: true }));
  };

  return (
    <div className={`${className} ${styles.playlistItem}`}>
      <div className={`${playing ? styles.playing : ''} ${styles.content}`}>
        <span className={styles.author}>{music.author}</span>-
        <span className={styles.title}>{music.name}</span>
      </div>
      <div className={styles.actions}>
        <ActionButton
          onClick={playThisMusic}
          icon={IoPlayOutline}
        ></ActionButton>
        <ActionButton
          onClick={remove}
          icon={IoCloseOutline}
        ></ActionButton>
      </div>
    </div>
  );
};

export default PlaylistItem;
