<?php

use PublishPress\WordPressReviews\ReviewsController;

if( !class_exists('AdvancedGutenberg_Reviews') ) {
	class AdvancedGutenberg_Reviews
	{
		/**
	    * @var  ReviewsController
	    */
	    private $reviewController;

	    public function __construct()
	    {
	        $this->reviewController = new ReviewsController(
	            'advanced-gutenberg',
	            'PublishPress Blocks',
	            ADVANCED_GUTENBERG_PLUGIN . '/assets/images/logo-notice.png'
	        );
	    }

	    public function init()
	    {
	        add_filter('publishpress_wp_reviews_display_banner_publishpress', [$this, 'shouldDisplayBanner']);

	        $this->reviewController->init();
	    }

	    public function shouldDisplayBanner($shouldDisplay)
	    {
	        global $pagenow;

	        if (! is_admin() || ! current_user_can('edit_posts')) {
	            return false;
	        }

	        if ($pagenow === 'admin.php' && isset($_GET['page'])) {
	            if ($_GET['page'] === 'pp-page1') {
	                return true;
	            }

	            if ($_GET['page'] === 'pp-page2') {
	                return true;
	            }
	        }

	        if ($pagenow === 'edit.php' && isset($_GET['post_type'])) {
	            if ($_GET['post_type'] === 'pp_custom_post_type') {
	                return true;
	            }
	        }

	        return false;
	    }

		/*function advanced_gutenberg_wp_reviews_meta_map($metaMap)
		{
		    // You can override all the array, or specific keys.
		    $metaMap = [
		        'action_ajax_handler' => 'wp_ajax_advgb_review_action',
		        'option_installed_on' => 'advgb_reviews_installed_on',
		        'nonce_action' => 'advgb_review_action',
		        'user_meta_dismissed_triggers' => '_advgb_reviews_dismissed_triggers',
		        'user_meta_last_dismissed' => '_advgb_reviews_last_dismissed',
		        'user_meta_already_did' => '_advgb_reviews_already_did',
		        'filter_triggers' => '_advgb_reviews_triggers',
		    ];

		    return $metaMap;
		}
		add_filter('publishpress_wp_reviews_meta_map_advanced_gutenberg', 'advanced_gutenberg_wp_reviews_meta_map');*/
	}
}
