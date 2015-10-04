<div class="wide-as-page">
	<div class="centered">
		<section id="artportfolio" class="apercu">

			<?php
			$args = array( 'post_type' => 'post', 'posts_per_page' => -1);
			$wp_query = new WP_Query($args);
			while ( have_posts() ) : the_post(); ?>

			<a href="<?php the_permalink(); ?>">
				<div class="vignettes">
					<header class="titres">
						<h4 class="entry-title"><?php the_title(); ?></h4>
					</header>

					<div class="entry-thumbnail">
						<?php
global $post;
$content = get_extended( $post->post_content );
$excerpt = $content['main'];
$excerpt = strip_tags($excerpt, custom_excerpt_allowed_tags());
echo $excerpt;
?>

					</div>
				</div>
			</a>

			<?php endwhile; ?>

		</section>
	</div>
</div>