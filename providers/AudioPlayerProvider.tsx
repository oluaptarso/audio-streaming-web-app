import React, { useEffect, useState } from "react";
import { useSetState } from "../hooks/useSetState";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import {
  getNextMusic,
  playMusic,
} from "./audioPlayerSlice";

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState
const HAVE_ENOUGH_DATA = 4;

interface PlayerState {
  duration: number;
  paused: boolean;
  muted: boolean;
  time: number;
  volume: number;
  playing: boolean;
  repeat: boolean;
}

interface Controls {
  play: () => Promise<void> | void;
  pause: () => void;
  mute: () => void;
  unmute: () => void;
  volume: (volume: number) => void;
  seek: (time: number) => void;
  toggleRepeat: () => void;
}

interface IAudioProviderApi {
  player: HTMLAudioElement | null;
  controls: Controls;
  playerState: PlayerState;
}

export const AudioProviderContext =
  React.createContext<IAudioProviderApi | null>(null);

export const AudioProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  //#region State/Hooks declaration / initialization
  const [playerState, setState] = useSetState<PlayerState>({
    time: 0,
    duration: 0,
    paused: true,
    muted: false,
    volume: 1,
    playing: false,
    repeat: false,
  });

  const [player, setPlayer] = useState<HTMLAudioElement | null>(null);

  const playlistData = useSelector((state: RootState) => state.audioPlayerStore);

  const dispatch = useDispatch();
  //#endregion State/Hooks declaration / initialization

  //#region Events methods declaration
  const onPlay = () => {
    if (!player) {
      return;
    }

    if (player.duration) setState({ paused: false });
  };
  const onPlaying = () => setState({ playing: true });
  const onWaiting = () => setState({ playing: false });
  const onPause = () => setState({ paused: true, playing: false });
  const onVolumeChange = () => {
    if (!player) {
      return;
    }
    setState({
      muted: player.muted,
      volume: player.volume,
    });
  };
  const onDurationChange = (e: any) => {
    if (!player) {
      return;
    }
    const { duration } = player;
    setState({ duration });
  };
  const onTimeUpdate = () => {
    if (!player) {
      return;
    }
    setState({ time: player.currentTime });
  };
  const onEnded = () => {
    const nextMusic = getNextMusic(playlistData);
    if (nextMusic) {
      const nextMusicIndex = playlistData.playlist.findIndex(
        (music) => music.id == nextMusic.id
      );

      if ((nextMusicIndex == 0 && playerState.repeat) || nextMusicIndex > 0) {
        dispatch(playMusic({ music: nextMusic, fromPlaylist: true }));
      }
    }
  };
  //#endregion Events methods declaration

  //#region Controls methods declaration

  // Since HTMLAudioElement.play is async but pause is not we must prevent user to play/pause too fast
  let lockPlay: boolean = false;

  const controls = {
    play: () => {
      if (!player) {
        return;
      }

      console.log(lockPlay, player.readyState, player.paused);

      if (
        !lockPlay &&
        //player.readyState === HAVE_ENOUGH_DATA &&
        player.paused
      ) {
        const playPromise = player.play();

        if (playPromise !== undefined) {
          lockPlay = true;
          const resetLock = () => {
            lockPlay = false;
          };
          playPromise.finally(resetLock);
        }

        return playPromise;
      }
      return;
    },
    pause: () => {
      if (player && !lockPlay && !player.paused) {
        return player.pause();
      }
    },
    seek: (time: number) => {
      if (!player || playerState.duration === undefined) {
        return;
      }
      time = Math.min(playerState.duration, Math.max(0, time));
      player.currentTime = time;
    },
    volume: (volume: number) => {
      if (!player) {
        return;
      }
      volume = Math.min(1, Math.max(0, volume));
      player.volume = volume;
      setState({ volume });
    },
    mute: () => {
      if (!player) {
        return;
      }
      player.muted = true;
    },
    unmute: () => {
      if (!player) {
        return;
      }
      player.muted = false;
    },
    toggleRepeat: () => {
      if (!player) {
        return;
      }
      setState({ repeat: !playerState.repeat });
    },
  };

  //#endregion Controls methods declaration

  //#region Initialize player on client
  useEffect(() => {
    const player = new Audio();
    setPlayer(player);
  }, []);
  //#endregion Initialize player on client

  //#region Attach events methods on player
  useEffect(() => {
    if (!player) return;

    player.onplay = onPlay;
    player.onplaying = onPlaying;
    player.onwaiting = onWaiting;
    player.onpause = onPause;
    player.onvolumechange = onVolumeChange;
    player.ontimeupdate = onTimeUpdate;
    player.ondurationchange = onDurationChange;
    player.onended = onEnded;

    return () => {
      player.onplay = null;
      player.onplaying = null;
      player.onwaiting = null;
      player.onpause = null;
      player.onvolumechange = null;
      player.ontimeupdate = null;
      player.ondurationchange = null;
      player.onended = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player, playlistData, playerState.repeat]);
  //#endregion Attach events methods on player

  // Play the current music in playlist
  useEffect(() => {
    if (player) {
      if (playlistData.currentMusic) {
        const music = playlistData.currentMusic.music;
        player.src = music.src;

        if (player.paused) player.play();
      } else {
        player.pause();
        player.src = "";
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistData.currentMusic]);

  const ctxValue = { player, controls, playerState };

  return (
    <AudioProviderContext.Provider value={ctxValue}>
      {children}
    </AudioProviderContext.Provider>
  );
};
