=== Sortable Block - Organize Sections by Date ===
Contributors:      taskotr
Author URI:        https://themesharbor.com/
Tags:              block, sorting, sort, blocks, filter, block sort, blocks sorting, filter content, simple events calendar, product changelog, timeline
Tested up to:      6.2
Requires at Least: 6.1
Requires PHP:      7.4
Stable tag:        1.4.2
Text Domain:       sortable
License:           GPLv2 or later
License URI:       http://www.gnu.org/licenses/gpl-2.0.html

Easily create customizable, sortable sections on your website using WordPress blocks with the Sortable Block plugin.

== Description ==

The Sortable Block plugin enables you to create sortable sections on your website using WordPress blocks. This powerful tool allows you to effortlessly build and organize content within a container, with each inner section being sortable by date.

With the flexibility of using any WordPress block to design your inner sections, you can create a variety of layouts tailored to your needs. This plugin is perfect for managing event calendars, product changelogs, media mentions, and more.

Choose between two layout options - list and grid - for even more customization and a seamless user experience.

Create dynamic, sortable sections with ease using the Sortable Block plugin!

=== Examples ===

* Sortable block used for [Changelog](https://themesharbor.com/sortable-block-plugin/#changelog) section;

=== Stay Connected ===

* [Follow on Twitter](https://twitter.com/themesharbor/)
* [Follow on Instagram](https://www.instagram.com/themesharbor/)

== Installation ==

1. Choose one of the following options:
	* Go to Plugins → Add New in your WordPress dashboard, search for "Sortable Block", and click "Install".
	* Download the Sortable Block plugin from WordPress.org, ensure the folder is zipped, and then upload it via Plugins → Add New → Upload.
    * Open the block inserter within the Block Editor, search for "icon", and the plugin should appear, allowing you to install it directly. Skip steps 2 and 3.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Search for the block within the Block Editor and start using it.

== Frequently Asked Questions ==

= How do I sort blocks? =

1. Add a Sortable block to the content area in the Block Editor. This serves as the main container for entries that need sorting.
2. Inside the Sortable block, add Sortable Entry blocks. These containers hold your content. Note that you can have multiple entries inside a Sortable block.
3. Each Sortable Entry has a date option. To change this option, select a Sortable Entry within the List View, and modify the Date Settings in the Block sidebar.

= How do I change the layout? =

1. In the Block Editor, select the Sortable block within the List View.
2. In the block toolbar, click on either the List view or Grid view icon to switch layouts.

= How do I change the order of entries? =

1. In the Block Editor, select the Sortable block within the List View.
2. In the Block sidebar, choose either "Newest to Oldest" or "Oldest to Newest" from the dropdown menu in the Order settings section.

= What blocks can I use inside a Sortable block? =

The Sortable block supports only the Sortable Entry block as inner content. It's not possible to add any other blocks to the main container of the Sortable block.

= What blocks can I use inside a Sortable Entry? =

Sortable Entry blocks support the following blocks: Sortable Date, Heading, Paragraph, Media-Text, Group, and Columns

== Screenshots ==

1. Preview of Sortable block in the block inserter.

2. Preview of Sortable block toolbar, with active "List view" layout.

3. Preview of Sortable block settings, focusing on Order settings.

4. Preview of Sortable block button that adds Sortable Entry into the block.

5. Preview of Sortable Entry block settings, focusing on Date settings.

6. Preview of Sortable Entry block button that adds content into the block.

== Changelog ==

= 1.4.2 - April 10, 2023

* Update: improve UX in Sortable Date block settings;
* Update: allow to access date settings is Sortable Entry block via Sortable Date block;

= 1.4.1 - April 3, 2023
* Fix: cursor icon when interacting with Sortable Date block in editor;
* Fix: provide a temporary solution to layout issue in date picker, caused by WordPress core;

= 1.4.0 - March 27, 2023
* Add: support for variations in Sortable Container block;
* Update: plugin information in Read Me file;

= 1.3.0 - February 23, 2023
* Add: support for reusable blocks (note, it does not for reusable blocks with Sortable block in it);
* Add: support for Border options in Sortable block;
* Update: improve Insert buttons in the editor;

= 1.2.0 - January 06, 2023
* Add: support for colors in Sortable Date block;
* Add: support for padding dimensions in Sortable Date block;

= 1.1.1 - January 02, 2023
* Update: detect time format in Sortable Date block;
* Fix: wrong time output in Sortable Date block when viewed on front-end;
* Fix: wrong time output in Sortable Date block when viewed on back-end;

= 1.1.0 - December 29, 2022
* Add: option to select between decreasing order & increasing order;
* Add: option to choose format in Date block;
* Update: description in blocks;

= 1.0.0 - December 17, 2022
* Initial release;

= 0.0.4 - December 15, 2022
* Update: formatting;
* Update: information about sorting in main container;
* Fix: date issue in editor;

= 0.0.3 - December 15, 2022
* Add: support for alignment and grid layout;
* Update: allow Group block in Sortable Entry;
* Fix: button contrast issue in Sortable Container;

= 0.0.2 - October 1, 2022 =
* Add: Sortable Date block to display a set date from Sortable Entry block.
* Update: information in Read Me file.

= 0.0.1 - September 6, 2022 =
* Start the plugin.