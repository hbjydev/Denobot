import { Message } from 'https://deno.land/x/discordeno/structures/message.ts';
import { Channel } from 'https://deno.land/x/discordeno/structures/channel.ts';
import { Guild } from 'https://deno.land/x/discordeno/structures/guild.ts';
import Command from '../bot/types/Command.ts';

export default class CommandContext {
  public channel: Channel;
  public guild: Guild;
  public args: string[];

  constructor(protected command: Command, public message: Message) {
    this.channel = message.channel;
    this.guild = message.guild()!!;
    this.args = message.content.substring(1).split(' ');
  }
}