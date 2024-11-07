import { useCallback, useState } from "react";
import { API_URL } from "../config";

type UseGetNFTsResponse = {
  NFTs?: string[];
  error?: Error;
  getNFTs: () => void;
  isLoading: boolean;
};

type UseGetNFTsProps = {
  onSuccess: (nfts: string[]) => void;
};

export default function useGetNFTs({
  onSuccess,
}: UseGetNFTsProps): UseGetNFTsResponse {
  const [isLoading, setIsLoading] = useState(false);

  const getNFTs = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/nfts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const { nfts } = await response.json();

      onSuccess(nfts);

      return { nfts, error: null };
    } catch (error) {
      console.error("Error fetching nfts:", error);
      return { nfts: [], error: error as Error };
    } finally {
      setIsLoading(false);
    }
  }, [onSuccess]);

  return { getNFTs, isLoading };
}
