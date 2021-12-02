import Command from '@ckeditor/ckeditor5-core/src/command';

export default class PlaceholderCommand extends Command {
    execute( { name, value } ) {
        // executed when dropdown clicked
        const editor = this.editor;
        const selection = editor.model.document.selection;

        editor.model.change( writer => {
            // Create a <placeholder> element with the "name" attribute (and all the selection attributes)...
            const placeholder = writer.createElement('placeholder', { name: value });
            editor.model.insertContent(placeholder)
            writer.setSelection(placeholder, 'in')
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;

        const isAllowed = model.schema.findAllowedParent( selection.getFirstPosition(), 'placeholder' );

        this.isEnabled = isAllowed !== null;
    }
}
