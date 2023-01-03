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
import { format, getSettings as getDateSettings } from '@wordpress/date';

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

	const [ siteTimeFormat = dateSettings.formats.time ] = useEntityProp(
		'root',
		'site',
		'time_format'
	);

	const date = context[ 'sortable/entryDateTime' ];

	const entryDate = (
		<time dateTime={ format( 'c', date ) }>
			{ format( attributes.format || siteFormat, date ) }
		</time>
	);

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings' ) }>
					<DateFormatPicker
						format={ attributes.format }
						defaultFormat={ siteFormat }
						is12Hour={ is12HourFormat( siteTimeFormat ) }
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

export function is12HourFormat( format ) {
	// To know if the time format is a 12 hour time, look for any of the 12 hour
	// format characters: 'a', 'A', 'g', and 'h'. The character must be
	// unescaped, i.e. not preceded by a '\'. Coincidentally, 'aAgh' is how I
	// feel when working with regular expressions.
	// https://www.php.net/manual/en/datetime.format.php
	return /(?:^|[^\\])[aAgh]/.test( format );
}
