/**
 * Import necessary modules from the WordPress Block Editor
 */
import {
	__experimentalBlockVariationPicker,
	useBlockProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';

/**
 * WordPress Data API functions for managing application data.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/
 */
import { useDispatch, useSelect } from '@wordpress/data';

/**
 * This module imports hooks from the WordPress Element package that allow React components to
 * manage state and handle side effects. These hooks provide basic building blocks for building
 * powerful, dynamic interfaces in WordPress.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 */
import { useState } from '@wordpress/element';

/**
 * Import functions and store from WordPress Blocks package.
 */
import {
	createBlocksFromInnerBlocksTemplate,
	store as blocksStore,
} from '@wordpress/blocks';

// Import ContainerContent component
import ContainerContent from './container-content';

/**
 * ContainerPlaceholder component
 */
export default function ContainerPlaceholder( props ) {
	const { clientId, name, setAttributes } = props;

	const { blockType, defaultVariation, variations } = useSelect(
		( select ) => {
			const {
				getBlockVariations,
				getBlockType,
				getDefaultBlockVariation,
			} = select( blocksStore );

			return {
				blockType: getBlockType( name ),
				defaultVariation: getDefaultBlockVariation( name, 'block' ),
				variations: getBlockVariations( name, 'block' ),
			};
		},
		[ name, clientId ]
	);
	const { replaceInnerBlocks } = useDispatch( blockEditorStore );
	const blockProps = useBlockProps();

	const [ isPickerVisible, setIsPickerVisible ] = useState( true );

	if ( ! isPickerVisible ) {
		return <ContainerContent { ...props } />;
	}

	return (
		<div { ...blockProps }>
			<__experimentalBlockVariationPicker
				icon={ blockType?.icon?.src }
				label={ blockType?.title }
				variations={ variations }
				onSelect={ ( nextVariation = defaultVariation ) => {
					// Handle the "Skip" button click here. You can either do nothing or perform some custom action.
					if ( ! nextVariation.innerBlocks.length ) {
						setIsPickerVisible( false );
						return;
					}

					if ( nextVariation.attributes ) {
						setAttributes( nextVariation.attributes );
					}

					if ( nextVariation.innerBlocks ) {
						const innerBlocksTemplate = nextVariation.innerBlocks;
						const createdBlocks =
							createBlocksFromInnerBlocksTemplate(
								innerBlocksTemplate
							);
						replaceInnerBlocks( clientId, createdBlocks, true );
					}
				} }
				allowSkip
			/>
		</div>
	);
}
