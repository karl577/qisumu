<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<?php if ( ! is_single() ) : ?>
		<figure class="thumbnail">
			<?php zm_the_thumbnail(); ?>
			<span class="cat"><?php zm_category(); ?></span>
		</figure>
	<?php endif; ?>
	<header class="entry-header">
		<?php if ( is_single() ) : ?>
			<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
		<?php else : ?>
			<?php the_title( sprintf( '<h2 class="entry-title"><a href="%s" rel="bookmark">', esc_url( get_permalink() ) ), '</a></h2>' ); ?>
		<?php endif; ?>
	</header><!-- .entry-header -->

	<div class="entry-content">
		<?php if ( ! is_single() ) : ?>
			<div class="archive-content">
				<?php if (has_excerpt('')){ echo wp_trim_words( get_the_excerpt(), 90, '...' ); } else { echo wp_trim_words( get_the_content(), 100, '...' ); } ?>
			</div>
			<span class="title-l"></span>
			<?php get_template_part( 'inc/new' ); ?>
			<span class="entry-meta">
				<span class="date"><?php the_time( 'Y年m月d日' ); ?>&nbsp;</span>
				<?php if( function_exists( 'the_views' ) ) { print '<span class="views"> 阅读 '; the_views(); print '&nbsp;</span>';  } ?>
				<?php if ( post_password_required() ) { ?>
					<span class="comment"><a href=""><i class="icon-scroll-c"></i> 密码保护</a></span>
				<?php } else { ?>
					<span class="comment"><?php comments_popup_link( '<i class="fa fa-comment-o"></i> 发表评论', '<i class="fa fa-comment-o"></i> 评论 1 ', '<i class="fa fa-comment-o"></i> 评论 %' ); ?></span>
				<?php } ?>
			</span>
		<?php else : ?>
			<div class="single-content">
				<?php if ( has_excerpt() ) { ?><span class="abstract"><span>摘要</span><?php the_excerpt() ?><div class="clear"></div></span><?php }?>

				<?php get_template_part('ad/ads', 'single'); ?>
				<div class="videos-content">
					<div class="video-img">
						<?php zm_the_thumbnail(); ?>
					</div>

					<div class="video-inf">
						<ul class="category">所属分类：<?php the_category( '&nbsp;&nbsp;' ); ?></ul>
						<ul><?php $file_os = get_post_meta($post->ID, 'file_os', true); ?><?php echo $file_os; ?></ul>
						<ul><?php $file_inf = get_post_meta($post->ID, 'file_inf', true); ?><?php echo $file_inf; ?></ul>
						<ul class="date">最后更新：<?php the_modified_date('Y年m月d日'); ?></ul>
					</div>
					<div class="clear"></div>
				</div>

				<?php the_content(); ?>
			</div>

			<?php get_template_part( 'inc/file' ); ?>

			<?php wp_link_pages(array('before' => '<div class="page-links">', 'after' => '', 'next_or_number' => 'next', 'previouspagelink' => '<span>上一页</span>', 'nextpagelink' => "")); ?>
			<?php wp_link_pages(array('before' => '', 'after' => '', 'next_or_number' => 'number', 'link_before' =>'<span>', 'link_after'=>'</span>')); ?>
			<?php wp_link_pages(array('before' => '', 'after' => '</div>', 'next_or_number' => 'next', 'previouspagelink' => '', 'nextpagelink' => "<span>下一页</span>")); ?>

				<?php get_template_part('ad/ads', 'single-b'); ?>

				<?php if (zm_get_option('zm_like')) { ?>
					<?php get_template_part( 'inc/social' ); ?>
				<?php } else { ?>
					<div id="social"></div>
				<?php } ?>

			<footer class="single-footer">
				<ul class="single-meta">
					<?php edit_post_link('编辑', '<li class="edit-link">', '</li>' ); ?>
					<?php if ( post_password_required() ) { ?>
						<li class="comment"><a href="#comments">密码保护</a></li>
					<?php } else { ?>
						<li class="comment"><?php comments_popup_link( '发表评论', '评论 1 ', '评论 % ' ); ?></li>
					<?php } ?>
					<?php if( function_exists( 'the_views' ) ) { print '<li class="views"> 阅读 '; the_views(); print ' </li>';  } ?>
				</ul>

				<ul id="fontsize">A+</ul>
				<div class="single-cat-tag">
					<div class="single-cat">发布日期：<?php the_time( 'Y年m月d日' ); ?></div>
					<div class="single-tag">标签：<?php the_tags('','',''); ?></div>
				</div>
			</footer><!-- .entry-footer -->

		<?php endif; ?>
		<div class="clear"></div>
	</div><!-- .entry-content -->

	<?php if ( ! is_single() ) : ?>
		<span class="entry-more"><a href="<?php the_permalink(); ?>" rel="bookmark">阅读全文</a></span>
	<?php endif; ?>
</article><!-- #post -->