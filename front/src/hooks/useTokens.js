import { useEffect, useState } from "react";
import { getTokens } from "@/api/auth";

export default function useTokens() {
  /**
   * @type {[Jwt, (jwt: Jwt) => void]}
   */
  const [tokens, setTokens] = useState(null);

  useEffect(() => {
    setTokens(getTokens());
  }, []);

  return tokens;
}
