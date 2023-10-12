<?php
/**
 * Plugin Name:       Sortable Block
 * Description:       A simple block to sort sections in content by date.
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Version:           1.7.0
 * Author:            Taras Dashkevych
 * Author URI:        https://tarascodes.com/
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       sortable
 *
 * @package           Sortable
 */

define( 'SORTABLE_BLOCK_PLUGIN', __FILE__ );
define( 'SORTABLE_BLOCK_PLUGIN_DIR_URL', plugin_dir_url( SORTABLE_BLOCK_PLUGIN ) );

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function sortable_plugin_init() {
	// Register Sortable Date block.
	register_block_type(
		__DIR__ . '/build/date',
		array(
			'render_callback' => 'sortable_render_block_sortable_date',
		)
	);

	// Register Sortable Entry block.
	register_block_type(
		__DIR__ . '/build/entry',
		array(
			'render_callback' => 'sortable_render_block_sortable_entry',
		)
	);

	// Register Sortable block.
	register_block_type( __DIR__ . '/build/container' );

	// Get availible patterns.
	$pattern_namespaces = glob( dirname( __FILE__ ) . '/patterns/*' );

	// Get patterns namespace only.
	$pattern_namespaces = array_map(
		function( $type_path ) {
			return basename( $type_path, '.php' );
		},
		$pattern_namespaces
	);

	// Registers block patterns.
	foreach ( $pattern_namespaces as $pattern_namespace ) {
		$pattern_file = __DIR__ . '/patterns/' . $pattern_namespace . '.php';

		if ( ! file_exists( $pattern_file ) ) {
			continue;
		}

		register_block_pattern(
			'sortable/' . $pattern_namespace,
			require $pattern_file
		);
	}
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
function sortable_render_block_sortable_date( $attributes, $content, $block ) {
	if ( ! isset( $block->context['sortable/entryDateTime'] ) ) {
		return '';
	}

	$date_format = get_option( 'date_format' );

	if ( isset( $attributes['format'] ) && '' !== $attributes['format'] ) {
		$date_format = $attributes['format'];
	}

	$date_unix_timestamp = strtotime( $block->context['sortable/entryDateTime'] );
	$unformatted_date    = date_i18n( 'c', $date_unix_timestamp );
	$formatted_date      = date_i18n( $date_format, $date_unix_timestamp );
	$wrapper_attributes  = get_block_wrapper_attributes();

	return sprintf(
		'<div %1$s><time datetime="%2$s">%3$s</time></div>',
		$wrapper_attributes,
		$unformatted_date,
		$formatted_date
	);
}

/**
 * Render callback function for the Sortable Entry block.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 *
 * @return string Return block's content.
 */
function sortable_render_block_sortable_entry( $attributes, $content, $block ) {
	// Access block context using the context property of the $block object.
	$context = $block->context;

	// Use the $context variable to access contextual information.
	$filter_settings = isset( $context['sortable/filter'] ) ? $context['sortable/filter'] : null;

	// Extract filter settings.
	$filter_date_value = isset( $filter_settings['date'] ) ? $filter_settings['date'] : '';
	$filter_date_type  = isset( $filter_settings['dateFilterType'] ) ? $filter_settings['dateFilterType'] : 'on';
	$include_date_time = isset( $filter_settings['includeDateTime'] ) ? $filter_settings['includeDateTime'] : false;

	// Determine if block is outdated.
	$is_outdated = false;

	// Only check for outdated blocks if filter date value is not empty.
	if ( ! empty( $filter_date_value ) ) {
		$block_date  = new DateTime( $attributes['dateTime'] );
		$filter_date = new DateTime( $filter_date_value );

		// Reset time to midnight if includeDateTime is false.
		if ( ! $include_date_time ) {
			$block_date->setTime( 0, 0, 0 );
			$filter_date->setTime( 0, 0, 0 );
		}

		if (
			( 'on' === $filter_date_type && $block_date !== $filter_date ) ||
			( 'after' === $filter_date_type && $block_date <= $filter_date ) ||
			( 'before' === $filter_date_type && $block_date >= $filter_date )
		) {
			$is_outdated = true;
		}
	}

	// Prepare wrapper attributes.
	$wrapper_attributes = get_block_wrapper_attributes(
		array(
			'data-event-date' => esc_attr( $attributes['dateTime'] ),
			'class'           => $is_outdated ? 'is-outdated' : '',
		)
	);

	if ( $is_outdated ) {
		return false;
	}

	// Return block content with wrapper attributes.
	return sprintf(
		'<div %1$s>%2$s</div>',
		$wrapper_attributes,
		$content
	);
}
