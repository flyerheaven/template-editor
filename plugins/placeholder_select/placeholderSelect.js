// TODO: Ist temporär noch in diesem Ordner, sollte noch ausgelagert werden
import { Extension } from '@tiptap/core';

import PlaceholderGroup from './instance/PlaceholderGroup';

const insertPlaceholder = (placeholder, { commands }) => {
  commands.insertContent(placeholder);
};

export const generatePlaceholderList = (placeholderList) => {
  return placeholderList.map((j) => new PlaceholderGroup(j));
};

export const PlaceholderSelect = Extension.create({
  name: 'placeholder_select',
  addCommands() {
    return {
      addPlaceholder:
        (placeholder) =>
        ({ commands }) => {
          insertPlaceholder(placeholder, { commands });

          return false;
        },
    };
  },
});
