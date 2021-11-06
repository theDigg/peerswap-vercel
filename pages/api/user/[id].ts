import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'shardus-crypto-web';
import axios from 'axios';

const KEY = '69fa4195670576c0160d660c3be36556ff8d504725be8a59b5a96509e0c994bc';

type ResponseData = {
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const {
    query: { id },
    method
  } = req;
  console.log(id);
  if (method === 'POST') {
    // Process a POST request
    console.log('POST');
  } else {
    // Handle any other HTTP method
    await crypto.initialize(KEY);
    const data = await getAccountFromAlias(id as string);
    res.json({ data });
  }
}

async function getAccountFromAlias(handle: string) {
  const url = `http://localhost:9001/accounts/address/${crypto.hash(handle)}`;
  const { data } = await axios.get(url);
  return data;
}
