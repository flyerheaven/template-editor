import Command from '@ckeditor/ckeditor5-core/src/command';

export default class PlaceholderCommand extends Command {
    execute( { value } ) {
        // executed when dropdown clicked
        const editor = this.editor;
        const selection = editor.model.document.selection;

        editor.model.change( writer => {
            // Create a <placeholder> element with the "name" attribute (and all the selection attributes)...
            const placeholderElement = writer.createElement( 'placeholder', {
                ...Object.fromEntries( selection.getAttributes() ),
                name: value
            } );
            writer.appendElement('paragraph', placeholderElement);

            // ... and insert it into the document.
            editor.model.insertContent( placeholderElement );

            // Put the selection on the inserted element.
            writer.setSelection( placeholderElement, 'in');
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;

        const isAllowed = model.schema.checkChild( selection.focus.parent, 'placeholder' );

        this.isEnabled = isAllowed;
    }
}
