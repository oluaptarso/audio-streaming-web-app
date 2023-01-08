import { useSelector } from "react-redux";
import { RootState } from "store/store";
import PlayPauseButton from "./components/PlayPauseButton";
import MusicSummary from "./components/MusicSummary";
import MuteUnmuteButton from "./components/MuteUnmuteButton";
import RepeatButton from "./components/RepeatButton";
import AudioVisualization from "./components/AudioVisualization";
import TimeBar from "./components/TimeBar";
import styles from "./AudioPlayer.module.scss";

const AudioPlayer: React.FC = () => {
  const playlistData = useSelector(
    (state: RootState) => state.audioPlayerStore
  );

  return (
    <div className={styles.playerContainer}>
      <div className={styles.player}>
        <MusicSummary
          music={playlistData.currentMusic?.music}
          className={styles.summary}
        />
        <div className={styles.playPauseButtonContainer}>
          <AudioVisualization className={styles.visualization} />
          <PlayPauseButton className={styles.playPauseButton} />
        </div>
        <TimeBar />
        <div className={styles.footerControls}>
          <div>
            <MuteUnmuteButton />
            <RepeatButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
