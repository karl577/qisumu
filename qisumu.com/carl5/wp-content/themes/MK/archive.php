<?php get_header(); ?>
<div class="main">
	<?php if (have_posts()) : ?>

		<?php $post = $posts[0]; // Hack. Set $post so that the_date() works. ?>
		<?php /* If this is a category archive */ if (is_category()) { ?>
		  <h1><?php single_cat_title(); ?></h1>
		<?php /* If this is a tag archive */ } elseif( is_tag() ) { ?>
		  <h1><?php single_tag_title(); ?></h1>
		<?php /* If this is a daily archive */ } elseif (is_day()) { ?>
		  <h1><?php echo get_the_time('F jS, Y'); ?></h1>
		<?php /* If this is a monthly archive */ } elseif (is_month()) { ?>
		  <h1><?php echo get_the_time('F, Y'); ?></h1>
		<?php /* If this is a yearly archive */ } elseif (is_year()) { ?>
		  <h1><?php echo get_the_time('Y'); ?></h1>
		<?php /* If this is an author archive */ } elseif (is_author()) { ?>
		  <h1><?php _e( 'Author Archive', 'black_with_orange' ); ?></h1>
		<?php /* If this is a paged archive */ } elseif (isset($_GET['paged']) && !empty($_GET['paged'])) { ?>
		  <h1><?php _e( 'Blog Archives', 'black_with_orange' ); ?></h1>
		<?php } ?>

		<?php while (have_posts()) : the_post(); ?>
			<!-- Start: Post -->
			<div <?php post_class(); ?>>
				<h2><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title_attribute(); ?>"><?php the_title(); ?></a> <?php edit_post_link(__('Edit', 'black_with_orange'), '', ''); ?></h2>
				<p class="post-meta"><span class="date"><?php the_time( get_option( 'date_format' ) ) ?></span> <span class="author"><?php the_author() ?></span> <span class="cats"><?php the_category(", "); ?></span><?php if ( comments_open() ) : ?> <span class="comments"><?php comments_popup_link('0', '1', '%'); ?>  阅读 <?php echo getPostViews(get_the_ID()); ?>次</span> <?php endif; ?></p>
				<a href="<?php the_permalink() ?>" title="<?php the_title_attribute(); ?>" class="thumbnail">
				<?php if ( has_post_thumbnail() ) { ?>
				<?php the_post_thumbnail(); ?>
				<?php } else { ?>
				<img width="150" height="150" src="<?php echo get_template_directory_uri();  ?>/images/thumbnail/<?php echo rand(1,20)?>.jpg" class="attachment-post-thumbnail wp-post-image"/>
				<?php } ?>
				</a>
				<?php the_excerpt(); ?>
				<p class="more"><a href="<?php the_permalink() ?>"><?php _e( ' ', 'black_with_orange' );?></a></p>
				<?php if(has_tag()): ?><p class="tags"><span><?php the_tags(""); ?></span></p><?php endif; ?>
			</div>
			<!-- End: Post -->
		<?php endwhile; ?>

		<p class="pagination">
			<span class="prev"><?php previous_posts_link(__('上一页', 'black_with_orange')) ?></span>
			<span class="next"><?php next_posts_link(__('下一页', 'black_with_orange')) ?></span>
		</p>

	<?php else : ?>
		<h2><?php _e( 'Not found', 'black_with_orange' ); ?></h2>
		<p><?php _e( 'Sorry, but you are looking for something that isn\'t here.', 'black_with_orange' ); ?></p>
		<?php get_search_form(); ?>
	<?php endif; ?>
</div>
<?php get_sidebar(); ?>

<?php get_footer(); ?>