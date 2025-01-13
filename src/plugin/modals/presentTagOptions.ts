import { Modal, App, Setting } from "obsidian";

export class TagOptionsModal extends Modal {
    tagSuggestions: { originalTag: string, similarTag: string }[];
    knownTags: string[];
    selectedTags: { originalTag: string, selectedTag: string }[];

    constructor(app: App, tagSuggestions: { originalTag: string, similarTag: string }[], knownTags: string[]) {
        super(app);
        this.tagSuggestions = tagSuggestions;
        this.knownTags = knownTags;
        this.selectedTags = tagSuggestions.map(suggestion => ({ originalTag: suggestion.originalTag, selectedTag: suggestion.similarTag }));
    }

    onOpen() {
        const { contentEl } = this;

        contentEl.createEl("h2", { text: "Select Tags" });

        this.tagSuggestions.forEach((tagSuggestion, index) => {
            new Setting(contentEl)
                .setName(tagSuggestion.originalTag)
                .addDropdown(dropdown => {
                    dropdown.addOption(tagSuggestion.originalTag, tagSuggestion.originalTag);
                    dropdown.addOption(tagSuggestion.similarTag, tagSuggestion.similarTag);
                    this.knownTags.forEach(tag => dropdown.addOption(tag, tag));
                    dropdown.setValue(tagSuggestion.similarTag);
                    dropdown.onChange(value => {
                        this.selectedTags[index].selectedTag = value;
                    });
                });
        });

        new Setting(contentEl)
            .addButton(button => {
                button.setButtonText("Confirm")
                    .setCta()
                    .onClick(() => {
                        this.close();
                    });
            });
    }

    onClose() {
        const { contentEl } = this;
        contentEl.empty();
    }

    getSelectedTags() {
        return this.selectedTags;
    }
}

export const presentTagOptions = async (app: App, tagSuggestions: { originalTag: string, similarTag: string }[], knownTags: string[]) => {
    return new Promise<{ originalTag: string, selectedTag: string }[]>(resolve => {
        const modal = new TagOptionsModal(app, tagSuggestions, knownTags);
        modal.onClose = () => {
            resolve(modal.getSelectedTags());
        };
        modal.open();
    });
};