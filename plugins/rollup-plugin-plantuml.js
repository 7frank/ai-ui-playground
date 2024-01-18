import plantuml from 'node-plantuml';
import { readFileSync} from 'node:fs';
import { pipeline,finished, } from 'node:stream/promises';
import streamToPromise from "stream-to-promise"

/**
 * Plugin that will allow to load *.puml files in PlantUml - Format
 */
export default function rollupPluginPlantuml(options = {}) {
    return {
        name: 'rollup-plugin-plantuml',


        async load(source) {
        
         if (!source.endsWith('.puml') ) return null;

            const content = readFileSync(source, 'utf8');
           
            const uml = plantuml.generate(content, { format: 'svg' });
        
            // Code for when you want to store the converted file
            // const tmpPath = source + '.svg';
            // await pipeline(uml.out,fs.createWriteStream(tmpPath))
            // const r=tmpPath.replace(process.cwd(),"")
            // return `export default "${r}"`;

            // Code for when you want to inline the svg base64 encoded
            const svgContent=await streamToPromise(uml.out)  
            const encoded=`data:image/svg+xml;base64,${svgContent.toString('base64')}`
            return `export default "${encoded}"`;
        }
    };
}
