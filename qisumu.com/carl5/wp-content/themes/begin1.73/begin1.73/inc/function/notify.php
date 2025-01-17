<?php 
function comment_mail_notify($comment_id) {
	$admin_notify = '1'; // admin 要不要收回复通知 ( '1'=要 ; '0'=不要 )
	$admin_email = get_bloginfo ('admin_email'); // $admin_email 可改为你指定的 e-mail.
	$comment = get_comment($comment_id);
	$comment_author_email = trim($comment->comment_author_email);
	$parent_id = $comment->comment_parent ? $comment->comment_parent : '';
	global $wpdb;
	if ($wpdb->query("Describe {$wpdb->comments} comment_mail_notify") == '')
	$wpdb->query("ALTER TABLE {$wpdb->comments} ADD COLUMN comment_mail_notify TINYINT NOT NULL DEFAULT 0;");
	if (($comment_author_email != $admin_email && isset($_POST['comment_mail_notify'])) || ($comment_author_email == $admin_email && $admin_notify == '1'))
	$wpdb->query("UPDATE {$wpdb->comments} SET comment_mail_notify='1' WHERE comment_ID='$comment_id'");
	$notify = $parent_id ? get_comment($parent_id)->comment_mail_notify : '0';
	$spam_confirmed = $comment->comment_approved;
	if ($parent_id != '' && $spam_confirmed != 'spam' && $notify == '1') {
		$wp_email = 'no-reply@' . preg_replace('#^www\.#', '', strtolower($_SERVER['SERVER_NAME'])); // e-mail 发出点, no-reply 可改为可用的 e-mail.
	    $to = trim(get_comment($parent_id)->comment_author_email);
	    $subject = '您在 [ ' . get_option("blogname") . ' ] 上的留言有了回复';
	    $message = '
		<div style="padding: 15px;font-family: Microsoft YaHei, arial, sans-serif; color: #000;">
			<div style="border: 1px solid #e0e0e0; margin: 0 0 10px 0;">
				<p style="font-weight: bold; padding: 5px 10px;">' . trim(get_comment($parent_id)->comment_author) . ',
				您曾在《' . get_the_title($comment->comment_post_ID) . '》上的留言：<br /></p>
				<p style="padding: 5px 10px;">' . trim(get_comment($parent_id)->comment_content) . '</p>
			</div>
			<div style="border: 1px solid #e0e0e0;">
				<p style="font-weight: bold; padding: 5px 10px;">' . trim($comment->comment_author) . '，给您的回复：<br /></p>
				<p style="padding: 5px 10px;">' . trim($comment->comment_content) . '<br /></p>
			</div>
			<p style="padding: 5px;">可以点此 <a href="' . htmlspecialchars(get_comment_link($parent_id)) . '">查看完整回复內容</a></p>
			<p style="padding: 5px;">欢迎您再度光临 <a href="' . home_url() . '">' . get_option('blogname') . '</a></p>
			<p style="text-align: center;">此邮件由系统自动发出，请勿回复.</p>
	    </div>';
	    $from = "From: \"" . get_option('blogname') . "\" <$wp_email>";
	    $headers = "$from\nContent-Type: text/html; charset=" . get_option('blog_charset') . "\n";
	    wp_mail( $to, $subject, $message, $headers );
	    //echo 'mail to ', $to, '<br/> ' , $subject, $message; // for testing
  }
}
add_action('comment_post', 'comment_mail_notify');
 ?>