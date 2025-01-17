<?php
// 公告
add_action( 'init', 'post_type_bulletin' );
function post_type_bulletin() {
	$labels = array(
		'name'               => '公告', 'post type general name', 'your-plugin-textdomain',
		'singular_name'      => '公告', 'post type singular name', 'your-plugin-textdomain',
		'menu_name'          => '公告', 'admin menu', 'your-plugin-textdomain',
		'name_admin_bar'     => '公告', 'add new on admin bar', 'your-plugin-textdomain',
		'add_new'            => '发布公告', 'bulletin', 'your-plugin-textdomain',
		'add_new_item'       => '发布新公告', 'your-plugin-textdomain',
		'new_item'           => '新公告', 'your-plugin-textdomain',
		'edit_item'          => '编辑公告', 'your-plugin-textdomain',
		'view_item'          => '查看公告', 'your-plugin-textdomain',
		'all_items'          => '所有公告', 'your-plugin-textdomain',
		'search_items'       => '搜索公告', 'your-plugin-textdomain',
		'parent_item_colon'  => 'Parent 公告:', 'your-plugin-textdomain',
		'not_found'          => '你还没有发布公告。', 'your-plugin-textdomain',
		'not_found_in_trash' => '回收站中没有公告。', 'your-plugin-textdomain'
	);

	$args = array(
		'labels'             => $labels,
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'rewrite'            => array( 'slug' => 'bulletin' ),
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => 5,
		'supports'           => array( 'title', 'editor', 'author', 'excerpt', 'comments' )
	);

	register_post_type( 'bulletin', $args );
}

// 公告分类
add_action( 'init', 'create_bulletin_taxonomies', 0 );
function create_bulletin_taxonomies() {
	$labels = array(
		'name'              => '公告分类目录', 'taxonomy general name',
		'singular_name'     => '公告分类', 'taxonomy singular name',
		'search_items'      => '搜索公告目录',
		'all_items'         => '所有公告目录',
		'parent_item'       => 'Parent Genre',
		'parent_item_colon' => 'Parent Genre:',
		'edit_item'         => '编辑公告目录',
		'update_item'       => '更新公告目录',
		'add_new_item'      => '添加新公告目录',
		'new_item_name'     => 'New Genre Name',
		'menu_name'         => '公告分类',
	);

	$args = array(
		'hierarchical'      => true,
		'labels'            => $labels,
		'show_ui'           => true,
		'show_admin_column' => true,
		'query_var'         => true,
		'rewrite'           => array( 'slug' => 'notice' ),
	);

	register_taxonomy( 'notice', array( 'bulletin' ), $args );
}

// 图片
add_action( 'init', 'post_type_picture' );
function post_type_picture() {
	$type_url = zm_get_option('img_url');
	$labels = array(
		'name'               => '图片', 'post type general name', 'your-plugin-textdomain',
		'singular_name'      => '图片', 'post type singular name', 'your-plugin-textdomain',
		'menu_name'          => '图片', 'admin menu', 'your-plugin-textdomain',
		'name_admin_bar'     => '图片', 'add new on admin bar', 'your-plugin-textdomain',
		'add_new'            => '发布图片', 'picture', 'your-plugin-textdomain',
		'add_new_item'       => '发布新图片', 'your-plugin-textdomain',
		'new_item'           => '新图片', 'your-plugin-textdomain',
		'edit_item'          => '编辑图片', 'your-plugin-textdomain',
		'view_item'          => '查看图片', 'your-plugin-textdomain',
		'all_items'          => '所有图片', 'your-plugin-textdomain',
		'search_items'       => '搜索图片', 'your-plugin-textdomain',
		'parent_item_colon'  => 'Parent 图片:', 'your-plugin-textdomain',
		'not_found'          => '你还没有发布图片。', 'your-plugin-textdomain',
		'not_found_in_trash' => '回收站中没有图片。', 'your-plugin-textdomain'
	);

	$args = array(
		'labels'             => $labels,
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'rewrite'            => array( 'slug' => $type_url ),
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => 5,
		'supports'           => array( 'title', 'editor', 'author', 'excerpt', 'comments', 'thumbnail', 'revisions', 'custom-fields' )
	);

	register_post_type( 'picture', $args );
}

// 图片分类
add_action( 'init', 'create_picture_taxonomies', 0 );
function create_picture_taxonomies() {
	$type_url = zm_get_option('img_cat_url');
	$labels = array(
		'name'              => '图片分类目录', 'taxonomy general name',
		'singular_name'     => '图片分类', 'taxonomy singular name',
		'search_items'      => '搜索图片目录',
		'all_items'         => '所有图片目录',
		'parent_item'       => 'Parent Genre',
		'parent_item_colon' => 'Parent Genre:',
		'edit_item'         => '编辑图片目录',
		'update_item'       => '更新图片目录',
		'add_new_item'      => '添加新图片目录',
		'new_item_name'     => 'New Genre Name',
		'menu_name'         => '图片分类',
	);

	$args = array(
		'hierarchical'      => true,
		'labels'            => $labels,
		'show_ui'           => true,
		'show_admin_column' => true,
		'query_var'         => true,
		'rewrite'           => array( 'slug' => $type_url ),
	);

	register_taxonomy( 'gallery', array( 'picture' ), $args );
}

