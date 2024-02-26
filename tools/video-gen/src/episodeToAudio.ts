import { $ } from "bun";
import { ScreenplaySchema } from "./PromptSchema";


const res=await $`cat assets/Arc/S1E1.screenplay.json`.json()

const episode=ScreenplaySchema.parse(res)

episode.episode.scenes.map(({dialogues})=> dial )