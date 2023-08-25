/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

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

/**
 * WordPress core components.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/
 */
import { Button, Placeholder } from '@wordpress/components';

// Import ContainerContent component
import ContainerContent from './container-content';

/**
 * ContainerPlaceholder component
 *
 * @param props
 */
export default function ContainerPlaceholder( props ) {
	const { clientId, name, openPatternSelectionModal, setAttributes } = props;

	// Define the phases
	const PHASES = {
		PICKER: 'picker',
		BLANK: 'blank',
		CONTENT: 'content',
	};

	// Replace isPickerVisible and isStartingBlank with currentPhase
	const [ currentPhase, setCurrentPhase ] = useState( PHASES.PICKER );

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

	// Check if the user want to use the Variation Picker when first use block.
	if ( currentPhase === PHASES.BLANK ) {
		return (
			<__experimentalBlockVariationPicker
				icon={ blockType?.icon?.src }
				label={ blockType?.title }
				variations={ variations }
				onSelect={ ( nextVariation = defaultVariation ) => {
					// Handle the "Skip" button click here. You can either do nothing or perform some custom action.
					if ( ! nextVariation.innerBlocks.length ) {
						setCurrentPhase( PHASES.CONTENT );
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

					setCurrentPhase( PHASES.CONTENT );
				} }
				allowSkip
			/>
		);
	}

	if ( currentPhase === PHASES.CONTENT ) {
		return <ContainerContent { ...props } />;
	}

	const hasPatterns = true;

	return (
		<div { ...blockProps }>
			<Placeholder
				icon={ blockType?.icon?.src }
				label={ blockType?.title }
				instructions={ __( 'Choose a pattern or start blank.' ) }
			>
				{ !! hasPatterns && (
					<Button
						variant="primary"
						onClick={ openPatternSelectionModal }
					>
						{ __( 'Choose' ) }
					</Button>
				) }

				<Button
					variant="secondary"
					onClick={ () => {
						setCurrentPhase( PHASES.BLANK );
					} }
				>
					{ __( 'Start blank' ) }
				</Button>
			</Placeholder>
		</div>
	);
}
