import { Range } from "react-range";
import styles from "./ProgressBar.module.scss";
export type ProgressBarProps = {
  max: number;
  value: number;
  onChange: (values: number[]) => void;
  onFinalChange: (values: number[]) => void;
  disabled: boolean;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  max,
  value,
  onChange,
  onFinalChange,
  disabled,
}: ProgressBarProps) => {
  const widthInPercentage = Math.min((value / max) * 100, 100);

  return (
    <Range
      min={0}
      max={max}
      values={[value]}
      onChange={onChange}
      onFinalChange={onFinalChange}
      disabled={disabled}
      renderTrack={({ props, children }) => (
        <div {...props} className={styles.trackerContainer}>
          <div className={styles.tracker}>
            <div
              className={styles.trackerBackground}
              style={{ width: `${widthInPercentage}%` }}
            ></div>
          </div>
          {children}
        </div>
      )}
      renderThumb={({ props }) => (
        <div {...props} className={styles.thumbContainer}>
          <div
            className={`
              ${styles.thumb} 
              ${props.style.cursor === "grabbing" ? styles.holding : ""}
            `}
          />
        </div>
      )}
    />
  );
};

export default ProgressBar;
