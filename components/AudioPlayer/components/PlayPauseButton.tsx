import { IoPlayOutline, IoPauseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useAudioPlayerProvider } from "hooks/useAudioPlayerProvider";
import { RootState } from "store/store";
import styles from "./PlayPauseButton.module.scss";

export type PlayPauseButtonProps = {
  className?: string;
};

const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({
  className,
}: PlayPauseButtonProps) => {
  const { controls, playerState } = useAudioPlayerProvider();
  const currentMusic = useSelector(
    (state: RootState) => state.audioPlayerStore.currentMusic
  );
  const disabled = currentMusic === null;
  return (
    <button
      type="button"
      className={`${className} ${styles.playPauseButton}`}
      disabled={disabled}
      onClick={playerState.playing ? controls.pause : controls.play}
    >
      {playerState.playing && !disabled ? (
        <IoPauseOutline size={24} />
      ) : (
        <IoPlayOutline size={24} className={styles.playIcon} />
      )}
    </button>
  );
};

export default PlayPauseButton;
