import { IconType } from "react-icons/lib";
import styles from "./ActionButton.module.scss";

type ActionButtonProps = {
  onClick?: () => void;
  icon: IconType;
};

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, icon }) => {
  return (
    <button className={styles.actionButton} onClick={onClick}>
      {icon({})}
    </button>
  );
};

export default ActionButton;
