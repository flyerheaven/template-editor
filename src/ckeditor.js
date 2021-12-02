/**
 * @license Copyright (c) 2014-2021, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor.js';
import Autoformat from '@ckeditor/ckeditor5-autoformat/src/autoformat.js';
import BlockQuote from '@ckeditor/ckeditor5-block-quote/src/blockquote.js';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold.js';
import CKFinderUploadAdapter from '@ckeditor/ckeditor5-adapter-ckfinder/src/uploadadapter.js';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials.js';
import Heading from '@ckeditor/ckeditor5-heading/src/heading.js';
import Image from '@ckeditor/ckeditor5-image/src/image.js';
import ImageCaption from '@ckeditor/ckeditor5-image/src/imagecaption.js';
import ImageStyle from '@ckeditor/ckeditor5-image/src/imagestyle.js';
import ImageToolbar from '@ckeditor/ckeditor5-image/src/imagetoolbar.js';
import ImageUpload from '@ckeditor/ckeditor5-image/src/imageupload.js';
import Indent from '@ckeditor/ckeditor5-indent/src/indent.js';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic.js';
import Link from '@ckeditor/ckeditor5-link/src/link.js';
import List from '@ckeditor/ckeditor5-list/src/list.js';
import MediaEmbed from '@ckeditor/ckeditor5-media-embed/src/mediaembed.js';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph.js';
import PasteFromOffice from '@ckeditor/ckeditor5-paste-from-office/src/pastefromoffice.js';
import Table from '@ckeditor/ckeditor5-table/src/table.js';
import TableToolbar from '@ckeditor/ckeditor5-table/src/tabletoolbar.js';
import TextTransformation from '@ckeditor/ckeditor5-typing/src/texttransformation.js';

import CKEditorInspector from '@ckeditor/ckeditor5-inspector';

// Custom plugins
import Placeholder from '../plugins/placeholder/placeholder';
import Tag from '../plugins/tag/tag';

export default class TemplateEditor {
    constructor(element, placeholders, allowedTags = ['if', 'for']) {
        this.element = element;
        this.placeholders = placeholders;
        this.allowedTags = allowedTags;
    }

    init() {
		let toolbar = [
			'-',
			'heading',
			'bold',
			'italic',
			'link',
			'bulletedList',
			'numberedList',
			'|',
			'outdent',
			'indent',
			'|',
			'imageUpload',
			'blockQuote',
			'insertTable',
			'mediaEmbed',
			'undo',
			'redo',
		];
		const placeholderToolbar = this.placeholders.map((v, i) => 'placeholder_select_' + i);
		toolbar = placeholderToolbar.concat(toolbar);

		const plugins = [
			Placeholder,
			Tag,
			Autoformat,
			BlockQuote,
			Bold,
			CKFinderUploadAdapter,
			Essentials,
			Heading,
			Image,
			ImageCaption,
			ImageStyle,
			ImageToolbar,
			ImageUpload,
			Indent,
			Italic,
			Link,
			List,
			MediaEmbed,
			Paragraph,
			PasteFromOffice,
			Table,
			TableToolbar,
			TextTransformation,
		]
        ClassicEditor
            .create(this.element, {
				plugins,
                toolbar: {
					items: toolbar,
					shouldNotGroupWhenFull: true
				},
				placeholderConfig: {
					placeholders: this.placeholders,
					allowedTags: this.allowedTags
				},
				language: 'de-ch',
				image: {
					toolbar: [
						'imageTextAlternative',
						'imageStyle:inline',
						'imageStyle:block',
						'imageStyle:side'
					]
				},
				table: {
					contentToolbar: [
						'tableColumn',
						'tableRow',
						'mergeTableCells'
					]
				}
            })
			.then((editor) => CKEditorInspector.attach(editor))
            .catch(error => {
                console.log(`error`, error)
            });
    }
}
