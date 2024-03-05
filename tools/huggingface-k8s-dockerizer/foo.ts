import { $ } from "bun";

async function main() {
  const sessionExists =
    (await $`tmux has-session -t myGridSession`.quiet()).exitCode === 0;
  if (sessionExists) {
    await $`tmux kill-session -t myGridSession`;
  }

  await $`tmux new-session -d -s myGridSession -x 180 -y 50`;

  await $`tmux set -g mouse on`;
  

  // Custom logic to determine when to split horizontally or vertically
  // Not directly implementable as described but outlines the approach
  const directories = (
    await $`find .barn -maxdepth 3 -type d -name 'node_modules' -prune -o -type f -name 'package.json' -exec dirname {} \\;`.text()
  )
    .split("\n")
    .filter(Boolean);

  let splitType = "h"; // Alternates between 'h' (horizontal) and 'v' (vertical)

  for (let i = 0; i < directories.length; i++) {
    if (i === 1) {
      // After the first, start splitting
      splitType = "v";
    } else if (i > 1 && i % 2 === 0) {
      // Alternate split type every 2 directories after the first
      splitType = splitType === "h" ? "v" : "h";
    }

    // Create a new pane by splitting. This simplistic approach doesn't dynamically adjust
    // based on current pane layout or count but illustrates the concept of alternating splits.
    await $`tmux split-window -${splitType} -t myGridSession`;
    await $`tmux send-keys -t myGridSession "cd ${directories[i]} && bun run" C-m`;

    if (i % 2 === 0) {
      // Attempt to balance panes after every new split
      await $`tmux select-layout -t myGridSession tiled`;
    }
  }

  // await $`tmux attach-session -t myGridSession`;
  await $`gnome-terminal -- tmux attach-session -t myGridSession`;
}

main().catch(console.error);
