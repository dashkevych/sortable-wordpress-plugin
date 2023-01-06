=== Sortable Block ===
Contributors:      taskotr
Author URI:        https://themesharbor.com/
Tags:              block, sorting, sort, blocks, filter, block sort, blocks sorting, filter content, simple events calendar, product changelog
Tested up to:      6.1
Requires at Least: 6.1
Requires PHP:      7.4
Stable tag:        1.1.1
Text Domain:       sortable
License:           GPLv2 or later
License URI:       http://www.gnu.org/licenses/gpl-2.0.html

A simple block that allows to sort its content based on selected date.

== Description ==

The purpose of the Sortable Block plugin is to sort sections on the page based on set dates.

The plugin allows to organize block-based content either from newest to oldest, or from oldest to newest.

There are several possible cases when to use the plugin. For instance, to create a simple events calendar, a product changelog, media mentions, etc.

Sortable Block also comes with two layout options: list and grid.

=== Stay Connected ===

* [Follow on Twitter](https://twitter.com/themesharbor/)
* [Follow on Instagram](https://www.instagram.com/themesharbor/)

== Installation ==

1. You have a couple options:
	* Go to Plugins &rarr; Add New and search for "Sortable Block". Once found, click "Install".
	* Download the Sortable Block plugin from WordPress.org and make sure the folder is zipped. Then upload it via Plugins &rarr; Add New &rarr; Upload.
    * Open the block inserter within the Block Editor and search for "icon". The plugin should appear and allow you to install it directly. Skip steps 2 and 3.
2. Activate the plugin through the 'Plugins' screen in WordPress.
3. Search for the block within the Block Editor and begin using.

== Frequently Asked Questions ==

= How to sort blocks? =

1. Add Sortable block to content area in Block editor. This is the main container for entries that need to be sorted.
2. Inside Sortable block, add Sortable Entry. This is a container for your content. Note, you can have multiple entries inside the Sortable block.
3. Each Sortable Entry comes with date option. To change date option, select Sortable Entry within List View, and make changes in Date Settings in Block sidebar.

= How to change layout? =

1. In Block editor, select Sortable within List View.
2. Within block toolbar, click on eather List view or Grid view icon.

= How to change order? =

1. In Block editor, select Sortable within List View.
2. In Block sidebar, select either the "Newest to Oldest" or "Oldest to Newest" option from the dropdown menu within the Order settings section.

= What blocks to use inside Sortable? =

Sortable block supports only Sortable Entry block as inner content. It's not possible to add any other blocks to the main container of Sortable block.

= What blocks to use inside Sortable Entry? =

Sortable Entry block supports the following blocks: Sortable Date, Heading, Paragraph, Media-Text, Group, Columns.

== Screenshots ==

1. Preview of Sortable Entry inside Sortable, shown in List View.

2. Preview of Block sidebar with active Date Settings for Sortable Entry.

3. Preview of Sortable Entry inside Sortable with grid layout.

4. Preview of Sortable Entry inside Sortable with list layout.

== Changelog ==

= 1.2.0 - (January 02, 2023)
* Add: support for colors in Sortable Date block;

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