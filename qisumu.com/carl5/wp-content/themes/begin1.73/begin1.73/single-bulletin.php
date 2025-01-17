<?php get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<?php while ( have_posts() ) : the_post(); ?>

				<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

					<header class="entry-header">
						<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
					</header><!-- .entry-header -->

					<div class="entry-content">
							<div class="single-content">
								<?php get_template_part('ad/ads', 'single'); ?>
								<?php the_content(); ?>
								<?php get_template_part( 'inc/file' ); ?>
								<?php if ( get_post_meta($post->ID, 'no_sidebar', true) ) : ?><style>	#primary {width: 100%;}#sidebar,.r-hide {display: none;}</style><?php endif; ?>
							</div>

							<?php wp_link_pages(array('before' => '<div class="page-links">', 'after' => '', 'next_or_number' => 'next', 'previouspagelink' => '<span>上一页</span>', 'nextpagelink' => "")); ?>
							<?php wp_link_pages(array('before' => '', 'after' => '', 'next_or_number' => 'number', 'link_before' =>'<span>', 'link_after'=>'</span>')); ?>
							<?php wp_link_pages(array('before' => '', 'after' => '</div>', 'next_or_number' => 'next', 'previouspagelink' => '', 'nextpagelink' => "<span>下一页</span>")); ?>

								<?php get_template_part( 'inc/social' ); ?>

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
									<div class="single-cat">日期：<?php the_time( 'Y年m月d日' ) ?> 分类：<?php echo get_the_term_list( $post->ID,  'notice', '' ); ?></div>
								</div>
							</footer><!-- .entry-footer -->

						<div class="clear"></div>
					</div><!-- .entry-content -->


				</article><!-- #post -->

				<?php if (zm_get_option('copyright')) { ?>
					<?php get_template_part( 'inc/copyright' ); ?>
				<?php } ?>

				<div id="single-widget">
					<?php dynamic_sidebar( 'sidebar-4' ); ?>
					<div class="clear"></div>
				</div>

				<nav class="nav-single">
					<?php
						if (get_previous_post()) { previous_post_link( '%link','<span class="meta-nav"><span class="post-nav"><i class="fa fa-angle-left"></i> 上一篇</span><br/>%title</span>' ); } else { echo "<span class='meta-nav'><span class='post-nav'>没有了<br/></span>已是最后文章</span>"; }
						if (get_next_post()) { next_post_link( '%link', '<span class="meta-nav"><span class="post-nav">下一篇 <i class="fa fa-angle-right"></i></span><br/>%title</span>' ); } else { echo "<span class='meta-nav'><span class='post-nav'>没有了<br/></span>已是最新文章</span>"; }
					?>
					<div class="clear"></div>
				</nav>
				<nav class="nav-single-c">
					<?php
						the_post_navigation( array(
							'next_text' => '<span class="meta-nav-l" aria-hidden="true"><i class="fa fa-angle-right"></i></span> ',
							'prev_text' => '<span class="meta-nav-r" aria-hidden="true"><i class="fa fa-angle-left"></i></span> ',
						) );
					?>
				</nav>

				<?php if ( comments_open() || get_comments_number() ) : ?>
					<?php comments_template( '', true ); ?>
				<?php endif; ?>

			<?php endwhile; ?>

		</main><!-- .site-main -->
	</div><!-- .content-area -->

<?php get_sidebar(); ?>
<?php get_footer(); ?>