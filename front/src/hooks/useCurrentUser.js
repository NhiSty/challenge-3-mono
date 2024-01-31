import useTokens from "@/hooks/useTokens";
import useUser from "@/hooks/useUser";

export default function useCurrentUser() {
  const tokens = useTokens();
  return useUser(tokens?.payload?.id);
}
