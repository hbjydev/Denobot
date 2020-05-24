import CommandContext from "../../lib/CommandContext.ts";
import { botCache } from "../../mod.ts";

const execute = async (ctx: CommandContext) => {
  const { channel } = ctx;
  const message = await channel.sendMessage({ embed: {
    title: 'Discordeno Testing Bot',
    description: 'This is an example command using Discordeno.'
  } });

  message.addReaction('👍');

  return true;
}

botCache.commands.set('example', {
  name: 'example',
  execute
});