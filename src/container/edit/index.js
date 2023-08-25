/**
 * WordPress dependencies.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/
 */
import { store as blockEditorStore } from '@wordpress/block-editor';

/**
 * WordPress Data API functions for managing application data.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/
 */
import { useSelect } from '@wordpress/data';

/**
 * This module imports hooks from the WordPress Element package that allow React components to
 * manage state and handle side effects. These hooks provide basic building blocks for building
 * powerful, dynamic interfaces in WordPress.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 */
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import ContainerContent from './container-content';
import ContainerPlaceholder from './container-placeholder';
import PatternSelectionModal from './pattern-selection-modal';

const ContainerEdit = ( props ) => {
	const { clientId, attributes } = props;
	const [ isPatternSelectionModalOpen, setIsPatternSelectionModalOpen ] =
		useState( false );
	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( blockEditorStore ).getBlocks( clientId ).length,
		[ clientId ]
	);

	const Component = hasInnerBlocks ? ContainerContent : ContainerPlaceholder;

	return (
		<>
			<Component
				{ ...props }
				openPatternSelectionModal={ () =>
					setIsPatternSelectionModalOpen( true )
				}
			/>

			{ isPatternSelectionModalOpen && (
				<PatternSelectionModal
					clientId={ clientId }
					attributes={ attributes }
					setIsPatternSelectionModalOpen={
						setIsPatternSelectionModalOpen
					}
				/>
			) }
		</>
	);
};

export default ContainerEdit;
