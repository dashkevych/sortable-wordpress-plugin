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
	store as blockEditorStore
 } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * WordPress dependencies.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/
 */
 import { useEffect } from '@wordpress/element';
 import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Allowed blocks constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In sortable container block, the only block we allow is 'sortable/entry'.
 *
 * @constant
 * @type {string[]}
 */
const ALLOWED_BLOCKS = [ 'sortable/entry' ];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ clientId, attributes, setAttributes }) {
	const blockProps = useBlockProps();
	const { replaceInnerBlocks } = useDispatch( blockEditorStore );
	const { childBlocks } = useSelect(
		( select ) => {
			const { getBlocks } = select( blockEditorStore );

			return {
				childBlocks: getBlocks( clientId ),
			};
		},
		[ clientId ]
	);

	useEffect( () => {
		if ( ! attributes.isSorted && childBlocks.length > 0 ) {
			let temp = [...childBlocks].sort(
				(blockA, blockB) => {
					const result = Number( new Date( blockB.attributes.dateTime ) ) - Number( new Date( blockA.attributes.dateTime ) );

					return result;
				}
			);

			setAttributes({
				isSorted: true,
			});

			replaceInnerBlocks(clientId, temp, false);
		}
	}, [attributes.isSorted] );

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'horizontal',
		renderAppender: InnerBlocks.ButtonBlockAppender,
	} );

	return <div { ...innerBlocksProps } />;
}
