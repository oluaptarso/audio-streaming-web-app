import { IoPlayOutline, IoPauseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useAudioPlayerProvider } from "hooks/useAudioPlayerProvider";
import { RootState } from "store/store";
import styles from "./PlayPauseButton.module.scss";
import { useRef } from "react";

export type PlayPauseButtonProps = {
  className?: string;
};

let animationPID: number | undefined = undefined;
let playing = false;
let maxFPS = 60;
let lastTimestamp = 0;
let timestep = 1000 / maxFPS;

const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({
  className,
}: PlayPauseButtonProps) => {
  const { controls, playerState } = useAudioPlayerProvider();
  const currentMusic = useSelector(
    (state: RootState) => state.audioPlayerStore.currentMusic
  );
  const disabled = currentMusic === null;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  playing = playerState.playing;

  if (playerState.analyser) {
    const bufferLength = playerState.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    playerState.analyser.getByteTimeDomainData(dataArray);

    console.log(bufferLength);

    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const canvasCtx = canvas.getContext("2d");
      const width = canvas.width;
      const height = canvas.height;

      if (canvasCtx) {
        //canvasCtx.clearRect(0, 0, width, height);
        const draw: FrameRequestCallback = (timestamp: number) => {          
          if (!playing && animationPID) {
            cancelAnimationFrame(animationPID);
            animationPID = undefined;
          } else {
            if (timestamp - lastTimestamp < timestep) return;

            lastTimestamp = timestamp;

            animationPID = requestAnimationFrame(draw);

            canvasCtx.fillStyle = "rgb(255, 255, 255)";
            canvasCtx.fillRect(0, 0, width, height);

            canvasCtx.lineWidth = 2;
            canvasCtx.strokeStyle = "rgb(124, 58, 237)";

            canvasCtx.beginPath();

            const sliceWidth = (width * 1.0) / bufferLength;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
              let v = dataArray[i] / 128.0;
              let y = (v * height) / 2;

              if (i === 0) {
                canvasCtx.moveTo(x, y);
              } else {
                canvasCtx.lineTo(x, y);
              }

              x += sliceWidth;
            }

            canvasCtx.lineTo(canvas.width, canvas.height / 2);
            canvasCtx.stroke();
          }
        };

        draw(+ new Date());
      }
    }
  }

  return (
    <>
      <canvas width={100} height={20} ref={canvasRef}></canvas>
      <button
        type="button"
        className={`${className} ${styles.playPauseButton}`}
        disabled={disabled}
        onClick={playerState.playing ? controls.pause : controls.play}
      >
        {playerState.playing && !disabled ? (
          <IoPauseOutline size={24} />
        ) : (
          <IoPlayOutline size={24} className={styles.playIcon} />
        )}
      </button>
    </>
  );
};

export default PlayPauseButton;
