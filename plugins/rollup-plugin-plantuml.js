import plantuml from 'node-plantuml';
import { readFileSync} from 'node:fs';

import { pipeline } from 'node:stream/promises';

/**
 * Plugin that will allow to load *.puml files in PlantUml - Format
 */
export default function rollupPluginPlantuml(options = {}) {
    return {
        name: 'rollup-plugin-plantuml',


        async load(source) {
        
         if (!source.endsWith('.puml') ) return null;

            const content = readFileSync(source, 'utf8');
           
            const uml = plantuml.generate(content, { format: 'png' });
        
            const tmpPath = source + '.png';
            await pipeline(uml.out,fs.createWriteStream(tmpPath))
            const r=tmpPath.replace(process.cwd(),"")
       

            return `export default "${r}"`;
        }
    };
}
