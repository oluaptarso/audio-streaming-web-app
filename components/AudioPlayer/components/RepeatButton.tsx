import { IoRepeatOutline } from "react-icons/io5";
import { useAudioPlayerProvider } from "hooks/useAudioPlayerProvider";
import styles from "./RepeatButton.module.scss";

const RepeatButton: React.FC = () => {
  const { controls, playerState } = useAudioPlayerProvider();

  return (
    <button
      className={`
        ${styles.repeatButton} 
        ${playerState.repeat ? styles.active : ""}
      `}
      onClick={controls.toggleRepeat}
    >
      <IoRepeatOutline />
    </button>
  );
};

export default RepeatButton;
