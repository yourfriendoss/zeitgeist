import { Client, Player } from "../../classes/Client.ts";

export default function (_: Player, client: Client, args: string[]) {
  const repeified = args.join(" ")
    .replaceAll("g", "r").replaceAll("G", "R")
    .replaceAll("l", "p").replaceAll("L", "P")
    .replaceAll("d", "e").replaceAll("D", "E");

  if (repeified.split(" ").join("").toLowerCase().includes("rape")) {
    client.message("No. (1)");
    return;
  }

  if (!/^[a-zA-z0-9 ]*$/gm.test(repeified.split(" ").join("").toLowerCase())) {
    client.message("No. (2)");
    return;
  }

  if (/n{1,}(i|l|\|){1,}(g|q|a){2,}(e|3|)r{1,}/ig.test(repeified)) {
    client.message("No. (3)");
    return;
  }

  client.message("Repeified: " + repeified);
}