// 视频
add_action( 'init', 'post_type_video' );
function post_type_video() {
	$type_url = zm_get_option('video_url');
	$labels = array(
		'name'               => '视频', 'post type general name', 'your-plugin-textdomain',
		'singular_name'      => '视频', 'post type singular name', 'your-plugin-textdomain',
		'menu_name'          => '视频', 'admin menu', 'your-plugin-textdomain',
		'name_admin_bar'     => '视频', 'add new on admin bar', 'your-plugin-textdomain',
		'add_new'            => '发布视频', 'video', 'your-plugin-textdomain',
		'add_new_item'       => '发布新视频', 'your-plugin-textdomain',
		'new_item'           => '新视频', 'your-plugin-textdomain',
		'edit_item'          => '编辑视频', 'your-plugin-textdomain',
		'view_item'          => '查看视频', 'your-plugin-textdomain',
		'all_items'          => '所有视频', 'your-plugin-textdomain',
		'search_items'       => '搜索视频', 'your-plugin-textdomain',
		'parent_item_colon'  => 'Parent 视频:', 'your-plugin-textdomain',
		'not_found'          => '你还没有发布视频。', 'your-plugin-textdomain',
		'not_found_in_trash' => '回收站中没有视频。', 'your-plugin-textdomain'
	);

	$args = array(
		'labels'             => $labels,
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'rewrite'            => array( 'slug' => $type_url ),
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => 5,
		'supports'           => array( 'title', 'editor', 'author', 'excerpt', 'comments', 'thumbnail', 'revisions', 'custom-fields' )
	);

	register_post_type( 'video', $args );
}

// 视频分类
add_action( 'init', 'create_video_taxonomies', 0 );
function create_video_taxonomies() {
	$type_url = zm_get_option('video_cat_url');
	$labels = array(
		'name'              => '视频分类目录', 'taxonomy general name',
		'singular_name'     => '视频分类', 'taxonomy singular name',
		'search_items'      => '搜索视频目录',
		'all_items'         => '所有视频目录',
		'parent_item'       => 'Parent Genre',
		'parent_item_colon' => 'Parent Genre:',
		'edit_item'         => '编辑视频目录',
		'update_item'       => '更新视频目录',
		'add_new_item'      => '添加新视频目录',
		'new_item_name'     => 'New Genre Name',
		'menu_name'         => '视频分类',
	);

	$args = array(
		'hierarchical'      => true,
		'labels'            => $labels,
		'show_ui'           => true,
		'show_admin_column' => true,
		'query_var'         => true,
		'rewrite'           => array( 'slug' => $type_url ),
	);

	register_taxonomy( 'videos', array( 'video' ), $args );
}

// 商品
add_action( 'init', 'post_type_tao' );
function post_type_tao() {
	$type_url = zm_get_option('sp_url');
	$labels = array(
		'name'               => '商品', 'post type general name', 'your-plugin-textdomain',
		'singular_name'      => '商品', 'post type singular name', 'your-plugin-textdomain',
		'menu_name'          => '商品', 'admin menu', 'your-plugin-textdomain',
		'name_admin_bar'     => '商品', 'add new on admin bar', 'your-plugin-textdomain',
		'add_new'            => '发布商品', 'tao', 'your-plugin-textdomain',
		'add_new_item'       => '发布新商品', 'your-plugin-textdomain',
		'new_item'           => '新商品', 'your-plugin-textdomain',
		'edit_item'          => '编辑商品', 'your-plugin-textdomain',
		'view_item'          => '查看商品', 'your-plugin-textdomain',
		'all_items'          => '所有商品', 'your-plugin-textdomain',
		'search_items'       => '搜索商品', 'your-plugin-textdomain',
		'parent_item_colon'  => 'Parent 商品:', 'your-plugin-textdomain',
		'not_found'          => '你还没有发布商品。', 'your-plugin-textdomain',
		'not_found_in_trash' => '回收站中没有商品。', 'your-plugin-textdomain'
	);

	$args = array(
		'labels'             => $labels,
		'public'             => true,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'rewrite'            => array( 'slug' => $type_url ),
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'menu_position'      => 5,
		'supports'           => array( 'title', 'editor', 'author', 'excerpt', 'comments', 'thumbnail', 'revisions', 'custom-fields' )
	);

	register_post_type( 'tao', $args );
}

// 商品分类
add_action( 'init', 'create_tao_taxonomies', 0 );
function create_tao_taxonomies() {
	$type_url = zm_get_option('sp_cat_url');
	$labels = array(
		'name'              => '商品分类目录', 'taxonomy general name',
		'singular_name'     => '商品分类', 'taxonomy singular name',
		'search_items'      => '搜索商品目录',
		'all_items'         => '所有商品目录',
		'parent_item'       => 'Parent Genre',
		'parent_item_colon' => 'Parent Genre:',
		'edit_item'         => '编辑商品目录',
		'update_item'       => '更新商品目录',
		'add_new_item'      => '添加新商品目录',
		'new_item_name'     => 'New Genre Name',
		'menu_name'         => '商品分类',
	);

	$args = array(
		'hierarchical'      => true,
		'labels'            => $labels,
		'show_ui'           => true,
		'show_admin_column' => true,
		'query_var'         => true,
		'rewrite'           => array( 'slug' => $type_url ),
	);

	register_taxonomy( 'taobao', array( 'tao' ), $args );
}
?>