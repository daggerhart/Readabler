<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package Vanilla
 */
?>

	</div><!-- #content -->

	<footer id="colophon" class="site-footer container" role="contentinfo">
		<nav id="footer-navigation" class="footer-navigation" role="navigation">
			<?php wp_nav_menu( array( 'theme_location' => 'footer', 'menu_id' => 'footer-menu' ) ); ?>
		</nav>
		<div class="copyright">&copy; <?php print date('Y'); ?> <?php bloginfo('name'); ?></div>
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
