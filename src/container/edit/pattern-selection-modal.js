/**
 * WordPress Data API functions for managing application data.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/
 */
import { useDispatch } from '@wordpress/data';

/**
 * WordPress core components.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/
 */
import { Modal } from '@wordpress/components';

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
	store as blockEditorStore,
	__experimentalBlockPatternsList as BlockPatternsList,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { useSortableBlockPatterns } from '../utils';

export default function PatternSelectionModal({
	clientId,
	attributes,
	setIsPatternSelectionModalOpen,
}) {
	const { replaceBlock, selectBlock } = useDispatch(blockEditorStore);

	const onBlockPatternSelect = (pattern, blocks) => {
		const { newBlocks, clientIds } = getTransformedBlocks(
			blocks,
			attributes
		);

		replaceBlock(clientId, newBlocks);

		if (clientIds[0]) {
			selectBlock(clientIds[0]);
		}
	};

	const blockPatterns = useSortableBlockPatterns(clientId);

	return (
		<Modal
			overlayClassName="block-library-sortable-pattern__selection-modal"
			title={__('Choose a pattern')}
			onRequestClose={() => setIsPatternSelectionModalOpen(false)}
			isFullScreen={true}
		>
			<div className="block-library-sortable-pattern__selection-content">
				<BlockPatternsList
					blockPatterns={blockPatterns}
					shownPatterns={blockPatterns}
					onClickPattern={onBlockPatternSelect}
				/>
			</div>
		</Modal>
	);
}

const getTransformedBlocks = (blocks) => {
	// Transform the blocks based on your requirements.
	// For simplicity, in this example, I'll just return the blocks as they are, but you can modify them as necessary.
	const newBlocks = blocks.map((block) => {
		// Here, you can do any transformation on each block. For now, we're just returning the block as it is.
		return block;
	});

	// Extract block IDs from the blocks. This assumes that each block has a clientId property.
	const clientIds = blocks.map((block) => block.clientId);

	return { newBlocks, clientIds };
};
