<?php
// This is a demo script that takes a single 'id' query param argument and
// returns its associated data as HTML, or, if called via XmlHttpRequest,
// returns its data as JSON.

// In the real-world, this category data would be looked
// up on the fly from some database. For this sample, we
// are just using some static in-memory data.

$category_data = array(
	"animals" => array(
		"name" => "Animals",
		"description" => "All your favorites from aardvarks to zebras.",
		"items" => array(
			array(
				"name" => "Pets",
			),
			array(
				"name" => "Farm Animals",
			),
			array(
				"name" => "Wild Animals",
			)
		)
	),
	"colors" => array(
		"name" => "Colors",
		"description" => "Fresh colors from the magic rainbow.",
		"items" => array(
			array(
				"name" => "Blue",
			),
			array(
				"name" => "Green",
			),
			array(
				"name" => "Orange",
			),
			array(
				"name" => "Purple",
			),
			array(
				"name" => "Red",
			),
			array(
				"name" => "Yellow",
			),
			array(
				"name" => "Violet",
			)
		)
	),
	"vehicles" => array(
		"name" => "Vehicles",
		"description" => "Everything from cars to planes.",
		"items" => array(
			array(
				"name" => "Cars",
			),
			array(
				"name" => "Planes",
			),
			array(
				"name" => "Construction",
			)
		)
	)
);

// Get the name of the category to display from
// the query params for the script.

if ( isset( $_GET[ 'id' ] ) ) {
	$category_name = $_GET[ 'id' ];
} else {
	$category_name = false;
}

// Now get the category data, by name, from our in-memory
// dictionary. This is the part where a script normally fetches
// the data from a database.

if ( $category_name && isset( $category_data[ $category_name ] ) ) {
	$category_obj = $category_data[ $category_name ];
} else {
	$category_obj = null;
}

// Now figure out how the script is being called. If it's being
// called via XmlHttpRequest, then send the data back as JSON.
// If not, then send it back as a list in an HTML document.

if ( isset( $_SERVER[ 'HTTP_X_REQUESTED_WITH' ] ) && $_SERVER[ 'HTTP_X_REQUESTED_WITH' ] === 'XMLHttpRequest' ) {
	// Data should be written out as JSON.
	header('Content-type: application/json; charset=UTF-8');
	echo json_encode( $category_obj );
	exit;
}

// Data should be written out as HTML.
header('Content-type: text/html; charset=UTF-8');
?>
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Vehicles</title>
<link rel="stylesheet"  href="../../../css/themes/default/">
<script src="../../../js/jquery.js"></script>
<script src="../../../js/jquery.mobile-1.3.0-beta.1.js"></script>
<!-- qisumu.com Baidu tongji analytics -->
<script>
var _hmt = _hmt || [];
(function() {
var hm = document.createElement("script");
hm.src = "https://hm.baidu.com/hm.js?cd8191d648355b940efdb3f1ba7fb3a0";
var s = document.getElementsByTagName("script")[0];
s.parentNode.insertBefore(hm, s);
})();
</script>
</head>
<body>
<div data-role="page" data-add-back-btn="true">
	<div data-role="header"><h1><?php
	if ( $category_obj ) {
		echo htmlspecialchars( $category_obj[ 'name' ] );
	} else {
		echo 'No Match';
	}
?></h1></div>
	<div data-role="content">
<?php
	if ( !$category_obj ) {
?>
		<p>No matches found.</p>
<?php
	} else {
?>
		<p><?php echo htmlspecialchars( $category_obj['description'] ); ?></p>
		<ul data-role="listview" data-inset="true">
<?php
		$arr = $category_obj[ 'items' ];
		$count = count($arr);
		for ( $i = 0; $i < $count; $i++ ) {
			echo "\t\t\t<li>" . htmlspecialchars( $arr[ $i ][ 'name' ] ) . "</li>\n";
		}
?>
		</ul>
<?php
	}
?>
	</div>
</div>
</body>
</html>
