<?php
/**
 * Pattern: Changelog List
 *
 * @package Sortable
 */

return array(
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
);
