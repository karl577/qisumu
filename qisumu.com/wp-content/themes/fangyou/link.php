<?php
/*
Template Name:友情链接
*/
?>
<?php get_header(); ?>
<div class="position">
    <div class="common">
       <div class="weibo">
  <a href="<?php echo get_option('blog_tencentweibo'); ?>" title="腾讯微博" rel="external nofollow" target="_blank">腾讯微博</a>
       </div>
    <div class="qun">
  <a href="<?php echo get_option('blog_sinaweibo'); ?>" title="新浪微博" rel="external nofollow" target="_blank">新浪微博</a>
       </div>
    <div class="contact">
  <a href="http://wpa.qq.com/msgrd?v=3&uin=<?php echo get_option('blog_qq'); ?>&site=qq&menu=yes" title="联系站长" rel="external nofollow" target="_blank">联系站长</a>
       </div>
    <div class="feed">
  <a href="<?php echo get_option('blog_rss'); ?>" title="订阅本站" rel="external nofollow" target="_blank">订阅本站</a>
       </div>
    <div class="counts">
	当前位置：<?php if(function_exists('wp_breadcrumbs')){wp_breadcrumbs();} ?>
	
	</div>
    <div class="search">
  <form method="get" action="<?php echo esc_url(home_url('/')); ?>">
            <input class="searchtxt" name="s" id="s" type="text" value="请输入搜索关键词..." onfocus="if(this.value==this.defaultValue)this.value='';" onblur="if(this.value=='')this.value=this.defaultValue;" />
            <button class="searchbtn" id="searchsubmit" title="站内搜索">搜索</button>
          </form>
    </div>
</div>
<div class="clear"></div>
<?php setPostViews(get_the_ID()); ?>
<div class="bodybox">
  <div class="main">
    <div class="common">
      <?php if(have_posts()):while(have_posts()):the_post(); ?>
	  <div class="list">
        
		<div class="contentbox">
          <div class="contenttitle">
            <h1><?php the_title(); ?></h1>
		  </div>
          <div class="contentview">浏览次数<span><?php echo getPostViews(get_the_ID()); ?></span></div>
		  <div class="clear"></div>
          <div class="contenttxt">
            <?php the_content(); ?>
		    <div class="linkpage">
              <ul>
                <?php $default_ico=get_template_directory_uri().'/images/link.ico';$bookmarks=get_bookmarks('title_li=&orderby=id');if(!empty($bookmarks)){foreach($bookmarks as $bookmark){echo'<li><img src="',$bookmark->link_url,'/favicon.ico" onerror="javascript:this.src=\'',$default_ico,'\'" width="16" height="16" /><a href="',$bookmark->link_url,'" title="',$bookmark->link_description,'" target="_blank">',$bookmark->link_name,'</a></li>';}}?>
			  </ul>
			</div>
          </div>
        </div>
        <div class="commentsbox">
	      <div class="commentsnum">全部评论：<?php comments_number('<span>0</span>条','<span>1</span>条','<span>%</span>条','','评论已关闭'); ?></div>
	      <?php comments_template('',true); ?>
        </div>
      </div>
	  <?php endwhile; endif;?>
      <div class="sidebar">
		<?php if(is_dynamic_sidebar())dynamic_sidebar('right_sidebar'); ?>
      </div>
    </div>
  </div>
  <div class="clear"></div>
<?php get_footer(); ?>