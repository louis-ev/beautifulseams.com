<?php
/**
 * Custom functions
 */

function remove_more_link_scroll( $link ) {
	$link = preg_replace( '|#more-[0-9]+|', '', $link );
	return $link;
}
add_filter( 'the_content_more_link', 'remove_more_link_scroll' );

function add_more_span_class( $content ) {
    $content = preg_replace('/(more-[0-9]+)/', '$1" class="more-span', $content);
    return $content;
}
add_filter( 'the_content', 'add_more_span_class');

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

// tags autorisés pour l'accueil
function custom_excerpt_allowed_tags() {
    // Add custom tags to this string
    return '<script>,<style>,<br>,<em>,<i>,<ul>,<ol>,<li>,<p>,<img>';
}
