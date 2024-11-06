import { AGENT_WALLET_ADDRESS } from '../constants';

const baseUrl =
  'https://api.wallet.coinbase.com/rpc/v2/collectibles/getUserCollectionList?';

export default async function getNfts() {
  try {
    const response = await fetch(
      `${baseUrl}userAddress=${AGENT_WALLET_ADDRESS}&chainId=84532`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ input }),
      },
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    console.log({ response });

    // const text = await response.text();
    // const parsedMessages = text
    //   .trim()
    //   .split('\n')
    //   .map((line) => {
    //     try {
    //       return JSON.parse(line);
    //     } catch (error) {
    //       console.error('Failed to parse line as JSON:', line, error);
    //       return null;
    //     }
    //   })
    //   .filter(Boolean);

    // onSuccess(parsedMessages);
    // return { messages: parsedMessages, error: null };
  } catch (error) {
    console.error('Error posting chat:', error);
    return { messages: [], error: error as Error };
  } finally {
    // setIsLoading(false);
  }
}
