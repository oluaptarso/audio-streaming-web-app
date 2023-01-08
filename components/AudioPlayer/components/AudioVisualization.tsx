import { useAudioPlayerProvider } from "hooks/useAudioPlayerProvider";
import { useEffect, useRef, useState } from "react";

export type AudioVisualizationProps = {
  className?: string;
};

let animationPID: number | undefined = undefined;
let maxFPS = 60;
let lastTimestamp = 0;
let timestep = 1000 / maxFPS;

const AudioVisualization: React.FC<AudioVisualizationProps> = ({
  className = "",
}) => {
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const { player, playerState } = useAudioPlayerProvider();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawVisualizer = (
    canvasContext: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    bufferLength: number,
    dataArray: Uint8Array
  ) => {

    for (let i = 0; i < bufferLength; i++) {
      const height = dataArray[i] * 0.065;
      const width = canvasWidth / 2 / bufferLength;
      canvasContext.save();

      // center the anchor point
      canvasContext.translate(canvasWidth / 2, canvasHeight / 2);

      canvasContext.rotate((i * Math.PI * 10) / bufferLength);

      const hue = 262 - i * 0.3 * 0.1;

      canvasContext.fillStyle = `hsl(${hue}, 83%, 63%)`;
      canvasContext.fillRect(0, 18, width, height);

      canvasContext.restore();
    }
  };

  useEffect(() => {
    if (player && !analyser) {
      const audioContext = new window.AudioContext();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;

      const audioSource = audioContext.createMediaElementSource(player);
      audioSource.connect(analyser);
      audioSource.connect(audioContext.destination);

      setAnalyser(analyser);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerState]);

  useEffect(() => {
    if (player) {
      const canvas = canvasRef.current;
      if (canvas) {
        const canvasContext = canvas.getContext("2d");
        if (canvasContext && analyser) {

          const animate: FrameRequestCallback = (timestamp: number) => {
            if (timestamp > lastTimestamp + timestep) {
              lastTimestamp = timestamp;
              const bufferLength = analyser.frequencyBinCount;
              const dataArray = new Uint8Array(bufferLength);
              analyser.getByteFrequencyData(dataArray);

              const width = canvas.width;
              const height = canvas.height;
              canvasContext.clearRect(0, 0, width, height);

              drawVisualizer(
                canvasContext,
                width,
                height,
                bufferLength,
                dataArray
              );
            }
            animationPID = requestAnimationFrame(animate);
          };

          if (playerState.playing)
            animationPID = requestAnimationFrame(animate);

          return () => {
            if (animationPID) window.cancelAnimationFrame(animationPID);
          };
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerState.playing]);

  return (
    <canvas
      className={className}
      width={"64px"}
      height={"64px"}
      ref={canvasRef}
    ></canvas>
  );
};

export default AudioVisualization;
