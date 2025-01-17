<?php
/*
Template Name: 热门标签
*/
?>

<?php get_header(); ?>
<style type="text/css">
#primary {
	width: 100%;
}
#tag_letter {
	margin-left: 13px;
}
#tag_letter li {
	float: left;
	background: #0088cc;
	width: 31px;
	height: 31px;
	line-height: 31px; 
	color: #a5a5a5;
	text-align: center;
	margin: 4px;
    border-radius: 2px;
}
#tag_letter li:hover {
	background: #c40000;
}
#tag_letter li a {
	color: #fff;
	display: block;
}
#all_tags {
	margin: 30px 6px;
	clear: both;
}
#all_tags h4 {
	margin: -70px 0 0 5px;
    padding: 70px 0 30px 0;
	height: 40px;
	border-bottom: 1px dashed #dadada;
}
#all_tags li a {
	margin: 5px;
}
</style>
	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
			<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
				<?php specs_show_tags(); ?>
			</article><!-- #page -->
		</main><!-- .site-main -->
	</div><!-- .content-area -->

<?php get_footer(); ?>