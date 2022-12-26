export const formatFromSeconds = (seconds: number | undefined): string => {
  if (!seconds) return "00:00";
  
  if (seconds < 60) {
    return `00:${seconds.toFixed(0).padStart(2, "0")}`;
  } else {
    const secondsLeftover = (seconds % 60).toFixed(0).padStart(2, "0");
    const minutes = Math.floor(seconds / 60)
      .toFixed(0)
      .padStart(2, "0");

    return `${minutes}:${secondsLeftover}`;
  }
};
