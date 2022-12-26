import Head from "next/head";
import AudioPlayer from "components/AudioPlayer/AudioPlayer";
import MusicList from "components/MusicList/MusicList";
import Playlist from "components/Playlist/Playlist";
import styles from "styles/Home.module.scss";

export default function Home() {
  return (
    <>
      <div className={styles.homeContainer}>
        <Head>
          <title>Audio Streaming - Nest.js / Next.js / React / Redux</title>
          <meta
            name="description"
            content="Audio Streaming - Nest.js / Next.js / React / Redux"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <MusicList className={styles.musicList} />
          <Playlist className={styles.musicList} />
        </main>
      </div>
      <AudioPlayer />
    </>
  );
}
