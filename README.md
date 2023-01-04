# Audio Streaming Web Application
This is a Next.js web application bootstrapped with create-next-app, and is a part of [Audio Streaming](https://github.com/oluaptarso/audio-streaming-meta).

## Tech
- [React.js](https://reactjs.org) on [Next.js](https://nextjs.org) (TypeScript);
- [React Redux](https://react-redux.js.org);
- [Redux Toolkit](https://redux-toolkit.js.org);
- [Tailwind CSS](https://tailwindcss.com);
- [React Icons](https://react-icons.github.io/react-icons);
- [react-beautiful-dnd](https://github.com/atlassian/react-beautiful-dnd);
- [react-range](https://github.com/tajo/react-range).

## Requirements
- Node.js - 16.18.1;
- npm - 8.19.2.
- [API](https://github.com/oluaptarso/audio-streaming-nestjs) running;

## Getting Started

First, install the dependencies:
```bash
npm install
# or
yarn
```

Then, create the .env file (only if your API is not running on localhost:3001):
```bash
cp .env.sample .env
```

Finally, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Run with docker

First, build the container:
```bash
docker build -t audio-streaming-webapp .
```

Then, run your container:
```bash
docker run -p 3000:3000 audio-streaming-webapp
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
