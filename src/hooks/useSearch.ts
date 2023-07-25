import { useRouter } from "next/navigation";
import { useCallback } from "react";

const validateAddress = (_addr: string): Error | null => {
  if (_addr.length < 20) {
    return new Error("invalid address");
  } else {
    return null;
  }
};

const useSearch = () => {
  const router = useRouter();
  const search = useCallback(
    (query: string) => {
      const error = validateAddress(query);
      if (!error) {
        router.push(`/demo/detail/${query}`);
        return null;
      } else {
        return error;
      }
    },
    [router]
  );
  return search;
};

export default useSearch;
