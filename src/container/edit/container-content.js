/**
 * Utility to conditionally join classNames together.
 *
 * @see https://www.npmjs.com/package/classnames
 */
import classnames from 'classnames';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook and components from the WordPress block editor package.
 *
 * - blockEditorStore:
 *     - Redux store specific to the block editor's state.
 *     - Manages state related to blocks like their attributes, order, selection, undo/redo history, etc.
 *     - Part of the `@wordpress/block-editor` package, allowing for block-editing interfaces beyond the post-editing screen.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	BlockControls,
	store as blockEditorStore,
	__experimentalGetGapCSSValue as getGapCSSValue,
} from '@wordpress/block-editor';

/**
 * Components from the WordPress editor package.
 *
 * - editorStore:
 *     - Redux store specific to the post editor in WordPress.
 *     - Manages state outside of block content like post title, post status, and whether the post is being saved.
 *     - Part of the `@wordpress/editor` package, integrating the block editor with the post editing experience.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-editor/
 */
import { store as editorStore } from '@wordpress/editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './../editor.scss';

/**
 * WordPress core element library functions for building user interfaces.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/
 */
import { useEffect } from '@wordpress/element';

/**
 * WordPress Data API functions for managing application data.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/
 */
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * WordPress core components library for building user interfaces.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import {
	RangeControl,
	PanelBody,
	ToolbarGroup,
	SelectControl,
	__experimentalToolsPanel as ToolsPanel,
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalBorderControl as BorderControl,
} from '@wordpress/components';

/**
 * Import icons from the WordPress Icons package.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-icons/
 */
import { list, grid } from '@wordpress/icons';

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
 * @param {Object} props All props passed to this function.
 * @return {WPElement} Element to render.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 */
export default function ContainerContent( props ) {
	const { clientId, attributes, setAttributes } = props;

	// Destructure the separator attribute.
	const { width, style, color } = attributes.separator || {};

	// Construct style properties based on the separator properties.
	const separatorStyles = {
		...( width && { '--wp--sortable-container--separator--width': width } ),
		...( style && { '--wp--sortable-container--separator--style': style } ),
		...( color && { '--wp--sortable-container--separator--color': color } ),
	};

	// Custom spacing value.
	const gap = getGapCSSValue( attributes.style?.spacing?.blockGap );

	// Construct style properties based on the spacing properties.
	const spacingStyles = {
		...( gap && { '--wp--sortable-container--spacing--gap': gap } ),
	};

	const blockProps = useBlockProps( {
		className: classnames( {
			'is-list': attributes.layout === 'list',
			'is-grid': attributes.layout === 'grid',
			[ `columns-${ attributes.columns }` ]: attributes.layout === 'grid',
			// Add has-separator class if any of the separator properties exist
			'has-separator': width || style || color,
		} ),
		style: {
			...separatorStyles,
			...spacingStyles,
		},
	} );

	const { replaceInnerBlocks } = useDispatch( blockEditorStore );

	// Editor settings.
	const editorSettings = useSelect( ( select ) => {
		return select( editorStore ).getEditorSettings();
	}, [] );

	// Get child blocks.
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
		if (
			( childBlocks.length > 0 && ! attributes.orderBy ) ||
			attributes.order
		) {
			let sortedBlocks = [];
			if ( attributes.order === 'asc' ) {
				sortedBlocks = [ ...childBlocks ].sort( ( blockA, blockB ) => {
					const result =
						Number( new Date( blockA.attributes.dateTime ) ) -
						Number( new Date( blockB.attributes.dateTime ) );

					return result;
				} );
			} else {
				sortedBlocks = [ ...childBlocks ].sort( ( blockA, blockB ) => {
					const result =
						Number( new Date( blockB.attributes.dateTime ) ) -
						Number( new Date( blockA.attributes.dateTime ) );

					return result;
				} );
			}

			setAttributes( {
				orderBy: 'date',
			} );

			replaceInnerBlocks( clientId, sortedBlocks, false );
		}
	}, [ attributes.orderBy, attributes.order ] );

	// Update order.
	useEffect( () => {
		// Make sure order attribute is set.
		if ( attributes.order === '' ) {
			setAttributes( { order: 'desc' } );
		}
	}, [ attributes.order ] );

	// Set orientation based on layout
	const orientation =
		attributes.layout === 'grid' ? 'horizontal' : 'vertical';

	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: orientation,
		renderAppender: InnerBlocks.ButtonBlockAppender,
	} );

	return (
		<>
			<InspectorControls>
				{ attributes.layout === 'grid' && (
					<PanelBody title={ __( 'Grid settings' ) }>
						<RangeControl
							__nextHasNoMarginBottom
							label={ __( 'Columns' ) }
							value={ attributes.columns }
							onChange={ ( value ) =>
								setAttributes( { columns: value } )
							}
							min={ 2 }
							max={ 6 }
							required
						/>
					</PanelBody>
				) }
				<PanelBody title={ __( 'Order settings' ) }>
					<SelectControl
						label={ __( 'Order' ) }
						value={ attributes.order }
						options={ [
							{ label: __( 'Newest to oldest' ), value: 'desc' },
							{ label: __( 'Oldest to newest' ), value: 'asc' },
						] }
						onChange={ ( value ) =>
							setAttributes( { order: value } )
						}
						__nextHasNoMarginBottom
					/>
				</PanelBody>
			</InspectorControls>
			<InspectorControls group="styles">
				<ToolsPanel label={ __( 'Separator' ) }>
					<ToolsPanelItem
						isShownByDefault
						label={ __( 'Appearance' ) }
						hasValue={ () => !! attributes.separator }
						onDeselect={ () =>
							setAttributes( { separator: undefined } )
						}
					>
						<BorderControl
							colors={ editorSettings?.colors }
							onChange={ ( newBorder ) => {
								setAttributes( { separator: newBorder } );
							} }
							value={ attributes.separator }
							withSlider
						/>
					</ToolsPanelItem>
				</ToolsPanel>
			</InspectorControls>
			<BlockControls>
				<ToolbarGroup
					controls={ [
						{
							icon: list,
							title: __( 'List view' ),
							onClick: () => setAttributes( { layout: 'list' } ),
							isActive: attributes.layout === 'list',
						},
						{
							icon: grid,
							title: __( 'Grid view' ),
							onClick: () => setAttributes( { layout: 'grid' } ),
							isActive: attributes.layout === 'grid',
						},
					] }
				/>
			</BlockControls>
			<div { ...innerBlocksProps } />
		</>
	);
}
