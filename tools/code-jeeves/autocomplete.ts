import { Register } from "cmd-ts/dist/cjs/argparser";



type JSONValue = string | number | boolean | { [x: string]: any } | Array<any>;

/**
 * We patched the cmd-ts package to have _cmds(subcommands), _args(commands),_config(flag,option) exposed.
 */
function flattenCmdTsStructure(obj: JSONValue, parentKey = ''): JSONValue {
    if (Array.isArray(obj)) {
      return obj.map(item => flattenCmdTsStructure(item));
    } else if (typeof obj === 'object' && obj !== null) {
      const newObj: { [x: string]: any } = {};
      Object.keys(obj).forEach(key => {
        if (['_cmds', '_args', '_config'].includes(key)) {
          // Special handling for "_config" parent with "type" child
          if (key === '_config' && obj[key].hasOwnProperty('type')) {
            if (obj[key].hasOwnProperty('long')) newObj['long'] = obj[key]['long'];
            if (obj[key].hasOwnProperty('short')) newObj['short'] = obj[key]['short'];
            return; // Skip further processing to only include "long" and "short"
          } else {
            Object.assign(newObj, flattenCmdTsStructure(obj[key], key));
          }
        } else if (key !== 'name') { // Skip "name" properties
          newObj[key] = flattenCmdTsStructure(obj[key], parentKey);
        }
      });
      return newObj;
    }
    return obj;
  }


type SubcommandOptions = {
    long: string;
    short?: string;
    description?: string;
  };
  
  type CommandStructure = {
    [subcommand: string]: SubcommandOptions | CommandStructure;
  };
  

/**
 * converts a helper strucutre into a string containing a proper autocomplete script for the linux bash
 */
  function generateBashAutocompleteScriptV3(commands: CommandStructure,scriptName:string): string {
    let script = `#!/bin/bash\n`;
    script += `# Autocomplete script for CLI\n\n`;
  
    // Function to traverse commands and generate case statements for autocomplete
    const generateCases = (commands: CommandStructure, level: number = 1, parentPrefix: string[] = []): string => {
      let cases = '';
      Object.entries(commands).forEach(([subcommand, optionsOrSubcommands]) => {
        const currentPrefix = [...parentPrefix, subcommand];
     
        // Check if options or further subcommands
        if (typeof optionsOrSubcommands=="object" && 'long' in optionsOrSubcommands) {
          // It's an option
          if (level > 1) {
            cases += `      ${currentPrefix.slice(0, -1).join('|')}) opts+="--${optionsOrSubcommands.long} ";`;
            if (optionsOrSubcommands.short) {
              cases += ` opts+="-${optionsOrSubcommands.short} ";`;
            }
            cases += ` ;;\n`;
          }
        } else {
          // It's a subcommand, recursive call
          cases += generateCases(optionsOrSubcommands, level + 1, currentPrefix);
        }
      });
      return cases;
    };
  
    script += `_cli_autocomplete() {\n`;
    script += `  local cur prev opts\n`;
    script += `  COMPREPLY=()\n`;
    script += `  cur="${"${COMP_WORDS[COMP_CWORD]}"}"\n`;
    script += `  prev="${"${COMP_WORDS[COMP_CWORD-1]}"}"\n`;
    script += `  opts=""\n\n`;
  
    // Initial options based on top-level subcommands
    const topLevelSubcommands = Object.keys(commands).join(' ');
    script += `  if [[ ${"${COMP_CWORD}"} -eq 1 ]]; then\n`;
    script += `    opts="${topLevelSubcommands}"\n`;
    script += `  else\n`;
  
    // Generate case statements for subcommands and options
    script += generateCases(commands);
  
    script += `  fi\n\n`;
  
    script += `  COMPREPLY=($(compgen -W "${"${opts}"}" -- ${"${cur}"}))\n`;
    script += `  return 0\n`;
    script += `}\n\n`;
  
    script += `complete -F _cli_autocomplete ${scriptName}\n`;
  
    return script;
  }

export 
function subCommandsToExportScript(cli:Partial<Register>){

const json=JSON.parse(JSON.stringify((cli  as unknown as {_cmds:any})._cmds))
const c=flattenCmdTsStructure(json)
console.log(JSON.stringify(c,null,"  "))
return  generateBashAutocompleteScriptV3(c as CommandStructure,"jee")

}