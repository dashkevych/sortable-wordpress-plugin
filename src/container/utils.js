/**
 * WordPress Data API functions for managing application data.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/
 */
import { useSelect } from '@wordpress/data';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Retrieves the available block patterns.
 *
 * @param {string} clientId Block Client ID. (The container of the block can impact allowed blocks).
 *
 * @return {Array} array of block patterns.
 */
export function useSortableBlockPatterns( clientId ) {
	return useSelect(
		( select ) => {
			const currentBlockType = 'sortable/container';
			const { getBlockRootClientId, getPatternsByBlockTypes } =
				select( blockEditorStore );
			const rootClientId = getBlockRootClientId( clientId );
			return getPatternsByBlockTypes( currentBlockType, rootClientId );
		},
		[ clientId ]
	);
}
