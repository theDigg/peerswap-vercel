import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface ArchiverState {
  archiver: {
    ip: string;
    port: number;
  };
  node: string;
}

const initialState: ArchiverState = {
  archiver: {
    ip: 'www.peerswap.org',
    port: 4000
  },
  node: `http://localhost:${9001}`
  // process.env.NODE_ENV === 'development'
  //   ? `http://localhost:${9001}`
  //   : `https://www.peerswap.org/rproxy/www.peerswap.org:${9001}`
};

const archiverDetails = createSlice({
  name: 'archiverDetails',
  initialState,
  reducers: {
    setArchiver(state, action: PayloadAction<any>) {
      state.archiver = { ip: action.payload.ip, port: action.payload.port };
      getRandomHost(state.archiver).then((url) => {
        state.node = url;
      });
    },
    setNode(state, action: PayloadAction<any>) {
      state.node = action.payload
    }
  }
});

export async function getRandomHost(archiver) {
  const { data } = await axios.get(
    process.env.NODE_ENV === 'development'
      ? `http://${archiver.ip}:${archiver.port}/nodelist`
      : `https://www.peerswap.org/rproxy/${archiver.ip}:${archiver.port}/nodelist`
  );
  const nodeList = data.nodeList;
  const randomIndex = Math.floor(Math.random() * nodeList.length);
  const randomHost = nodeList[randomIndex];
  if (!randomHost) {
    throw new Error('Unable to get random host');
  }
  const { ip, port } = randomHost;
  console.log(
    process.env.NODE_ENV === 'development'
      ? `Now using: http://${archiver.ip}:${port} as host for query's and transactions`
      : `Now using: https://www.peerswap.org/rproxy/${archiver.ip}:${port} as host for query's and transactions`
  );
  return process.env.NODE_ENV === 'development'
    ? `http://${archiver.ip}:${port}`
    : `https://www.peerswap.org/rproxy/${archiver.ip}:${port}`;
}

export const { setArchiver, setNode } = archiverDetails.actions;

export default archiverDetails.reducer;
