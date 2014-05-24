<?php
/**
 * Custom functions
 */

function remove_more_link_scroll( $link ) {
	$link = preg_replace( '|#more-[0-9]+|', '', $link );
	return $link;
}
add_filter( 'the_content_more_link', 'remove_more_link_scroll' );

function the_title_trim($title) {
	// Might aswell make use of this function to escape attributes
	$title = attribute_escape($title);
	// What to find in the title
	$findthese = array(
		'#Protected:#', // # is just the delimeter
		'#Private:#'
	);
	// What to replace it with
	$replacewith = array(
		'Protected:',
		'##Private:##' // What to replace private with
	);
	// Items replace by array key
	$title = preg_replace($findthese, $replacewith, $title);
	return $title;
}
add_filter('the_title', 'the_title_trim');