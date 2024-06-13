import path from "path";
import { encodeUserPassword } from "./utils";
import { UserDAO } from "./database/dao";
import type { User } from "./database/type";

function getLockFile() {
  return Bun.file(path.resolve(import.meta.dirname, '.user.lock'))
}

export async function initialUser(defaultUser: User = {
  name: 'admin',
  password: 'admin'
}) {
  const lockFile = getLockFile();
  const hasInitialized = await lockFile.exists();
  if (hasInitialized) {
    return
  }
  const user = await encodeUserPassword(defaultUser)
  await UserDAO.addUser([user]);
  await Bun.write(lockFile, new Date(Date.now()).toLocaleString("zh-CN", { hour12: false }))
}
