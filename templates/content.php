<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
  <header>
    <?php get_template_part('templates/entry-meta'); ?>
	<a href="<?php the_permalink(); ?>">
	    <h1 class="entry-title"><?php the_title(); ?></h1>
	</a>
  </header>
  <div class="entry-content summary">
    <?php the_content(); ?>
  </div>
</article>


