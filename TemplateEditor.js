import ClassicEditor from '@ckeditor/ckeditor5-build-classic/build/ckeditor';

export function test () {
    return la;
}
export function test2 () {
    return la;
}

export default class TemplateEditor {
    constructor(element, placeholders) {
        this.element = element;
        this.placeholders = placeholders;
    }

    init() {
        ClassicEditor
            .create(this.element), {
                toolbar: ['document', 'clipboard', 'editing', 'forms', 'basicstyles', 'paragraph', 'links', 'insert', 'styles', 'colors', 'tools', 'others', 'about', 'placeholder_select' ]
            }
            .catch(error => {
                console.log(`error`, error)
            });

        // CKEDITOR.replace(this.id, {
        //     customConfig: '',
        //     allowedContent: true,
        //     extraPlugins: 'richcombo,placeholder_select',
        //     toolbarGroups:[
        //         { name: 'document',    groups: [ 'mode', 'document', 'doctools' ] },
        //         { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
        //         { name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
        //         { name: 'forms' },
        //         '/',
        //         { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        //         { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
        //         { name: 'links' },
        //         { name: 'insert' },
        //         '/',
        //         { name: 'styles' },
        //         { name: 'colors' },
        //         { name: 'tools' },
        //         { name: 'others' },
        //         { name: 'about' },
        //         '/',
        //         { name: 'placeholder_select'}
        //     ],
        //     placeholder_select: {
        //         placeholders: this.placeholders,
        //     },
        //     protectedSource: [/{%([^{}])+%}/g],
        // });
    }
}
