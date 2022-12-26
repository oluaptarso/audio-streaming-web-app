import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5";
import { useAudioPlayerProvider } from "hooks/useAudioPlayerProvider";
import styles from "./MuteUnmuteButton.module.scss";

const MuteUnmuteButton: React.FC = () => {
  const { controls, playerState } = useAudioPlayerProvider();

  return (
    <button
      className={`
        ${styles.muteUnmuteButton} 
        ${!playerState.muted ? styles.active : ""}
      `}
      onClick={playerState.muted ? controls.unmute : controls.mute}
    >
      {playerState.muted ? <IoVolumeMuteOutline /> : <IoVolumeHighOutline />}
    </button>
  );
};

export default MuteUnmuteButton;
