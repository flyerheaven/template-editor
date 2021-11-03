
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import TagEditing from './tagediting.js';
import TagUI from './tagui.js';

export default class Tag extends Plugin {
    static get requires() {
        return [ TagEditing, TagUI ];
    }
}
