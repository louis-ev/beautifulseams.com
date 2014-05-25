/* ========================================================================
 *
 * Theme for beautifulseams.com by Louis Eveillard
 * Based on the HTML5BP and Roots 6.5.2
 * Original JS file : beautifulseams.com/wp-content/themes/beautifulseams2/assets/js/_main.js
 *
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * ======================================================================== */

	var setXpandImages = function() {
			$('.xpandimages').css("opacity", 1);
			$(".xpandimages").each(function() {
				var $this = $(this);
				var hauteurImg = $this.attr('data-height') ? $this.attr('data-height') : '400px';
				if ($this.children('img').attr('src') !== undefined) {
					if ($('body').width() > 1030) {
						setTimeout(function() {
							$this.children('img').css({
								opacity: '0',
							});
						}, 1000);
						$this.css('backgroundImage', 'url(' + $this.children('img').attr('src') + ')');
					} else {
						$this.children('img').css({
							opacity: '1',
						});
						$this.css('backgroundImage', 'none');
					}
				}
				$this.stop(true, false).transition({
					width: $(".entry-content").width(),
					height: hauteurImg,
					marginLeft: '0px',
					transition: 'all .3s',
				});
				$this.hover(

				function() {
					var image = new Image();
					image.src = $(this).find('img').attr('src');
					//console.log("image.src : " + image.src + " image.width : " + image.width);
					if ($('body').width() > 1030) {
						var imageW = Math.min(image.width, $('body').width() - 40);
						if (imageW < 100) {
							imageW = 600;
						}
						// calculer la bonne largeur en fct de la width trouvée
						var ratioWH = image.width / image.height;
						imageH = imageW / ratioWH;
						if (imageH < 100) {
							imageH = 400;
						}
						$(this).delay(50).stop(true, false).transition({
							width: imageW,
							height: imageH,
							marginLeft: -(imageW - $(".entry-content").width()) / 2,
							//marginBottom: -(imageH - 600),
							duration: 300,
							easing: 'easeOutCubic',
						});
					}
				}, function() {
					var hauteurImg = $(this).attr('data-height') ? $(this).attr('data-height') : '400px';
					$(this).stop(true, false).transition({
						width: $(".entry-content").width(),
						height: hauteurImg,
						marginLeft: '0px',
						duration: 600,
						easing: 'easeOutCubic',
					});
				});
			});
		};


(function($) {

	/* universal delayer from stackoverflow */
	var waitForFinalEvent = function() {
			var timers = {};
			return function(callback, ms, uniqueId) {
				if (!uniqueId) {
					uniqueId = "Don't call this twice without a uniqueId";
				}
				if (timers[uniqueId]) {
					clearTimeout(timers[uniqueId]);
				}
				timers[uniqueId] = setTimeout(callback, ms);
			};
		};

	var Roots = {
		common: {
			init: function() {
				// manual kerning is good
				//$(".entry-title").lettering();
				$('body').addClass("loaded");
				$('.banner').css("opacity", 1);
				setXpandImages();
				$(window).resize(function() {
					waitForFinalEvent(function() {
						// recalculer la hauteur entre les images
						setXpandImages();
					}, 500, "resize");
				});

				prettyPrint();

				function redirectPage() {
					window.location = linkLocation;
				}

				// afficher le loader
				$('#loader').css('opacity', '1');
				$.getJSON('http://www.beautifulseams.com/wp-content/themes/manifest_v1.1/get-tweets.php', function(feeds) {
					//alert(feeds);
					var feedHTML = '';
					var displayCounter = 1;
					//console.log(feeds);
					drawHeader(feeds);
				})
				.error(function() {
					$("#loader").css("opacity",0);
					$("#lifelog-img").css("opacity",1);
				});
			}
		},
		home: {
			init: function() {
				// changer les liens des images de la page d'accueil : vers article, pas vers image
				$(".entry-content a.xpandimages").each(function() {
					$(this).attr('href', $(this).parent(".entry-content").siblings("header").children("a").attr("href")).attr('target', '');
				});


				$(".main").on("click", ".entry-content a.more-link", function (e) {

					e.preventDefault();
					link = $(this).attr('href');
					title = $(this).attr('title');

					var $thisArticle = $(this).closest("article.post");
					var $thisArticleSummary = $thisArticle.find(".entry-content");
					$thisArticleSummary.addClass("loading");

					setTimeout( function () {
						$.get(link, function(data){
							$(data).find(".entry-content").hide().appendTo($thisArticle).fadeIn(400);

							history.pushState( null, title, link);

							$thisArticleSummary.css("position", "absolute").fadeOut(300, function() { $(this).remove(); });

	//						history.pushState( null, title, link);

							$thisArticle.find(".xpandimages").each(function() {
								$(this).attr("target", "_blank");
							});

							prettyPrint();

							setXpandImages();

						});
					}, 800);


				});
			}
		},
		single: {
			init: function() {
				$(".entry-content .xpandimages").each(function() {
					$(this).attr("target", "_blank");
				});
			}
		},
		postid_814: {
			init: function() {
				// charger les canvas PJS uniquement au survol
				$('#post-814 canvas').each(function() {
					$(this).hover(function() {
						var thisID = this.id;
						console.log(thisID);
						Processing.getInstanceById(thisID).loop();
					}, function() {
						var thisID = this.id;
						Processing.getInstanceById(thisID).noLoop();
					});
				});
			}
		}
};
// The routing fires all common scripts, followed by the page specific scripts.
// Add additional events for more control over timing e.g. a finalize event
var UTIL = {
	fire: function(func, funcname, args) {
		var namespace = Roots;
		funcname = (funcname === undefined) ? 'init' : funcname;
		if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
			namespace[func][funcname](args);
		}
	},
	loadEvents: function() {
		UTIL.fire('common');
		$.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
			UTIL.fire(classnm);
		});
	}
};
$(document).ready(UTIL.loadEvents);
})(jQuery); // Fully reference jQuery after this point.