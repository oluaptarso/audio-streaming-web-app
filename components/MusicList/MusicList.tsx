"use client";

import { useAvailableMusics } from "hooks/useAvailableMusics";
import MusicItem from "./components/MusicItem";
import MusicListSkeleton from "./components/MusicListSkeleton";
import styles from "./MusicList.module.scss";

export type MusicListProps = {
  className?: string;
}

const MusicList: React.FC<MusicListProps> = ({ className = "" }) => {
  const { musics, loading, error } = useAvailableMusics();

  return error ? (
    <span>error</span>
  ) : (
    <div className={`${className} ${styles.musicListContainer}`}>
      <h2>Musics</h2>
      {loading ? (
        <MusicListSkeleton />
      ) : (
        <ul>
          {musics.map((music, i) => (
            <li key={`music-${music.name}-${i}`}>
              <MusicItem music={music} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MusicList;
