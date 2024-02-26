export function extractMoodAndText(input: string): {
    mood: string | null;
    text: string;
} {
    // Regular expression to match the mood at the beginning of the string
    // It looks for an optional group of characters inside parentheses at the start
    const regex = /^\(([^)]+)\)\s*(.*)/;
    const matches = input.match(regex);

    if (matches && matches.length > 2) {
        // If there's a match, return the mood and the rest of the text
        return { mood: matches[1], text: matches[2] };
    } else {
        // If there's no mood, return null for mood and the original input as text
        return { mood: null, text: input };
    }
}
// TODO add this when the narrator is speaking only
//   const heSaidSheSaid =
//     Math.random() < 0.2
//       ? " " +
//         speaker.character +
//         " " +
//         getSynonymForSaidByMood(speaker.mood ?? mood ?? "")
//       : "";
function getSynonymForSaidByMood(mood: string): string {
    // Define synonyms categorized by mood
    const synonyms: { [key: string]: string[]; } = {
        neutral: [
            "remarked",
            "stated",
            "mentioned",
            "commented",
            "noted",
            "observed",
        ],
        authority: ["declared", "asserted", "proclaimed", "announced", "affirmed"],
        questioning: ["asked", "inquired", "questioned", "wondered", "pondered"],
        softness: ["whispered", "murmured", "mumbled", "muttered", "breathed"],
        loud: ["shouted", "yelled", "bellowed", "exclaimed", "cried"],
        emotional: ["laughed", "sobbed", "moaned", "cheered", "jeered", "scoffed"],
        conversational: [
            "replied",
            "responded",
            "retorted",
            "countered",
            "rejoined",
        ],
        manner: ["quipped", "teased", "jested", "boasted", "lied"],
        explanatory: ["explained", "described", "detailed", "reported", "narrated"],
        secretive: ["confided", "disclosed", "revealed", "admitted"],
    };

    // Mood to category mapping (simplified and not exhaustive)
    const moodMapping: { [key: string]: string; } = {
        angry: "loud",
        happy: "emotional",
        sad: "softness",
        curious: "questioning",
        authoritative: "authority",
        quiet: "softness",
        loud: "loud",
        whispering: "softness",
        excited: "loud",
        emotional: "emotional",
        neutral: "neutral",
        explaining: "explanatory",
        secretive: "secretive",
    };

    // Default category if the mood doesn't match exactly
    const defaultCategory = "neutral";

    // Find the closest mood category
    const category = moodMapping[mood.toLowerCase()] || defaultCategory;

    // Choose a random synonym from the category
    const synonymsForMood = synonyms[category];
    return synonymsForMood[Math.floor(Math.random() * synonymsForMood.length)];
}
