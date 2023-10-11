/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { emptyView, gridView, listView } from './icons';

/**
 * Template option choices for predefined columns layouts.
 *
 * @type {WPBlockVariation[]}
 */
const variations = [
	{
		name: 'empty-container',
		title: __('Empty'),
		icon: emptyView,
		description: __('Display an empty container'),
		attributes: {
			layout: 'list',
			columns: 3,
			orderBy: 'date',
			order: 'desc',
		},
		innerBlocks: [],
		scope: ['block'],
		isDefault: true,
	},
	{
		name: 'grid-date-title-description',
		title: __('Grid View'),
		icon: gridView,
		description: __(
			'Display multiple columns in a grid with date, title and description'
		),
		attributes: {
			layout: 'grid',
			columns: 3,
			orderBy: 'date',
			order: 'desc',
		},
		innerBlocks: [
			[
				'sortable/entry',
				{ dateTime: '2022-12-15T17:56:46' },
				[
					[
						'core/group',
						{},
						[
							['sortable/date', { fontSize: 'small' }],
							[
								'core/heading',
								{
									fontSize: 'large',
									placeholder: 'Enter title...',
								},
							],
						],
					],
					['core/paragraph', { placeholder: 'Enter description...' }],
				],
			],
			[
				'sortable/entry',
				{ dateTime: '2022-08-25T17:37:00' },
				[
					[
						'core/group',
						{},
						[
							['sortable/date', { fontSize: 'small' }],
							[
								'core/heading',
								{
									fontSize: 'large',
									placeholder: 'Enter title...',
								},
							],
						],
					],
					['core/paragraph', { placeholder: 'Enter description...' }],
				],
			],
			[
				'sortable/entry',
				{ dateTime: '2022-06-02T17:36:00' },
				[
					[
						'core/group',
						{},
						[
							['sortable/date', { fontSize: 'small' }],
							[
								'core/heading',
								{
									fontSize: 'large',
									placeholder: 'Enter title...',
								},
							],
						],
					],
					['core/paragraph', { placeholder: 'Enter description...' }],
				],
			],
		],
		scope: ['block'],
	},
	{
		name: 'list-date-title-description',
		title: __('List View'),
		icon: listView,
		description: __(
			'Display multiple lines in a list with date, title and description'
		),
		attributes: {
			layout: 'list',
			columns: 3,
			orderBy: 'date',
			order: 'desc',
		},
		innerBlocks: [
			[
				'sortable/entry',
				{ dateTime: '2022-12-15T17:56:46' },
				[
					[
						'core/group',
						{},
						[
							['sortable/date', { fontSize: 'small' }],
							[
								'core/heading',
								{
									fontSize: 'large',
									placeholder: 'Enter title...',
								},
							],
						],
					],
					['core/paragraph', { placeholder: 'Enter description...' }],
				],
			],
			[
				'sortable/entry',
				{ dateTime: '2022-08-25T17:37:00' },
				[
					[
						'core/group',
						{},
						[
							['sortable/date', { fontSize: 'small' }],
							[
								'core/heading',
								{
									fontSize: 'large',
									placeholder: 'Enter title...',
								},
							],
						],
					],
					['core/paragraph', { placeholder: 'Enter description...' }],
				],
			],
			[
				'sortable/entry',
				{ dateTime: '2022-06-02T17:36:00' },
				[
					[
						'core/group',
						{},
						[
							['sortable/date', { fontSize: 'small' }],
							[
								'core/heading',
								{
									fontSize: 'large',
									placeholder: 'Enter title...',
								},
							],
						],
					],
					['core/paragraph', { placeholder: 'Enter description...' }],
				],
			],
		],
		scope: ['block'],
	},
];

export default variations;
