import 'https://deno.land/x/dotenv/load.ts';
import Client from 'https://deno.land/x/discordeno/module/client.ts';
import { Intents } from 'https://deno.land/x/discordeno/types/options.ts';
import Command from './bot/types/Command.ts';
import eventHandlers from './bot/handlers/eventHandlers.ts';


export const botCache = {
  commands: new Map<string, Command>()
}

const importDirectory = async (path: string) => {
  const files = Deno.readDirSync(Deno.realPathSync(path));

  for (const file of files) {
    if (!file.name) continue;

    const currentPath = `${path}/${file.name}`;
    
    if(file.isFile) {
      await import(currentPath);
      continue;
    }

    importDirectory(currentPath);
  }
}

await Promise.all(
  [ './bot/commands' ].map((path) => importDirectory(path))
);

const token = Deno.env.get('DISCORD_TOKEN');
if(!token) throw Error('You must provide a valid Discord bot token in the DISCORD_TOKEN variable.\nVisit https://discord.com/developers/applications to create a new bot.');

Client({
  botID: '713904643817865227',
  intents: [
    Intents.GUILDS,
    Intents.GUILD_MESSAGES,
    Intents.GUILD_MESSAGE_REACTIONS,
    Intents.GUILD_MESSAGE_TYPING
  ],
  token,
  eventHandlers
});