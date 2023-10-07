<?php
/**
 * Plugin Name:       Sortable Block
 * Description:       A simple block to sort sections in content by date.
 * Requires at least: 6.1
 * Requires PHP:      7.4
 * Version:           1.6.0
 * Author:            Taras Dashkevych
 * Author URI:        https://tarascodes.com/
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

	// Register Pattern.
	register_block_pattern(
		'sortable/changelog-layout-1',
		array(
			'title'       => esc_html__( 'Changelog List', 'sortable' ),
			'description' => _x( 'Layout to create changelog list with version number, date, and list.', 'Block pattern description', 'sortable' ),
			'blockTypes'  => array( 'sortable/container' ),
			'content'     => '<!-- wp:sortable/container -->
			<div class="wp-block-sortable-container is-list">
				<!-- wp:sortable/entry {"dateTime":"2023-08-28T10:21:00"} -->
				<div class="wp-block-sortable-entry">
					<!-- wp:group {"style":{"spacing":{"blockGap":"1.5em"}},"layout":{"type":"constrained"}} -->
					<div class="wp-block-group">
						<!-- wp:separator {"backgroundColor":"cyan-bluish-gray"} -->
						<hr class="wp-block-separator has-text-color has-cyan-bluish-gray-color has-alpha-channel-opacity has-cyan-bluish-gray-background-color has-background" />
						<!-- /wp:separator -->
						<!-- wp:group {"style":{"spacing":{"blockGap":"1em"}},"layout":{"type":"flex","orientation":"vertical"}} -->
						<div class="wp-block-group">
							<!-- wp:group {"style":{"spacing":{"blockGap":"1em"}},"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"center"}} -->
							<div class="wp-block-group">
								<!-- wp:paragraph -->
								<p><strong>1.1.0</strong></p>
								<!-- /wp:paragraph -->
								<!-- wp:sortable/date {"textColor":"vivid-purple"} /-->
							</div>
							<!-- /wp:group -->
							<!-- wp:list {"fontSize":"normal"} -->
							<ul class="has-normal-font-size">
								<!-- wp:list-item -->
								<li><strong>Add:</strong> support for colors in Sortable Date block;</li>
								<!-- /wp:list-item -->
								<!-- wp:list-item -->
								<li><strong>Add:</strong> support for padding dimensions in Sortable Date block;</li>
								<!-- /wp:list-item -->
								<!-- wp:list-item -->
								<li><strong>Update:</strong> improve Insert buttons in the editor;</li>
								<!-- /wp:list-item -->
								<!-- wp:list-item -->
								<li><strong>Update:</strong> detect time format in Sortable Date block;</li>
								<!-- /wp:list-item -->
								<!-- wp:list-item -->
								<li><strong>Update:</strong> allow Group block in Sortable Entry;</li>
								<!-- /wp:list-item -->
								<!-- wp:list-item -->
								<li><strong>Fix:</strong> style back-end issues;</li>
								<!-- /wp:list-item -->
								<!-- wp:list-item -->
								<li><strong>Fix:</strong> button contrast issue in Sortable Container;</li>
								<!-- /wp:list-item -->
								<!-- wp:list-item -->
								<li><strong>Fix:</strong> wrong time output in Sortable Date block when viewed on front-end;</li>
								<!-- /wp:list-item -->
							</ul>
							<!-- /wp:list -->
						</div>
						<!-- /wp:group -->
					</div>
					<!-- /wp:group -->
				</div>
				<!-- /wp:sortable/entry -->
				<!-- wp:sortable/entry {"dateTime":"2023-07-12T10:21:00"} -->
				<div class="wp-block-sortable-entry">
					<!-- wp:group {"style":{"spacing":{"blockGap":"1.5em"}},"layout":{"type":"constrained"}} -->
					<div class="wp-block-group">
						<!-- wp:separator {"backgroundColor":"cyan-bluish-gray"} -->
						<hr class="wp-block-separator has-text-color has-cyan-bluish-gray-color has-alpha-channel-opacity has-cyan-bluish-gray-background-color has-background" />
						<!-- /wp:separator -->
						<!-- wp:group {"style":{"spacing":{"blockGap":"1em"}},"layout":{"type":"flex","orientation":"vertical"}} -->
						<div class="wp-block-group">
							<!-- wp:group {"style":{"spacing":{"blockGap":"1em"}},"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"center"}} -->
							<div class="wp-block-group">
								<!-- wp:paragraph -->
								<p><strong>1.0.1</strong></p>
								<!-- /wp:paragraph -->
								<!-- wp:sortable/date {"textColor":"vivid-purple"} /-->
							</div>
							<!-- /wp:group -->
							<!-- wp:list {"fontSize":"normal"} -->
							<ul class="has-normal-font-size">
								<!-- wp:list-item -->
								<li><strong>Update:</strong> allow Group block in Sortable Entry;</li>
								<!-- /wp:list-item -->
								<!-- wp:list-item -->
								<li><strong>Update:</strong> detect time format in Sortable Date block;</li>
								<!-- /wp:list-item -->
								<!-- wp:list-item -->
								<li><strong>Update:</strong> improve Insert buttons in the editor;</li>
								<!-- /wp:list-item -->
								<!-- wp:list-item -->
								<li><strong>Fix:</strong> style back-end issues;</li>
								<!-- /wp:list-item -->
								<!-- wp:list-item -->
								<li><strong>Fix:</strong> wrong time output in Sortable Date block when viewed on front-end;</li>
								<!-- /wp:list-item -->
							</ul>
							<!-- /wp:list -->
						</div>
						<!-- /wp:group -->
					</div>
					<!-- /wp:group -->
				</div>
				<!-- /wp:sortable/entry -->
				<!-- wp:sortable/entry {"dateTime":"2022-05-05T10:21:00"} -->
				<div class="wp-block-sortable-entry">
					<!-- wp:group {"style":{"spacing":{"blockGap":"1.5em"}},"layout":{"type":"constrained"}} -->
					<div class="wp-block-group">
						<!-- wp:separator {"backgroundColor":"cyan-bluish-gray"} -->
						<hr class="wp-block-separator has-text-color has-cyan-bluish-gray-color has-alpha-channel-opacity has-cyan-bluish-gray-background-color has-background" />
						<!-- /wp:separator -->
						<!-- wp:group {"style":{"spacing":{"blockGap":"1em"}},"layout":{"type":"flex","orientation":"vertical"}} -->
						<div class="wp-block-group">
							<!-- wp:group {"style":{"spacing":{"blockGap":"1em"}},"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"center"}} -->
							<div class="wp-block-group">
								<!-- wp:paragraph -->
								<p><strong>1.0.0</strong></p>
								<!-- /wp:paragraph -->
								<!-- wp:sortable/date {"textColor":"vivid-purple"} /-->
							</div>
							<!-- /wp:group -->
							<!-- wp:list {"fontSize":"normal"} -->
							<ul class="has-normal-font-size">
								<!-- wp:list-item -->
								<li>Initial release.</li>
								<!-- /wp:list-item -->
							</ul>
							<!-- /wp:list -->
						</div>
						<!-- /wp:group -->
					</div>
					<!-- /wp:group -->
				</div>
				<!-- /wp:sortable/entry -->
			</div>
			<!-- /wp:sortable/container -->',
		)
	);
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
    $filter_date_type = isset( $filter_settings['dateFilterType'] ) ? $filter_settings['dateFilterType'] : 'on';
    $include_date_time = isset( $filter_settings['includeDateTime'] ) ? $filter_settings['includeDateTime'] : false;

    // Determine if block is outdated.
    $is_outdated = false;

    // Only check for outdated blocks if filter date value is not empty.
    if ( !empty($filter_date_value) ) {
        $block_date = new DateTime( $attributes['dateTime'] );
        $filter_date = new DateTime( $filter_date_value );

        // Reset time to midnight if includeDateTime is false.
        if ( ! $include_date_time ) {
            $block_date->setTime(0, 0, 0);
            $filter_date->setTime(0, 0, 0);
        }

        if (
            ($filter_date_type === 'on' && $block_date != $filter_date) ||
            ($filter_date_type === 'after' && $block_date <= $filter_date) ||
            ($filter_date_type === 'before' && $block_date >= $filter_date)
        ) {
            $is_outdated = true;
        }
    }

    // Prepare wrapper attributes.
    $wrapper_attributes = get_block_wrapper_attributes( array(
        'data-event-date' => esc_attr( $attributes['dateTime'] ),
        'class' => $is_outdated ? 'is-outdated' : '',
    ) );

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
