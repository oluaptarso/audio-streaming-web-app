"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/store";
import { formatFromSeconds } from "utils";
import ProgressBar from "./components/ProgressBar";
import PlayPauseButton from "./components/PlayPauseButton";
import MusicSummary from "./components/MusicSummary";
import MuteUnmuteButton from "./components/MuteUnmuteButton";
import RepeatButton from "./components/RepeatButton";
import { useAudioPlayerProvider } from "hooks/useAudioPlayerProvider";
import styles from "./AudioPlayer.module.scss";

let showPlayerStateTime = true;

const AudioPlayer: React.FC = () => {
  const { controls, playerState } = useAudioPlayerProvider();
  const [displayTime, setDisplayTime] = useState(0);

  const playlistData = useSelector((state: RootState) => state.audioPlayerStore);
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
    <div className={styles.playerContainer}>
      <div className={styles.player}>
        <MusicSummary
          music={playlistData.currentMusic?.music}
          className={styles.summary}
        />
        <PlayPauseButton className={styles.playPauseButton} />
        <ProgressBar
          max={roundedDownDuration}
          value={getCurrentDisplayTime()}
          onChange={updateProgress}
          onFinalChange={updateTime}
          disabled={!playlistData.currentMusic}
        />
        <div className={styles.footerControls}>
          <span>{formatFromSeconds(getCurrentDisplayTime())}</span>
          <div>
            <MuteUnmuteButton />
            <RepeatButton />
          </div>
          <span>{formatFromSeconds(Math.floor(playerState.duration))}</span>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
