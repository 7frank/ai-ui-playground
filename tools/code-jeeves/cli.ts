import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { handleDocumentation } from './src/subcommands/refactor/handleDocumentation';
import { generatePlan } from './src/subcommands/plan/generatePlan';
import { executePlan } from './src/subcommands/plan/executePlan';

yargs(hideBin(process.argv))
  .scriptName("jee")
  .usage('$0 <cmd> [args]')
  // Refactor command group with documentation subcommand
  .command('refactor <command>', 'Refactor operations', (yargs) => {
    return yargs.command({
      command: 'documentation [options]',
      describe: 'Generate documentation',
      builder: (yargs) => yargs.option('pattern', {
        alias: 'p',
        describe: "use '*' for any",
        type: 'string',
      }).option('dryRun', {
        describe: 'git commit changes or use --dryRun',
        type: 'boolean',
        default: false,
      }),
      handler: async (argv) => {
        await handleDocumentation(argv)
      },
    })
  }, () => {})
  // Generate command group with generate and execute subcommands
  .command('generate <command>', 'Generate operations', (yargs) => {
    return yargs
      .command({
        command: 'plan [options]',
        describe: 'Generate a plan',
        builder: (yargs) => yargs.option('name', {
          alias: 'n',
          describe: 'The folder name the plan is getting generated into.',
          type: 'string',
          requiresArg: true,
        }).option('spec', {
          alias: 's',
          describe: 'a file path and name to a jeeves spec file',
          type: 'string',
          default: './src/specs/defaultSpecification.ts',
        }).option('dryRun', {
          describe: 'git commit changes or use --dryRun',
          type: 'boolean',
          default: false,
        }),
        handler: async (argv) => {
            await generatePlan(argv)
        },
      })
      .command({
        command: 'execute [options]',
        describe: 'Execute a plan',
        builder: (yargs) => yargs.option('name', {
          alias: 'n',
          describe: 'The folder name the plan is getting generated into.',
          type: 'string',
          requiresArg: true,
        }).option('dryRun', {
          describe: 'git commit changes or use --dryRun',
          type: 'boolean',
          default: false,
        }).option('force', {
          alias: 'f',
          describe: 'override previously generated files',
          type: 'boolean',
        }).option('resume', {
          alias: 'r',
          describe: 'resumes at the last file generated the previous run',
          type: 'boolean',
        }).option('index', {
          alias: 'i',
          describe: 'specify the function name or the index of the single item in the plan you want to execute',
          type: 'string',
        }),
        handler: async (argv) => {
            await executePlan(argv)
          },
      })
  }, () => {})
  .help()
  .completion()
  .wrap(null)
  .parse();
