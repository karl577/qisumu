jQuery(document).ready(function(){jQuery("#searchicon").click(function(){jQuery("#jumbosearch").fadeIn(),jQuery("#jumbosearch input").focus()}),jQuery("#jumbosearch .closeicon").click(function(){jQuery("#jumbosearch").fadeOut()}),jQuery("body").keydown(function(e){27==e.keyCode&&jQuery("#jumbosearch").fadeOut()}),jQuery(".flex-images").flexImages({rowHeight:200,object:"img",truncate:!0}),jQuery("#site-navigation ul.menu").slicknav({label:"Menu",duration:1e3,prependTo:"#slickmenu"})}),jQuery(window).load(function(){jQuery("#nivoSlider").nivoSlider({prevText:"<i class='fa fa-chevron-circle-left'></i>",nextText:"<i class='fa fa-chevron-circle-right'></i>"})}),jQuery(document).ready(function(){jQuery(".bxslider").bxSlider({nextSelector:"#slider-next",prevSelector:"#slider-prev",nextText:"<i class='fa fa-chevron-right'></i>",prevText:"<i class='fa fa-chevron-left'></i>",pager:!1,auto:!0,mode:"fade"})});