

import { Client, Player } from "../Client.ts";

export default function (player: Player, client: Client)  {
    client.message(`Your ID is ${client.wsUrl+player.id}`)
}