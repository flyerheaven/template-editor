
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import PlaceholderEditing from './placeholderediting.js';
import PlaceholderUI from './placeholderui.js';

export default class Placeholder extends Plugin {
    static get requires() {
        return [ PlaceholderEditing, PlaceholderUI ];
    }
}
