import { useContext } from "react";
import { AudioProviderContext } from "providers/AudioPlayerProvider";

export const useAudioPlayerProvider = () => {
  const audioProvider = useContext(AudioProviderContext);
  
  if (!audioProvider)
    throw "This hook needs to be used inside a AudioProvider";

  return audioProvider;
};