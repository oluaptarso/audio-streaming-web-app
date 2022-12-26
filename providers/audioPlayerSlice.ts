import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMusic } from "interfaces/music";

export interface ICurrentMusic {
  music: IMusic;
  index: number;
  playing: boolean;
}

export interface IAudioPlayerState {
  playlist: IMusic[];
  currentMusic: ICurrentMusic | null;
}

export interface IPlayMusicPayload {
  music: IMusic;
  fromPlaylist: boolean;
}

export interface IReorderPlaylistPayload {
  startIndex: number;
  endIndex: number;
}

const initialState: IAudioPlayerState = {
  playlist: [],
  currentMusic: null,
};

export const audioPlayerSlice = createSlice({
  name: "audioPlayer",
  initialState,
  reducers: {
    addMusicToPlaylist: (state, action: PayloadAction<IMusic>) => {
      state.playlist = state.playlist.concat(action.payload);
    },
    removeFromPlaylist: (state, action: PayloadAction<IMusic>) => {
      const id = action.payload.id;

      if (id == state.currentMusic?.music.id) {
        if (state.playlist.length === 1) {
          state.currentMusic = null;
        }

        const nextMusic = getNextMusic(state);
        const newPlaylist = state.playlist.filter(
          (item) => item.id !== action.payload.id
        );
        if (nextMusic) {
          const indexInPlaylist = newPlaylist.findIndex(
            (music) => music.id === nextMusic.id
          );

          state.currentMusic = {
            index: indexInPlaylist,
            playing: true,
            music: nextMusic,
          };
        }

        state.playlist = newPlaylist;
      } else {
        state.playlist = state.playlist.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
    clearPlaylist: (state) => {
      state.playlist = [];
    },
    reorderPlaylist: (
      state,
      action: PayloadAction<IReorderPlaylistPayload>
    ) => {
      const { startIndex, endIndex } = action.payload;

      const result = [...state.playlist];
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      state.playlist = result;

      //return result;
    },
    playMusic: (state, action: PayloadAction<IPlayMusicPayload>) => {
      const { payload } = action;

      if (payload.fromPlaylist) {
        const indexInPlaylist = state.playlist.findIndex(
          (item) => item.id === payload.music.id
        );
        const playlistClone = state.playlist.slice();

        // Set music's playing property to false except for the current music
        playlistClone.forEach(
          (music, index) => (music.playing = index === indexInPlaylist)
        );
        state.playlist = playlistClone;
        state.currentMusic = {
          index: indexInPlaylist,
          playing: true,
          music: payload.music,
        };
      } else {
        const music: IMusic = { ...payload.music, id: +new Date() };
        state.playlist = [music];
        state.currentMusic = {
          index: 0,
          playing: true,
          music: music,
        };
      }
    },
    updateCurrentMusic: (state, action: PayloadAction<ICurrentMusic>) => {
      if (state.currentMusic?.music.id == action.payload.music.id) {
        state.currentMusic = action.payload;
      }
    },
  },
});

export const {
  addMusicToPlaylist,
  removeFromPlaylist,
  clearPlaylist,
  reorderPlaylist,
  playMusic,
} = audioPlayerSlice.actions;

export const getNextMusic = (
  audioPlayerStore: IAudioPlayerState
): IMusic | undefined => {
  const playlistLength = audioPlayerStore.playlist.length;

  // If the playlist is empty or there is no current music, return undefined
  if (!playlistLength || !audioPlayerStore.currentMusic) return;

  const current = audioPlayerStore.currentMusic;
  const musicIndexOnPlaylist = audioPlayerStore.playlist.findIndex(
    (music) => music.id == current.music.id
  );

  // If the current music still is on the playlist
  if (musicIndexOnPlaylist > -1) {
    // If the current music is the last on the playlist, the next one should be the first one
    const nextMusicIndex =
      musicIndexOnPlaylist + 1 <= playlistLength - 1
        ? musicIndexOnPlaylist + 1
        : 0;
    return audioPlayerStore.playlist[nextMusicIndex];
  }

  // Return the music with the current index on the playlist if there are any
  return audioPlayerStore.playlist[audioPlayerStore.currentMusic.index];
};

export default audioPlayerSlice.reducer;
