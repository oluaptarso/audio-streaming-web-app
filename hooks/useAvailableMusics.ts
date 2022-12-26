import { useEffect, useCallback } from "react";
import axios, { AxiosError } from "axios";
import { useSetState } from "./useSetState";
import { IMusic } from "interfaces/music";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface IUseAvailableMusicsState {
  musics: IMusic[];
  loading: boolean;
  error?: AxiosError | Error | unknown;
}
/* use this hook to get the available musics to play */
export const useAvailableMusics = () => {
  const [state, setState] = useSetState<IUseAvailableMusicsState>({
    musics: [],
    loading: false,
  });

  const fetchMusics = useCallback(async () => {
    setState({ loading: true });
    try {
      const musicsResponse = await axios.get<IMusic[]>(`${API_URL}/music`);
      const musics = musicsResponse.data;
      musics.forEach((music) => {
        music.src = `${API_URL}/music/${+music.trackNumber}`;
        music.playing = false;
      });
      setState({ musics, loading: false });
    } catch (error) {
      setState({ error, loading: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchMusics();
  }, [fetchMusics]);

  return { ...state, refetch: fetchMusics };
};
