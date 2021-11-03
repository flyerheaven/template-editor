
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import {
    toWidget,
    viewToModelPositionOutsideModelElement
} from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import TagCommand from './tagcommand.js';

export default class TagEditing extends Plugin {
    static get requires() {
        return [ Widget ];
    }

    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add( 'tag', new TagCommand( this.editor ) );

        this.editor.editing.mapper.on(
            'viewToModelPosition',
            viewToModelPositionOutsideModelElement( this.editor.model, viewElement => viewElement.hasClass( 'tag' ) )
        );
    }

    _defineSchema() {
        const schema = this.editor.model.schema;

        const allowedTags = this.editor.config.get('placeholderConfig.allowedTags');
        schema.register('tag', {
            // Allow wherever text is allowed:
            allowWhere: '$text',

            // The tag will act as an inline node:
            isInline: true,

            // The inline widget is self-contained so it cannot be split by the caret and it can be selected:
            isObject: true,

            // The inline widget can have the same attributes as text (for example linkHref, bold).
            allowAttributesOf: '$text',

            // The tag can have many types, like date, name, surname, etc:
            allowAttributes: allowedTags,
        })
    }

    _defineConverters() {
        const conversion = this.editor.conversion;

        const allowedTags = this.editor.config.get('placeholderConfig.allowedTags');
        // Conversion for Tags
        conversion.for( 'upcast' ).elementToElement( {
            view: {
                name: 'span',
                classes: [ 'tag' ]
            },
            model: ( viewElement, { writer: modelWriter } ) => {
                // Extract the "name" from "{name}".
                const name = viewElement.getChild( 0 ).data.slice( 1, -1 );

                return modelWriter.createElement( 'tag', { name } );
            }
        } );

        conversion.for( 'editingDowncast' ).elementToElement( {
            model: 'tag',
            view: ( modelItem, { writer: viewWriter } ) => {
                const widgetElement = createTagView( modelItem, viewWriter, allowedTags);

                // Enable widget handling on a tag element inside the editing view.
                return toWidget( widgetElement, viewWriter );
            }
        } );

        conversion.for( 'dataDowncast' ).elementToElement( {
            model: 'tag',
            view: ( modelItem, { writer: viewWriter } ) => createTagView( modelItem, viewWriter, allowedTags)
        } );

        // Helper method for both downcast converters.
        function createTagView( modelItem, viewWriter, allowedTags) {
            const name = modelItem.getAttribute( 'name' );

            const tagView = viewWriter.createContainerElement( 'span', {
                class: 'tag'
            }, {
                isAllowedInsideAttributeElement: true
            } );

            // Insert the tag name (as a text).
            let text;
            switch (name) {
                case 'if':
                    text = `
                    {% if company %}
                    {% endif %}
                    `;
                    break;
                case 'for':
                    text = `
                    {% for company in companies %}
                    {% endfor %}
                    `;
                    break;
                default:
                    text = '{{ ' + name + ' }}';
                    break;
            }
            const innerText = viewWriter.createText(text);
            // const innerText = viewWriter.createText( '{{ ' + name + ' }}' );
            viewWriter.insert( viewWriter.createPositionAt( tagView, 0 ), innerText );

            return tagView;
        }
    }
}
