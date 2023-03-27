/**
 * WordPress dependencies
 */
import { Path, SVG } from '@wordpress/components';

export const emptyView = (
	<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <Path d="M24 9h-2v-5h-7v-2h9v7zm-9 13v-2h7v-5h2v7h-9zm-15-7h2v5h7v2h-9v-7zm9-13v2h-7v5h-2v-7h9z"/>
    </SVG>
);

export const gridView = (
	<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <Path d="M6 6h-6v-6h6v6zm9-6h-6v6h6v-6zm9 0h-6v6h6v-6zm-18 9h-6v6h6v-6zm9 0h-6v6h6v-6zm9 0h-6v6h6v-6zm-18 9h-6v6h6v-6zm9 0h-6v6h6v-6zm9 0h-6v6h6v-6z"/>
    </SVG>
);

export const listView = (
	<SVG xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <Path d="M24 3h-24v-2h24v2zm0 3h-24v2h24v-2zm0 5h-24v2h24v-2zm0 5h-24v2h24v-2zm0 5h-24v2h24v-2z"/>
    </SVG>
);
