/**
 * Utility to conditionally join classNames together.
 *
 * @see https://www.npmjs.com/package/classnames
 */
import classnames from "classnames";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	useInnerBlocksProps,
	__experimentalGetGapCSSValue as getGapCSSValue,
} from "@wordpress/block-editor";

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
export default function save(props) {
	const { attributes } = props;

	// Destructure the separator attribute.
	const { width, style, color } = attributes.separator || {};

	// Construct style properties based on the separator properties.
	const separatorStyles = {
		...(width && { "--wp--sortable-container--separator--width": width }),
		...(style && { "--wp--sortable-container--separator--style": style }),
		...(color && { "--wp--sortable-container--separator--color": color }),
	};

	// Custom spacing value.
	const gap = getGapCSSValue(attributes.style?.spacing?.blockGap);

	// Construct style properties based on the spacing properties.
	const spacingStyles = {
		...(gap && { "--wp--sortable-container--spacing--gap": gap }),
	};

	const innerBlocksProps = useInnerBlocksProps.save(
		useBlockProps.save({
			className: classnames({
				"is-list": attributes.layout === "list",
				"is-grid": attributes.layout === "grid",
				[`columns-${attributes.columns}`]: attributes.layout === "grid",
				// Add has-separator class if any of the separator properties exist
				"has-separator": width || style || color,
			}),
			style: {
				...separatorStyles,
				...spacingStyles,
			},
		})
	);

	return <div {...innerBlocksProps} />;
}
