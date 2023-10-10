/**
 * Utility to conditionally join classNames together.
 *
 * @see https://www.npmjs.com/package/classnames
 */
import classnames from "classnames";

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	BlockControls,
	store as blockEditorStore,
} from "@wordpress/block-editor";

/**
 * This package includes a library of generic WordPress components.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import {
	Toolbar,
	Button,
	Modal,
	DateTimePicker,
	PanelBody,
	PanelRow,
} from "@wordpress/components";

/**
 * WordPress dependencies.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-element/ ,
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/
 */
import { useState, useEffect } from "@wordpress/element";

/**
 * WordPress Data API functions for managing application data.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/
 */
import { useSelect, useDispatch } from "@wordpress/data";

/**
 * Import icons from the WordPress Icons package.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-icons/
 */
import { warning } from "@wordpress/icons";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * Allowed blocks constant is passed to InnerBlocks precisely as specified here.
 * The contents of the array should never change.
 * The array should contain the name of each block that is allowed.
 * In columns block, the only block we allow is 'core/column'.
 *
 * @constant
 * @type {string[]}
 */
const ALLOWED_BLOCKS = [
	"sortable/date",
	"core/heading",
	"core/paragraph",
	"core/media-text",
	"core/cover",
	"core/group",
	"core/columns",
	"core/block",
];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param {Object} props All props passed to this function.
 * @return {WPElement} Element to render.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 */
export default function Edit(props) {
	const { context, clientId, attributes, setAttributes } = props;
	const { updateBlockAttributes } = useDispatch(blockEditorStore);
	const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);
	const {
		date: filterDateValue,
		dateFilterType,
		includeDateTime,
		ignoreOutdated,
	} = context["sortable/filter"];
	let isOutdated = false;

	// Create a JavaScript Date object from the block date value.
	const blockDateObject = new Date(attributes.dateTime);
	// Create a JavaScript Date object from the filter date value.
	const filterDateObject = new Date(filterDateValue);
	if (!isNaN(filterDateObject.getTime())) {
		// Reset the time part of the date objects to midnight if includeDateTime is false.
		if (!includeDateTime) {
			blockDateObject.setHours(0, 0, 0, 0);
			filterDateObject.setHours(0, 0, 0, 0);
		}

		// Determine if the block date is outdated based on the filter date and type.
		if (
			dateFilterType === "on" &&
			blockDateObject.getTime() !== filterDateObject.getTime()
		) {
			isOutdated = true;
		} else if (
			dateFilterType === "after" &&
			blockDateObject <= filterDateObject
		) {
			isOutdated = true;
		} else if (
			dateFilterType === "before" &&
			blockDateObject >= filterDateObject
		) {
			isOutdated = true;
		}
	} else {
		if (filterDateValue !== "") {
			console.error("Invalid date:", filterDateValue);
		}
	}

	const blockProps = useBlockProps({
		"data-event-date": attributes.dateTime ? attributes.dateTime : "",
		className: classnames({ "is-outdated": isOutdated }),
	});

	const { rootClientId, childBlocks } = useSelect(
		(select) => {
			const { getBlockRootClientId, getBlock } = select(blockEditorStore);
			const rootId = getBlockRootClientId(clientId);
			const parentBlock = getBlock(clientId);

			return {
				rootClientId: rootId,
				childBlocks: parentBlock ? parentBlock.innerBlocks : [],
			};
		},
		[clientId],
	);

	// Update date in block.
	const updateDate = (value) => {
		setAttributes({ dateTime: value });

		// Reset parent block sorting.
		updateBlockAttributes(rootClientId, {
			orderBy: "",
		});
	};

	useEffect(() => {
		if (!attributes.dateTime) {
			setAttributes({ dateTime: new Date() });

			// Reset parent block sorting.
			updateBlockAttributes(rootClientId, {
				orderBy: "",
			});
		}
	}, [rootClientId, attributes.dateTime]);

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: "vertical",
		renderAppender: childBlocks.length
			? undefined
			: InnerBlocks.ButtonBlockAppender,
	});

	return (
		<>
			{isOpenWarningModal && filterDateObject && (
				<Modal
					title={__("This Block's Date is Old", "sortable")}
					onRequestClose={() => setIsOpenWarningModal(false)}
					className="sortable-block__warning-modal"
				>
					<div className="sortable-block__warning-modal-content">
						<p>
							{__(
								'You are seeing this notice because the date on this "Sortable Entry" block is older than the date you set on the "Sortable" block.',
								"sortable",
							)}
						</p>
						<p>
							<strong>
								{__("Here's a summary of the dates:", "sortable")}
							</strong>
						</p>
						<ul>
							<li>
								{__('Date set in "Sortable":', "sortable")}{" "}
								<strong>
									{filterDateObject.toLocaleString("en-US", {
										month: "long",
										day: "2-digit",
										year: "numeric",
									})}
								</strong>
							</li>
							<li>
								{__('Date on this "Sortable Entry":', "sortable")}{" "}
								<strong>
									{blockDateObject.toLocaleString("en-US", {
										month: "long",
										day: "2-digit",
										year: "numeric",
									})}
								</strong>
							</li>
						</ul>
						<p>
							<strong>{__("To resolve warning, you can:", "sortable")}</strong>
						</p>
						<ol>
							<li>
								{__(
									'Ignore warnings by changing a setting in the "Sortable" block.',
									"sortable",
								)}
							</li>
							<li>
								{__(
									'Change the date in the "Sortable" block to cover more dates.',
									"sortable",
								)}
							</li>
							<li>
								{__(
									'Update the date on this "Sortable Entry" block to a newer date.',
									"sortable",
								)}
							</li>
						</ol>
						<p>
							{__(
								"Changes can be made in the block settings sidebar.",
								"sortable",
							)}
						</p>
					</div>
					<Button
						variant="secondary"
						onClick={() => setIsOpenWarningModal(false)}
					>
						{__("Close Warning", "sortable")}
					</Button>
				</Modal>
			)}
			{isOutdated && !ignoreOutdated && (
				<BlockControls>
					<Toolbar>
						<Button
							label={__("Inspect visibility problem", "sortable")}
							icon={warning}
							onClick={() => {
								setIsOpenWarningModal(!isOpenWarningModal);
							}}
							isPressed={isOpenWarningModal}
						/>
					</Toolbar>
				</BlockControls>
			)}
			<InspectorControls>
				<PanelBody title={__("Date", "sortable")}>
					<PanelRow className="sortable-block__date-row">
						<DateTimePicker
							currentDate={attributes.dateTime}
							onChange={updateDate}
							is12Hour={true}
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>

			<div {...innerBlocksProps} />
		</>
	);
}
