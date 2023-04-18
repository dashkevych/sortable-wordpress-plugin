/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * WordPress dependencies.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-core-data/
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-date/
 */
import { useEntityProp } from "@wordpress/core-data";
import { format, getSettings as getDateSettings } from "@wordpress/date";

/**
 * WordPress Data API functions for managing application data.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/
 */
import {
	useSelect,
	useDispatch,
	store as blockEditorStore,
} from "@wordpress/data";

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
} from "@wordpress/block-editor";

/**
 * WordPress core components.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/
 */
import { PanelBody, Button } from "@wordpress/components";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object} props All props passed to this function.
 * @return {WPElement} Element to render.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 */
export default function Edit(props) {
	const { context, attributes, setAttributes, clientId } = props;

	const blockProps = useBlockProps();
	const dateSettings = getDateSettings();

	const { getBlock, getBlockParents } = useSelect((select) => {
		return {
			getBlockParents: select(blockEditorStore).getBlockParents,
			getBlock: select(blockEditorStore).getBlock,
		};
	}, []);

	const { selectBlock } = useDispatch(blockEditorStore);

	const [siteFormat = dateSettings.formats.date] = useEntityProp(
		"root",
		"site",
		"date_format"
	);

	const [siteTimeFormat = dateSettings.formats.time] = useEntityProp(
		"root",
		"site",
		"time_format"
	);

	const date = context["sortable/entryDateTime"];

	const entryDate = (
		<time dateTime={format("c", date)}>
			{format(attributes.format || siteFormat, date)}
		</time>
	);

	// Act when Change Date button clicked.
	const onChangeDateClick = () => {
		const containerClientId = getBlockParents(clientId)[1];
		const containerBlock = getBlock(containerClientId);

		// Set focus on container block.
		if ("sortable/entry" === containerBlock.name) {
			selectBlock(containerClientId);
		}
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={__("Settings")}>
					<DateFormatPicker
						format={attributes.format}
						defaultFormat={siteFormat}
						is12Hour={is12HourFormat(siteTimeFormat)}
						onChange={(nextFormat) => setAttributes({ format: nextFormat })}
					/>
					<Button variant="secondary" onClick={onChangeDateClick}>
						{__("Change date", "sortable")}
					</Button>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>{entryDate}</div>
		</>
	);
}

/**
 * To know if the time format is a 12 hour time, look for any of the 12 hour
 * format characters: 'a', 'A', 'g', and 'h'. The character must be
 * unescaped, i.e. not preceded by a '\'. Coincidentally, 'aAgh' is how I
 * feel when working with regular expressions.
 * https://www.php.net/manual/en/datetime.format.php
 *
 * @param {string} dateFormat Date format.
 */
export function is12HourFormat(dateFormat) {
	return /(?:^|[^\\])[aAgh]/.test(dateFormat);
}
