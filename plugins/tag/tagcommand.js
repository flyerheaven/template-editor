import Command from '@ckeditor/ckeditor5-core/src/command';

export default class TagCommand extends Command {
    execute( { value } ) {
        const editor = this.editor;
        const selection = editor.model.document.selection;

        editor.model.change( writer => {
            // Create a <tag> elment with the "name" attribute (and all the selection attributes)...
            const tag = writer.createElement( 'tag', {
                ...Object.fromEntries( selection.getAttributes() ),
                name: value
            } );

            // ... and insert it into the document.
            editor.model.insertContent( tag );

            // Put the selection on the inserted element.
            writer.setSelection( tag, 'on' );
        } );
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;

        const isAllowed = model.schema.checkChild( selection.focus.parent, 'tag' );

        this.isEnabled = isAllowed;
    }
}
