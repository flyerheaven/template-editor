
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { addListToDropdown, createDropdown } from '@ckeditor/ckeditor5-ui/src/dropdown/utils';

import Collection from '@ckeditor/ckeditor5-utils/src/collection';
import Model from '@ckeditor/ckeditor5-ui/src/model';

// Placeholder Instance-Classes
import PlaceholderGroup from './instance/PlaceholderGroup';

export default class PlaceholderUI extends Plugin {
    init() {
        const editor = this.editor;
        const placeholderGroups = [];
        const placeholders = editor.config.get('placeholderConfig.placeholders');

        placeholders.forEach((placeholderData) => {
            let placeholderGroup = new PlaceholderGroup(placeholderData);
            placeholderGroups.push(placeholderGroup);
        });

        placeholderGroups.forEach((placeholderGroup, index) => {
            // The "placeholder" dropdown must be registered among the UI components of the editor
            // to be displayed in the toolbar.
            editor.ui.componentFactory.add( 'placeholder_select_' + index, locale => {
                const dropdownView = createDropdown( locale );

                // Populate the list in the dropdown with items.
                addListToDropdown( dropdownView, getDropdownItemsDefinitions( placeholderGroup.getPlaceholders() ) );

                dropdownView.buttonView.set( {
                    label: placeholderGroup.getName(),
                    withText: true
                } );

                // Disable the placeholder button when the command is disabled.
                const command = editor.commands.get( 'insertPlaceholder' );
                dropdownView.bind( 'isEnabled' ).to( command );

                // Execute the command when the dropdown item is clicked (executed).
                this.listenTo( dropdownView, 'execute', evt => {
                    editor.execute( 'insertPlaceholder', { value: evt.source.commandParam, name: evt.source.label } );
                    editor.editing.view.focus();
                } );

                return dropdownView;
            } );
        })
    }
}

function getDropdownItemsDefinitions( placeholderGroup ) {
    const itemDefinitions = new Collection();

    for ( const placeholder of placeholderGroup ) {
        const definition = {
            type: 'button',
            model: new Model( {
                commandParam: placeholder.getPlaceholder(),
                label: placeholder.data,
                withText: true,
            })
        };

        // Add the item definition to the collection.
        itemDefinitions.add( definition );
    }

    return itemDefinitions;
}

