import CommandContext from '../../lib/CommandContext.ts';

export default interface Command {
  name: string;

  execute(ctx: CommandContext): Promise<boolean>;
}