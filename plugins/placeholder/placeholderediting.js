
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import {
    viewToModelPositionOutsideModelElement,
    toWidgetEditable
} from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import PlaceholderCommand from './placeholdercommand.js';

export default class PlaceholderEditing extends Plugin {
    static get requires() {
        return [ Widget ];
    }

    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.editing.mapper.on(
            'viewToModelPosition',
            viewToModelPositionOutsideModelElement( this.editor.model, viewElement => viewElement.hasClass( 'placeholder' ) )
        );

        this.editor.commands.add( 'insertPlaceholder', new PlaceholderCommand( this.editor ) );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register('placeholder', {
            isObject: true,
            allowWhere: '$block',
            allowAttributes: [ 'name' ]
        });
    }

    _defineConverters() {
        const conversion = this.editor.conversion;

        // <placeholder> converters ((data) view → model)
        conversion.for( 'upcast' ).elementToElement( {
            view: {
                name: 'span',
                classes: 'placeholder'
            },
            model: ( viewElement, { writer: modelWriter } ) => {
                const name = viewElement.getChild( 0 ).data;
                console.log('name: ', name);

                return modelWriter.createElement( 'placeholder', { name } );
            }
        } );

        // <placeholder> converters (model → data view)
        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'placeholder',
            view: ( modelElement, { writer: viewWriter } ) => {
                // In the data view, the model <productPreview> corresponds to:
                //
                // <section class="product" data-id="..."></section>
                const text = modelElement.getAttribute('name');
                return viewWriter.createText(text);
            }
        } );

        // <productPreview> converters (model → editing view)
        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'placeholder',
            view: ( modelElement, { writer: viewWriter } ) => {
                console.log('modelElement: ', modelElement);
                const name = modelElement.getAttribute( 'name' );

                // The outermost <section class="product" data-id="..."></section> element.
                // const section = viewWriter.createEditableElement( 'placeholder', {
                //     class: 'placeholder',
                //     'name': name
                // } );
                const innerText = viewWriter.createText( name);
                const section = viewWriter.createEditableElement('span', {
                    class: 'placeholder',
                    name,
                } );
                // const section = viewWriter.createRawElement( 'span', { name }, function( domElement ) {
                //     domElement.innerHTML = '<b>This is the raw content of the raw element.</b>';
                // } );

                viewWriter.insert( viewWriter.createPositionAt(section, 0 ), innerText );

                return toWidgetEditable( section, viewWriter);
            }
        } );
    }
}
