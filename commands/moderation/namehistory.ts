import { Client, Player } from "../../classes/Client.ts";
import { DatabasePlayer, getDPlayer } from "../../classes/Database.ts";

export default async function (player: Player, client: Client, args: string[]) {
  let findingPlayer = client.findUser(args.join(" "));
  let dPlayer: DatabasePlayer | undefined;

  if (args.length == 0) findingPlayer = undefined;

  if (findingPlayer) {
    dPlayer = await getDPlayer(client, findingPlayer);
  } else {
    dPlayer = await getDPlayer(client, { id: args.join(" ") });
  }

  if (dPlayer) {
    client.message(
      `${(dPlayer.namehistory[0] || args.join(" "))}'s namehistory: ${
        dPlayer.namehistory.join(", ")
      }.`,
    );
  } else {
    client.message(
      `Your namehistory: ${(await getDPlayer(client,player)).namehistory.join(", ")}.`,
    );
  }
}
