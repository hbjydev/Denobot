import { Message } from 'https://deno.land/x/discordeno/structures/message.ts';
import CommandContext from '../../lib/CommandContext.ts';
import { botCache } from '../../mod.ts';

export const commandHandler = async (message: Message) => {
  const { content, author: { bot } } = message;
  if(!content.startsWith('!')) return;
  if(bot) return;
  
  const [ commandName ] = content.substring(1).split(' ');

  const command = await getCommand(commandName);
  if(!command) return;

  message.addReaction('👀');

  const ctx = new CommandContext(command, message);

  try {
    await command.execute(ctx);
  } catch(e) {
    console.error('Something went wrong.');
    console.error(e);
  }
}

export const getCommand = async (name: string) => {
  const command = botCache.commands.get(name);
  if(command) return command;
}

export const messageCreate = (message: Message) => {
  commandHandler(message);
}