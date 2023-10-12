=== Sortable - Simple Events by Date Manager Block ===
Contributors:      taskotr
Author URI:        https://tarascodes.com/
Tags:              event, events, sort, filter, manager, blocks sorting, sort by date, filter content, simple events calendar, product changelog, timeline
Tested up to:      6.3
Requires at Least: 6.1
Requires PHP:      7.4
Stable tag:        1.7.0
Text Domain:       sortable
License:           GPLv2 or later
License URI:       http://www.gnu.org/licenses/gpl-2.0.html

Easily create customizable, sortable sections on your website using WordPress blocks with the Sortable Block plugin.

== Description ==

Easily create and manage events on your WordPress site with Sortable Block free plugin. This WordPress events plugin allows to organize and present both virtual and physical events with elegance and efficiency.

Loaded with core features, the Sortable Block event manager is ready to use on any page, making it a perfect choice for small businesses, musicians, photographers, venues, restaurants, and non-profits.

**🌟 FEATURES**

The Sortable Block plugin provides functionality to create and manage your events.

- Full support for Block editor
- Event (Sortable Entry) creation and management
- Dual layout options: List and Grid
- Customizable date formats with Sortable Date
- Seamless switching between layout styles
- Ideal for event calendars, changelogs, media mentions, course schedules, conference agendas, project timelines, booking systems, and publication archives
- Support for various content types within Sortable Entry
- User-friendly, enhancing website navigation and organization
- Responsive design ensuring optimal viewing on all devices

**🔧 EASE OF INSTALLATION AND PERSONALIZATION**

Begin by installing the plugin from the WordPress repository, following the standard plugin installation process. Once activated, the plugin readily integrates with the WordPress block editor, making it easy to start creating and managing your events.

Personalization is at the core of Sortable Block. It supports customization options accessible directly from the block editor. This means you can tailor the events layout to your liking. For instance, you might want to change the background color to align with your brand's theme.

This level of ease in installation and personalization ensures not just a user-friendly experience but also a quick setup, letting you focus more on creating engaging events and less on overcoming technical hurdles.

[📒 READ FULL DOCUMENTATION](https://sortable.themesharbor.com/)

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

1. This image displays the search results in the Block Inserter when the keyword “Sortable” is entered. It also shows pre-made block patterns associated with the keyword below the search.

2. This image demonstrates the Sortable block being added to the content area after selecting it from the Block Inserter. Note, the Block Inserter can also be closed using the top bar.

3. This image displays a placeholder screen for the Sortable block, allowing to either select a pre-designed pattern based on Sortable or start blank.

4. This image displays three variations to start blank: Empty, Grid View, List View. Each option offers a starting layout, including a pre-made content.

5. This image showcases the Sortable block with pre-made content arranged in a list layout, with active List View layout.

6. This image showcases the Sortable block with pre-made content arranged in a grid layout, with active Grid View layout. Note, this layout also offers Layout settings that allow configuring the number of columns.

7. This image showcases the Sortable block with no content, displaying only the ‘Add Sortable Entry‘ button for adding events to manage. Note, by default, the Sortable block adopts the List View layout.

8. This image displays a Sortable Entry block (as a child) with empty content within the Sortable block (as a parent). A Sortable Entry is an event that can be sorted by date within the Sortable block, serving as a container for an event layout that can be built with WordPress blocks.

9. This image displays a Sortable Entry block with the ‘Add Block‘ button clicked, revealing a modal showcasing common blocks with an option to view more available blocks for creating an event layout.

10. This image displays a Sortable Entry block with the active Block settings sidebar. In the sidebar, the Date settings section is shown for configuring the time and date of the event.

== Changelog ==

= 1.7.0 - October 11, 2023 =

* Add: support for older Sortable block versions;
* Add: introduce date-related warnings in Sortable Entry blocks;
* Add: support for filter date in Sortable block;
* Add: warning modal for Sortable Entry blocks with old date in editor;
* Add: server-side rendering support for Sortable Entry block;
* Add: visibility settings in Sortable block;
* Add: allow to filter Sortable Entry blocks by specific date;
* Add: allow to hide outdated Sortable Entry blocks;
* Add: support for old versions of Sortable Entry;
* Add: allow to use Cover block within Sortable Entry block;
* Add: allow to use Buttons block within Sortable Entry block;
* Add: pre-made pattern to create Media Mentions section;
* Update: pattern choose modal layout in Sortable block;
* Update: file formatting;
* Update: refactor render for block specific patterns;
* Update: showcase information and main block focus in readme;
* Update: settings labels in Sortable block;
* Fix: wrong inner blocks orientation icons in Sortable Entry block;

= 1.6.0 - September 14, 2023 =

* Add: support for Separator in Sortable block;
* Add: support for styles in Separator;
* Add: support for colors in Separator;
* Add: support for custom spacing between Sortable Entry blocks inside Sortable block;
* Update: function naming for sortable date render;
* Update: introduce fallback for outdated sortable blocks;
* Fix: style inconsistency in editor;

= 1.5.0 - August 25, 2023 =

* Add: pre-made layout in Patterns to create Changelog List;
* Add: allow to select pre-defined pattern when block first added to content area;
* Update: refactor welcome screen when block first added to content area;
* Update: formatting in files;
* Update: simplify labels for Variations screen;

= 1.4.3 - April 18, 2023 =

* Update: formatting in blocks;
* Update: improve user experience for toolbar in Sortable Entry blocks;
* Update: plugin information;
* Fix: incorrect Move icons in Sortable Entry toolbar;

= 1.4.2 - April 10, 2023 =

* Update: improve UX in Sortable Date block settings;
* Update: allow to access date settings is Sortable Entry block via Sortable Date block;

= 1.4.1 - April 3, 2023 =

* Fix: cursor icon when interacting with Sortable Date block in editor;
* Fix: provide a temporary solution to layout issue in date picker, caused by WordPress core;

= 1.4.0 - March 27, 2023 =

* Add: support for variations in Sortable Container block;
* Update: plugin information in Read Me file;

= 1.3.0 - February 23, 2023 =

* Add: support for reusable blocks (note, it does not for reusable blocks with Sortable block in it);
* Add: support for Border options in Sortable block;
* Update: improve Insert buttons in the editor;

= 1.2.0 - January 06, 2023 =

* Add: support for colors in Sortable Date block;
* Add: support for padding dimensions in Sortable Date block;

= 1.1.1 - January 02, 2023 =

* Update: detect time format in Sortable Date block;
* Fix: wrong time output in Sortable Date block when viewed on front-end;
* Fix: wrong time output in Sortable Date block when viewed on back-end;

= 1.1.0 - December 29, 2022 =

* Add: option to select between decreasing order & increasing order;
* Add: option to choose format in Date block;
* Update: description in blocks;

= 1.0.0 - December 17, 2022 =

* Initial release;

= 0.0.4 - December 15, 2022 =

* Update: formatting;
* Update: information about sorting in main container;
* Fix: date issue in editor;

= 0.0.3 - December 15, 2022 =

* Add: support for alignment and grid layout;
* Update: allow Group block in Sortable Entry;
* Fix: button contrast issue in Sortable Container;

= 0.0.2 - October 1, 2022 =

* Add: Sortable Date block to display a set date from Sortable Entry block;
* Update: information in Read Me file;

= 0.0.1 - September 6, 2022 =

* Start the plugin;