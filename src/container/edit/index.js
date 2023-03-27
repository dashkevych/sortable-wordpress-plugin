/**
 * WordPress dependencies.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/
 */
import {
	store as blockEditorStore,
} from '@wordpress/block-editor';

/**
 * WordPress Data API functions for managing application data.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/
 */
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import ContainerContent from './container-content';
import ContainerPlaceholder from './container-placeholder';

const ContainerEdit = ( props ) => {
	const { clientId } = props;
	const hasInnerBlocks = useSelect(
		( select ) =>
			!! select( blockEditorStore ).getBlocks( clientId ).length,
		[ clientId ]
	);

	const Component = hasInnerBlocks ? ContainerContent : ContainerPlaceholder;

    return ( <Component { ...props } /> );
};

export default ContainerEdit;