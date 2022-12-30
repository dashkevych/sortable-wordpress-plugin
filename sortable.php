<?php
/**
 * Plugin Name:       Sortable Block
 * Description:       A simple block to sort content by date.
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Version:           1.1.0
 * Author:            Themes Harbor
 * Author URI:        https://themesharbor.com/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       sortable
 *
 * @package           Sortable
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function sortable_plugin_init() {
	register_block_type( __DIR__ . '/build/date',array(
		'render_callback' => 'render_block_sortable_date',
	) );
	register_block_type( __DIR__ . '/build/entry' );
	register_block_type( __DIR__ . '/build/container' );
}
add_action( 'init', 'sortable_plugin_init' );

/**
 * Renders the `sortable/date` block on the server.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 * @return string Return the post comment's date.
 */
function render_block_sortable_date( $attributes, $content, $block ) {
	if ( ! isset( $block->context['sortable/entryDateTime'] ) ) {
		return '';
	}

	$date_format = get_option( 'date_format' );

	if ( isset( $attributes['format'] ) && '' !== $attributes['format'] ) {
		$date_format = $attributes['format'];
	}

	$date_unix_timestamp = strtotime( $block->context['sortable/entryDateTime'] );
	$unformatted_date    = wp_date( 'c', $date_unix_timestamp );
	$formatted_date      = wp_date( $date_format, $date_unix_timestamp );
	$wrapper_attributes  = get_block_wrapper_attributes();

	return sprintf(
		'<div %1$s><time datetime="%2$s">%3$s</time></div>',
		$wrapper_attributes,
		$unformatted_date,
		$formatted_date
	);
}
