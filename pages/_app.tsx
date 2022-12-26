import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { AudioProvider } from "../providers/AudioPlayerProvider";
import { Roboto } from "@next/font/google";

const customNextFont = Roboto({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AudioProvider>
        <style jsx global>
          {`
            :root {
              --custom-next-font: ${customNextFont.style.fontFamily};
            }
          `}
        </style>
        <Component {...pageProps} />
      </AudioProvider>
    </Provider>
  );
}
