/**
 * Utility to conditionally join classNames together.
 *
 * @see https://www.npmjs.com/package/classnames
 */
import classnames from "classnames";

/**
 * React hooks from the WordPress block editor used for block properties and inner block handling.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	useInnerBlocksProps,
	__experimentalGetGapCSSValue as getGapCSSValue,
} from "@wordpress/block-editor";

/**
 * Deprecation configuration for a custom WordPress Gutenberg block.
 *
 * WordPress allows multiple block configurations (versions) to handle deprecations.
 * Each configuration can have different attribute schemas and save functions to account
 * for changes over time. This allows for backward compatibility in serialized blocks.
 */

/**
 * Configuration for version 1 of the custom block.
 *
 * Defines attributes such as layout, columns, orderBy, and order.
 * Provides a save function to determine the block's output in this version.
 */
const v2 = {
	/**
	 * Object defining the block's attributes and their default values.
	 */
	attributes: {
		layout: {
			type: "string",
			default: "list",
		},
		columns: {
			type: "number",
			default: 3,
		},
		orderBy: {
			type: "string",
			default: "date",
		},
		order: {
			type: "string",
			default: "desc",
		},
		separator: {
			type: "object",
			default: {},
		},
	},
	/**
	 * The function that determines the block's save output for this version.
	 *
	 * @param {Object} props - The properties of the block.
	 * @returns {JSX.Element} The block's saved markup for this version.
	 */
	save(props) {
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

		// Inner blocks (children of parent block).
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
			}),
		);

		return <div {...innerBlocksProps} />;
	},
};

/**
 * Configuration for version 1 of the custom block.
 *
 * Defines attributes such as layout, columns, orderBy, and order.
 * Provides a save function to determine the block's output in this version.
 */
const v1 = {
	/**
	 * Object defining the block's attributes and their default values.
	 */
	attributes: {
		layout: {
			type: "string",
			default: "list",
		},
		columns: {
			type: "number",
			default: 3,
		},
		orderBy: {
			type: "string",
			default: "date",
		},
		order: {
			type: "string",
			default: "desc",
		},
	},

	/**
	 * The function that determines the block's save output for this version.
	 *
	 * @param {Object} props - The properties of the block.
	 * @returns {JSX.Element} The block's saved markup for this version.
	 */
	save(props) {
		const { attributes } = props;
		const innerBlocksProps = useInnerBlocksProps.save(
			useBlockProps.save({
				className: classnames({
					"is-list": attributes.layout === "list",
					"is-grid": attributes.layout === "grid",
					[`columns-${attributes.columns}`]: attributes.layout === "grid",
				}),
			}),
		);

		return <div {...innerBlocksProps} />;
	},
};

/**
 * Exports an array of block configurations for deprecation handling.
 * As of now, only version 1 (v1) is provided.
 */
export default [v2, v1];
