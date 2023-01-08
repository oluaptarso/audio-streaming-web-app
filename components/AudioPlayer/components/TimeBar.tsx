import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { formatFromSeconds } from "utils";
import ProgressBar from "./ProgressBar";
import { useAudioPlayerProvider } from "hooks/useAudioPlayerProvider";
import styles from "./TimeBar.module.scss";

let showPlayerStateTime = true;

const TimeBar: React.FC = () => {
  const { controls, playerState } = useAudioPlayerProvider();
  const [displayTime, setDisplayTime] = useState(0);

  const playlistData = useSelector(
    (state: RootState) => state.audioPlayerStore
  );
  const roundedDownDuration = playerState.duration
    ? Math.floor(playerState.duration)
    : 1;

  const getCurrentDisplayTime = () => {
    return Math.floor(showPlayerStateTime ? playerState.time : displayTime);
  };

  const updateProgress = (values: number[]) => {
    if (showPlayerStateTime) showPlayerStateTime = false;
    setDisplayTime(values[0]);
  };

  const updateTime = (values: number[]) => {
    controls.seek(values[0]);
    setTimeout(() => {
      showPlayerStateTime = true;
    }, 100);
  };

  return (
    <div className={styles.timeBarContainer}>
      <ProgressBar
        max={roundedDownDuration}
        value={getCurrentDisplayTime()}
        onChange={updateProgress}
        onFinalChange={updateTime}
        disabled={!playlistData.currentMusic}
      />
      <span className={styles.time}>{formatFromSeconds(getCurrentDisplayTime())}</span>
      <span className={styles.duration}>{formatFromSeconds(Math.floor(playerState.duration))}</span>
    </div>
  );
};

export default TimeBar;
