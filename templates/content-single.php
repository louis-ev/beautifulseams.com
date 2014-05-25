<?php while (have_posts()) : the_post(); ?>
  <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <header>
      <?php get_template_part('templates/entry-meta'); ?>
      <h1 class="entry-title"><?php the_title(); ?></h1>
    </header>
    <div id="post-<?php the_ID(); ?>" class="entry-content full">
      <?php the_content(); ?>
    </div>
    <footer>

    </footer>

	    <nav class="pageNav">
				<span class="nav-previous" title="Read older article"><?php previous_post_link( '%link', __( 'Older ↓' ) ); ?></span>
				<span class="nav-next" title="Read newer article"><?php next_post_link( '%link', __( '↑ Newer' ) ); ?></span>
	    </nav>

    <?php comments_template('/templates/comments.php'); ?>

  </article>
<?php endwhile; ?>
