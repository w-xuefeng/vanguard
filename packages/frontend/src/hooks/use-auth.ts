import { LDK } from "@/config/dict";
import { useStorage } from "@/utils";

export function useAuth() {
  return {
    isLogin: useStorage.getStorage(LDK.USER),
  };
}
