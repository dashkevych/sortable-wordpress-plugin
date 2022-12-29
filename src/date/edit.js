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
	getSettings as getDateSettings,
} from '@wordpress/date';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	InspectorControls,
	__experimentalDateFormatPicker as DateFormatPicker,
} from '@wordpress/block-editor';

import { PanelBody } from '@wordpress/components';

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
 * @param {Object} props All props passed to this function.
 * @return {WPElement} Element to render.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 */
export default function Edit( props ) {
	const { context, attributes, setAttributes } = props;
	const blockProps = useBlockProps();
	const dateSettings = getDateSettings();

	const [ siteFormat = dateSettings.formats.date ] = useEntityProp(
		'root',
		'site',
		'date_format'
	);

	const date = getDate( context[ 'sortable/entryDateTime' ] );

	const entryDate = (
		<time dateTime={ dateI18n( 'c', date ) }>
			{ dateI18n( attributes.format || siteFormat, date ) }
		</time>
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings' ) }>
					<DateFormatPicker
						format={ attributes.format }
						defaultFormat={ siteFormat }
						onChange={ ( nextFormat ) =>
							setAttributes( { format: nextFormat } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>{ entryDate }</div>
		</>
	);
}
