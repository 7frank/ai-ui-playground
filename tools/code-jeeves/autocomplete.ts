import { Register } from "cmd-ts/dist/cjs/argparser";


type CommandOption = {
    long: string;
    short?: string;
  };
  
  type CommandNode = {
    [key: string]: CommandOption[] | CommandNode;
  };


  function generateOptionString(options: CommandOption[]): string {
    return options.map(opt => `--${opt.long}${opt.short ? `|-${opt.short}` : ''}`).join(' ');
  }
  
  function generateBashAutocompleteScript(node: CommandNode, path: string[] = []): string {
    let script = '';
  
    Object.entries(node).forEach(([command, value]) => {
      const currentPath = [...path, command].join(' ').replace(/\s+/g, '\\ ');
      if (Array.isArray(value)) {
        // It's an array of options
        const opts = generateOptionString(value);
        script += `    if [[ "$COMP_LINE" == ${currentPath}* ]]; then\n`;
        script += `        COMPREPLY=($(compgen -W "${opts}" -- "$cur"))\n`;
        script += `    fi\n`;
      } else {
        // It's a subcommand, recurse
        script += generateBashAutocompleteScript(value, [...path, command]);
      }
    });
  
    return script;
  }

 
  

export 
function subCommandsToExportScript(cli:Partial<Register>){
const content=generateBashAutocompleteScript((cli  as unknown as {_cmds:CommandNode})._cmds)
const cliName="jee"

const bashScript = `
#!/bin/bash
# Autocomplete script for CLI tool

_cli_autocomplete() {
    local cur prev words cword
    _init_completion -n : -s || return

    cur="\${COMP_WORDS[COMP_CWORD]}"
    prev="\${COMP_WORDS[COMP_CWORD-1]}"

${content}}

complete -F _cli_autocomplete ${cliName}
`;



return  bashScript

}
