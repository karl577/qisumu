<?php get_header(); ?>

	<section id="picture" class="content-area">
		<main id="main" class="site-main" role="main">
			<?php $posts = query_posts($query_string . '&orderby=date&showposts='.zm_get_option('taxonomy_cat_n'));?>
			<?php while ( have_posts() ) : the_post(); ?>
			<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
				<div class="picture-box wow fadeInUp" data-wow-delay="0.3s">
					<figure class="picture-img">
						<?php if (zm_get_option('lazy_s')) { img_thumbnail_h(); } else { img_thumbnail(); } ?>
						<?php if (function_exists('zm_link')) { zm_link(); } ?><span class="grid"><span class="fa fa-thumbs-o-up">&nbsp;<?php zm_get_current_count(); ?></span></span>
					</figure>
					<?php the_title( sprintf( '<h3 class="picture-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h3>' ); ?>
				</div>
			</article><!-- #post -->
			<?php endwhile; ?>
		</main><!-- .site-main -->
		<?php begin_pagenav(); ?>
	</section><!-- .content-area -->

<?php get_footer(); ?>