/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * WordPress dependencies
 */
import { useEntityProp } from '@wordpress/core-data';
import {
	dateI18n,
	getDate,
	__experimentalGetSettings as getDateSettings,
} from '@wordpress/date';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { context } ) {
	const blockProps = useBlockProps();
	const [ siteFormat = getDateSettings().formats.date ] = useEntityProp(
		'root',
		'site',
		'date_format'
	);

	const date = getDate( context[ 'sortable/entryDateTime' ] );

	let entryDate = (
		<time dateTime={ dateI18n( 'c', date ) }>
			{ dateI18n( siteFormat, date ) }
		</time>
	);

	return <div { ...blockProps }>{ entryDate }</div>;
}
