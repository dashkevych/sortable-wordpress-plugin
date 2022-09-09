/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
    InspectorControls,
	store as blockEditorStore
} from '@wordpress/block-editor';

/**
 * This package includes a library of generic WordPress components.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import {
	DateTimePicker,
	PanelBody,
	PanelRow,
} from '@wordpress/components';

/**
 * WordPress dependencies.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/
 */
import { useEffect } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * Allowed blocks constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In columns block, the only block we allow is 'core/column'.
 *
 * @constant
 * @type {string[]}
 */
const ALLOWED_BLOCKS = [ 'core/paragraph', 'core/media-text', 'core/columns' ];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({
	clientId,
	attributes: { dateTime },
	setAttributes
}) {
	const blockProps = useBlockProps();
	const { updateBlockAttributes } = useDispatch( blockEditorStore );

	const { rootClientId, hasChildBlocks } = useSelect(
		( select ) => {
			const { getBlockRootClientId, getBlockOrder } = select( blockEditorStore );
			const rootId = getBlockRootClientId( clientId );

			return {
				rootClientId: rootId,
				hasChildBlocks: getBlockOrder( clientId ).length > 0,
			};
		},
		[ clientId ]
	);

	// Update date in block.
	const updateDate = ( value ) => {
		setAttributes({ dateTime: value });

		// Reset parent block.
		updateBlockAttributes( rootClientId, {
			isSorted: false,
		} );
	};

	useEffect( () => {
		if ( ! dateTime ) {
			setAttributes({ dateTime: new Date() });

			// Reset parent block.
			updateBlockAttributes( rootClientId, {
				isSorted: false,
			} );
		}
	}, [ dateTime ] );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'horizontal',
		renderAppender: hasChildBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Date Settings', 'sortable' ) }>
					<PanelRow>
						<DateTimePicker
							currentDate={ dateTime }
							onChange={ updateDate }
							is12Hour={ true }
							__nextRemoveHelpButton
							__nextRemoveResetButton
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			<div { ...innerBlocksProps } />
		</>
	);
}
