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
	store as blockEditorStore,
} from '@wordpress/block-editor';

/**
 * This package includes a library of generic WordPress components.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { DateTimePicker, PanelBody, PanelRow } from '@wordpress/components';

/**
 * WordPress dependencies.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/ ,
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/
 */
import { useEffect } from '@wordpress/element';

/**
 * WordPress Data API functions for managing application data.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/
 */
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
const ALLOWED_BLOCKS = [
	'sortable/date',
	'core/heading',
	'core/paragraph',
	'core/media-text',
	'core/group',
	'core/columns',
	'core/block',
];

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
	const { clientId, attributes, setAttributes } = props;
	const { dateTime } = attributes;
	const blockProps = useBlockProps();
	const { updateBlockAttributes } = useDispatch( blockEditorStore );

	const { rootClientId, childBlocks } = useSelect(
		( select ) => {
			const { getBlockRootClientId, getBlock } =
				select( blockEditorStore );
			const rootId = getBlockRootClientId( clientId );
			const parentBlock = getBlock( clientId );

			return {
				rootClientId: rootId,
				childBlocks: parentBlock ? parentBlock.innerBlocks : [],
			};
		},
		[ clientId ]
	);

	// Update date in block.
	const updateDate = ( value ) => {
		setAttributes( { dateTime: value } );

		// Reset parent block sorting.
		updateBlockAttributes( rootClientId, {
			orderBy: '',
		} );
	};

	useEffect( () => {
		if ( ! dateTime ) {
			setAttributes( { dateTime: new Date() } );

			// Reset parent block sorting.
			updateBlockAttributes( rootClientId, {
				orderBy: '',
			} );
		}
	}, [ dateTime ] );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'horizontal',
		renderAppender: childBlocks.length
			? undefined
			: InnerBlocks.ButtonBlockAppender,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Date Settings', 'sortable' ) }>
					<PanelRow className="sortable-block__date-row">
						<DateTimePicker
							currentDate={ dateTime }
							onChange={ updateDate }
							is12Hour={ true }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			<div { ...innerBlocksProps } />
		</>
	);
}
