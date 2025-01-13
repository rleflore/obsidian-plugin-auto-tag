import { getKnownTags } from "src/businesslogic/knownTags";

/**
 * Finds a similar tag from the existing tags.
 * @param newTag - The new tag to be checked.
 * @param existingTags - The list of existing tags.
 * @returns The similar tag if found, otherwise null.
 */
export const findSimilarTag = async (newTag: string, existingTags: string[]): Promise<string | null> => {
    // Normalize the tags for comparison (e.g., convert to lowercase)
    const normalizedNewTag = newTag.toLowerCase();

    for (const tag of existingTags) {
        const normalizedTag = tag.toLowerCase();
        if (normalizedTag.includes(normalizedNewTag) || normalizedNewTag.includes(normalizedTag)) {
            return tag;
        }
    }

    return null;
};