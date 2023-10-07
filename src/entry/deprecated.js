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
const v1 = {
	/**
	 * The function that determines the block's save output for this version.
	 *
	 * @param {Object} props - The properties of the block.
	 * @returns {JSX.Element} The block's saved markup for this version.
	 */
	save() {
		const innerBlocksProps = useInnerBlocksProps.save(useBlockProps.save());

		return <div {...innerBlocksProps} />;
	},
};

/**
 * Exports an array of block configurations (versions) for deprecation handling.
 */
export default [v1];
