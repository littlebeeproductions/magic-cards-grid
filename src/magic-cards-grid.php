<?php
/*
Plugin Name: Magic Cards Grid
Version: 1.0
Plugin URI:
Description: Plugin that displays a grid of Magic the Gathering cards on a page
Author: Alyssa Harding
Author URI: http://www.littlebeeproductions.com
Text Domain: magic-cards-grid
*/

defined( 'ABSPATH' ) or die( 'No direct access allowed' );

/*
 * basic setup function for the plugin
 *
 */
function my_magic_cards_grid_setup() {


}

register_activation_hook( __FILE__, 'my_magic_cards_grid_setup' );


/*
 * load required scripts and styles
 * TODO: it's performance intensive to just blindly load more javascript on every page.
 * TODO: Ideally we'd check to see if the shortcode is on the page before loading the javascript and styles
 */
function mmc_load_bootstrap() {
	// make sure we've got bootstrap stuff

	// bootstrap js - jquery is enqueued by WordPress by default
	wp_register_script('mmc_bootstrap', plugins_url( '/vendor/bootstrap-4.1.3-dist/js/bootstrap.bundle.min.js', __FILE__), array( 'jquery') );
	wp_enqueue_script('mmc_bootstrap');


	// our own js file which loads the lazy loading
	wp_register_script('mmc_magic_cards', plugins_url( '/js/magic-cards-grid.js', __FILE__), array( 'jquery' ) );
	wp_enqueue_script('mmc_magic_cards');

	// bootstrap CSS
	wp_register_style('mmc_bootstrap', plugins_url( '/vendor/bootstrap-4.1.3-dist/css/bootstrap.min.css', __FILE__) );
	wp_enqueue_style('mmc_bootstrap');

	// our own styles
	wp_register_style('mmc_style', plugins_url( '/css/magic-cards-grid.css', __FILE__) );
	wp_enqueue_style('mmc_style');

}
add_action('template_redirect', 'mmc_load_bootstrap');

/*
 *  Add a shortcode. This allows a user to display the information on a page
 *  shortcode defined here is [magic_cards_grid]
 *  TODO: Could add the ability to display differently using shortcode attributes
*/

function mmc_shortcode() {
	//$cards = mmc_fetch_my_card_info();

	//$cards_content = mmc_display_card_info( $cards ); // do some formatting here

	//return $cards_content;
	include('cards_index.php');
}

add_shortcode( 'magic_cards_grid', 'mmc_shortcode');

