<?php
/**
 * The template for displaying search forms in tdpersona
 *
 * @package tdpersona
 * @since tdpersona 1.0
 */
?>
	<form method="get" id="searchform" action="<?php echo esc_url( home_url( '/' ) ); ?>" role="search">
		<label for="s" class="assistive-text"><?php _e( '搜索', 'tdpersona' ); ?></label>
		<input type="text" class="field" name="s" value="<?php echo esc_attr( get_search_query() ); ?>" id="s" placeholder="<?php esc_attr_e( '搜索 &hellip;', 'tdpersona' ); ?>" />
		<input type="submit" class="submit" name="submit" id="searchsubmit" value="<?php esc_attr_e( '搜索', 'tdpersona' ); ?>" />
	</form>
