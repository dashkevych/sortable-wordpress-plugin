import classnames from 'classnames';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @param {Object} props All props passed to this function.
 * @return {WPElement} Element to render.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 */
export default function save( props ) {
	const { attributes } = props;
	const innerBlocksProps = useInnerBlocksProps.save(
		useBlockProps.save( {
			className: classnames( {
				'is-list': attributes.layout === 'list',
				'is-grid': attributes.layout === 'grid',
				[ `columns-${ attributes.columns }` ]:
					attributes.layout === 'grid',
			} ),
		} )
	);

	return <div { ...innerBlocksProps } />;
}
