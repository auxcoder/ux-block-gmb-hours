<?php
/**
 * Plugin Name: Ux Google My Business Hours
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Author: auxcoder
 * Author URI: https://auxcoder.com/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package UXB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
