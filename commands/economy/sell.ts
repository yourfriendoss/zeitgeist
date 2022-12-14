import { Client, Player } from "../../classes/Client.ts";
import { getDPlayer, setDPlayer } from "../../classes/Database.ts";

export default async function (player: Player, client: Client, args: string[]) {
  const dPlayer = await getDPlayer(client, player);

  const all = args.join(" ");
  const itemRegex = /\[([^[\]]*) x(\d*)\]/gm;
  let match = itemRegex.exec(all);
  let found;
  const final: [string, number][] = [];

  while (match != null) {
    const item = dPlayer.items.find((e) => e.name == match![1]);

    if (item) {
      const count = +match[2];

      if (isNaN(count)) return;

      found = true;

      if (item.amount < count) {
        client.message(
          `@${player.id}, you cannot sell more than ${item.amount} of ${item.name}.`,
        );
        return;
      }
      if (count < 1) {
        client.message(
          `@${player.id}, you cannot sell less than 1 of ${item.name}.`,
        );
        return;
      }

      dPlayer.money += count * item.cost;
      item.amount -= count;

      if (item.amount == 0) {
        dPlayer.items = dPlayer.items.filter((e) => e.name !== item.name);
      }

      final.push([`${count} x${item.name}`, count * item.cost]);

      await setDPlayer(dPlayer);
    }

    match = itemRegex.exec(all);
  }

  if (!found) {
    client.message("Example: psell [anonyiron x3] [basketball x1]");
  } else {
    client.message(
      `Sold: ${final.map((e) => e[0]).join(", ")}. Total: ${
        final.map((e) => e[1]).reduce((a, b) => a + b)
      }`,
    );
  }
}
