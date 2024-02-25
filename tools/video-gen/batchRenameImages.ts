import { readdir, rename } from 'fs/promises';
import { join } from 'path';
import { command, run, string, positional } from 'cmd-ts';

async function renameWebpFiles(args: { directory: string; pattern: string }) {
  const { directory, pattern } = args;
  const files = await readdir(directory);
  let count = 1;

  for (const file of files) {
    if (file.endsWith('.webp') && file.includes(pattern.replace('*', ''))) {
      const newFileName = `img${String(count).padStart(3, '0')}.webp`;
      const oldPath = join(directory, file);
      const newPath = join(directory, newFileName);
      //console.log(oldPath, newPath)
      await rename(oldPath, newPath);
      count++;
    }
  }

  console.log('Renaming completed.');
}

const app = command({
  name: 'rename-webp',
  args: {
    directory: positional({ type: string, displayName: 'directory' }),
    pattern: positional({ type: string, displayName: 'pattern' }),
  },
  handler: renameWebpFiles,
});

run(app, process.argv.slice(2));
