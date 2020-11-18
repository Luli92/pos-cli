import { argsParser, commandHelper } from "./helper-functions";

export async function cli(argsArray) {
  const commandObject = argsParser(argsArray);

  commandHelper(commandObject);
}
