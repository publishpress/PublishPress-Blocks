<?php
defined('ABSPATH') || die;

/**
 * Extract text from html string
 *
 * @param string  $html   HTML string to extract
 * @param integer $length Length of the string will return
 *
 * @return string Text that has been extracted
 */
function advgbExtractHtml($html, $length)
{
    if (!trim($html)) {
        return '';
    }

    $html = <<<HTML
$html
HTML;

    $dom = new DOMDocument();

    libxml_use_internal_errors(true);
    $dom->loadHTML(mb_convert_encoding($html, 'HTML-ENTITIES', 'UTF-8'));

    $scripts = $dom->getElementsByTagName('script');
    $styles = $dom->getElementsByTagName('style');
    $remove = array();

    foreach ($scripts as $item) {
        $remove[] = $item;
    }

    foreach ($styles as $item) {
        $remove[] = $item;
    }

    foreach ($remove as $item) {
        $item->parentNode->removeChild($item);
    }

    $html = $dom->saveHTML();
    $text = strip_tags($html);
    $text = trim(preg_replace('/\s\s+/', ' ', $text));

    if (!$text) {
        return '';
    }

	$text = mb_convert_encoding($text, 'UTF-8','HTML-ENTITIES');
	$text = mb_substr($text, 0, $length, 'UTF-8');

    return $text;
}

/**
 * Render content for Recent Posts block
 *
 * @param array $attributes Attributes of the block
 *
 * @return null
 */
function advgbRenderBlockRecentPosts($attributes)
{
	global $post;

	$categories = empty($attributes['categories'])? array() :$attributes['categories'];
	if ( ! empty( $categories ) ) {
		$categories = array_column( $categories, 'id' );
	}
	if(isset($attributes['category']) && !empty($attributes['category'])){
		$categories = $attributes['category'];
	}

	$tax_query = null;
	if ( !empty($attributes['tags'] ) ){
		$tax_query = array(
				array(
					'taxonomy' => 'post_tag',
					'field' => 'name',
					'terms' => $attributes['tags'],
					'operator' => 'IN',
				),
			);
	}

	$orderBy = empty($attributes['orderBy'])?'date':$attributes['orderBy'];

	// 'id' in https://developer.wordpress.org/rest-api/reference/posts/#list-posts
	// BUT
	// 'ID' in https://developer.wordpress.org/reference/classes/wp_query/parse_query/
	if ( $orderBy === 'id' ) {
		$orderBy = 'ID';
	}

	// if multiple authors, use the first author in the list.
	if ( $orderBy === 'author' ) {
		advgbMultipleAuthorSort();
	}

	$post_type = isset($attributes['postType']) ? $attributes['postType'] : 'post';
	$args = array(
			'post_type' => $post_type,
            'numberposts' => empty($attributes['numberOfPosts'])?8:$attributes['numberOfPosts'],
            'post_status' => 'publish',
            'order' => empty($attributes['order'])?'desc':$attributes['order'],
            'orderby' => $orderBy,
            'suppress_filters' => false,
			'exclude' => $post_type === 'post' && isset( $attributes['excludeCurrentPost'] ) && $attributes['excludeCurrentPost'] ? $post->ID : 0
        );

	// use tax for anything but pages...
	if ( ! in_array( $post_type, array( 'page' ), true ) ) {
		$args = wp_parse_args( $args, array(
            'category__in' => is_array( $categories ) ? array_map( 'intval', $categories ) : $categories,
            'tax_query' => $tax_query,
		) );
	}

    $recent_posts = wp_get_recent_posts( $args, OBJECT );

    $saved_settings    = get_option('advgb_settings');
    $default_thumb     = plugins_url('assets/blocks/recent-posts/recent-post-default.png', ADVANCED_GUTENBERG_PLUGIN);
    $rp_default_thumb  = isset($saved_settings['rp_default_thumb']) ? $saved_settings['rp_default_thumb'] : array('url' => $default_thumb, 'id' => 0);

    $postHtml = '';

    if (!empty($recent_posts)) {
        foreach ($recent_posts as $key=>$post) {
            $postThumbID = get_post_thumbnail_id($post->ID);

            $postHtml .= '<article class="advgb-recent-post' . ( advgbCheckImageStatus( $attributes, $key ) ? '' : ' advgb-recent-post--no-image' ) . '">';

            if ( advgbCheckImageStatus( $attributes, $key ) ) {
                $postThumb = '<img src="' . $rp_default_thumb['url'] . '" />';
                if ($postThumbID) {
                    $postThumb = wp_get_attachment_image($postThumbID, 'large');
                } else {
                    if ($rp_default_thumb['id']) {
                        $postThumb = wp_get_attachment_image($rp_default_thumb['id'], 'large');
                    }
                }

                $postHtml .= sprintf(
                    '<div class="advgb-post-thumbnail"><a href="%1$s">%2$s</a></div>',
                    get_permalink($post->ID),
                    $postThumb
                );
            } elseif ( ($attributes['postView'] === 'frontpage' && $attributes['frontpageStyle'] === 'headline') || ($attributes['postView'] === 'slider' && $attributes['sliderStyle'] === 'headline') ) {
                $postHtml .= sprintf(
                    '<div class="advgb-post-thumbnail advgb-post-thumbnail-no-image"><a href="%1$s"></a></div>',
                    get_permalink($post->ID)
                );
            } else {
                // Nothing to do here
            }

            $postHtml .= '<div class="advgb-post-wrapper">';

            $postHtml .= sprintf(
                '<h2 class="advgb-post-title"><a href="%1$s">%2$s</a></h2>',
                get_permalink($post->ID),
                get_the_title($post->ID)
            );

            if (isset($attributes['textAfterTitle']) && !empty($attributes['textAfterTitle'])) {
				$postHtml .= sprintf( '<div class="advgb-text-after-title">%s</div>', wp_kses_post( $attributes['textAfterTitle'] ) );
			}

            $postHtml .= '<div class="advgb-post-info">';

            if (isset($attributes['displayAuthor']) && $attributes['displayAuthor']) {
				$coauthors = advgbGetCoauthors( array( 'id' => $post->ID ) );
				if ( ! empty( $coauthors ) ) {
					$index = 0;
					foreach ( $coauthors as $coauthor ) {
						$postHtml .= sprintf(
							'<a href="%1$s" class="advgb-post-author" target="_blank">%2$s</a>',
							$coauthor['link'],
							$coauthor['display_name']
						);
						if ( $index++ < count( $coauthors ) - 1 ) {
							$postHtml .= '<span>, </span>';
						}
					}
				} else {
					$postHtml .= sprintf(
						'<a href="%1$s" class="advgb-post-author" target="_blank">%2$s</a>',
						get_author_posts_url($post->post_author),
						get_the_author_meta('display_name', $post->post_author)
					);
				}
            }

            $postDate = isset($attributes['displayDate']) && $attributes['displayDate'] ? 'created' : (isset($attributes['postDate']) ? $attributes['postDate'] : 'hide');
            $postDateFormat = isset($attributes['postDateFormat']) ? $attributes['postDateFormat'] : '';
            $displayTime = isset($attributes['displayTime']) && $attributes['displayTime'];
			$postDateDisplay = null;

			if ( $postDate !== 'hide' ) {
				$format = $displayTime ? ( get_option( 'date_format' ) . ' ' . get_option( 'time_format' ) ) : get_option( 'date_format' );

				if ( $postDateFormat === 'absolute' ) {
					if ( $postDate === 'created' ) {
						$postDateDisplay = get_the_date( $format, $post->ID);
					} else {
						$postDateDisplay = get_the_modified_date( $format, $post->ID);
					}
				} else {
                    // Relative date format
					if ( $postDate === 'created' ) {
						$postDateDisplay = __( 'Posted', 'advanced-gutenberg') . ' ' . human_time_diff( get_the_date( 'U', $post->ID ) ) . ' ' . __( 'ago', 'advanced-gutenberg');
					} else {
						$postDateDisplay = __( 'Updated', 'advanced-gutenberg') . ' ' .human_time_diff( get_the_modified_date( 'U', $post->ID ) ) . ' ' . __( 'ago', 'advanced-gutenberg');
					}
				}
			}

            if ( ! empty( $postDateDisplay ) ) {
                $postHtml .= sprintf(
                    '<span class="advgb-post-datetime">%1$s</span>',
                    $postDateDisplay
                );
            }

            if ($post_type === 'post' && isset($attributes['displayCommentCount']) && $attributes['displayCommentCount']) {
				$count = get_comments_number( $post );
				$postHtml .= sprintf(
					'<span class="advgb-post-comments"><span class="dashicons dashicons-admin-comments"></span>(%d)</span>',
					$count
				);
			}

            $postHtml .= '</div>'; // end advgb-post-info

            $postHtml .= '<div class="advgb-post-tax-info">';

			if ( isset( $attributes['showCategories'] ) && 'hide' !== $attributes['showCategories'] ) {
				$categories = get_the_category( $post->ID );
				if ( ! empty( $categories ) ) {
					$postHtml .= '<div class="advgb-post-tax advgb-post-category">';
					foreach ( $categories as $category ) {
						if ( 'link' === $attributes['showCategories'] ) {
							$postHtml .= sprintf( '<div><a class="advgb-post-tax-term" href="%s">%s</a></div>', esc_url( get_category_link( $category ) ), esc_html( $category->name ) );
						} else {
							$postHtml .= sprintf( '<div><span class="advgb-post-tax-term">%s</span></div>', esc_html( $category->name ) );
						}
					}
					$postHtml .= '</div>';
				}
			}

			if ( isset( $attributes['showTags'] ) && 'hide' !== $attributes['showTags'] ) {
				$tags = get_the_tags( $post->ID );
				if ( ! empty( $tags ) ) {
					$postHtml .= '<div class="advgb-post-tax advgb-post-tag">';
					foreach ( $tags as $tag ) {
						if ( 'link' === $attributes['showTags'] ) {
							$postHtml .= sprintf( '<div><a class="advgb-post-tax-term" href="%s">%s</a></div>', esc_url( get_tag_link( $tag ) ), esc_html( $tag->name ) );
						} else {
							$postHtml .= sprintf( '<div><span class="advgb-post-tax-term">%s</span></div>', esc_html( $tag->name ) );
						}
					}
					$postHtml .= '</div>';
				}
			}

            $postHtml .= '</div>'; // end advgb-post-tax-info

            $postHtml .= '<div class="advgb-post-content">';

            if (isset($attributes['displayExcerpt']) && $attributes['displayExcerpt']) {
                $introText = $post->post_excerpt;

                if (isset($attributes['displayExcerpt']) && $attributes['postTextAsExcerpt']) {
                    if (!is_admin()) {
                        $postContent = get_post_field('post_content', $post->ID);
                        $postContent = strip_shortcodes($postContent);
                        $postContent = preg_replace('/<!--(.*?-->)/is', '', $postContent);
                        $introText   = advgbExtractHtml($postContent, $attributes['postTextExcerptLength']);
                    }
                }

                $postHtml .= sprintf(
                    '<div class="advgb-post-excerpt">%1$s</div>',
                    $introText
                );
            }

            if (isset($attributes['textBeforeReadmore']) && !empty($attributes['textBeforeReadmore'])) {
				$postHtml .= sprintf( '<div class="advgb-text-before-readmore">%s</div>', wp_kses_post( $attributes['textBeforeReadmore'] ) );
			}

            if (isset($attributes['displayReadMore']) && $attributes['displayReadMore']) {
                $readMoreText = __('Read More', 'advanced-gutenberg');
                if (isset($attributes['readMoreLbl']) && $attributes['readMoreLbl']) {
                    $readMoreText = $attributes['readMoreLbl'];
                }

                $postHtml .= sprintf(
                    '<div class="advgb-post-readmore"><a href="%1$s">%2$s</a></div>',
                    get_permalink($post->ID),
                    $readMoreText
                );
            }

            $postHtml .= '</div>'; // end advgb-post-content

            $postHtml .= '</div>'; // end advgb-post-wrapper

            $postHtml .= '</article>';
        }
    }

    $blockClass = '';

    if ($attributes['postView'] === 'grid') {
        $blockClass = 'grid-view columns-' . $attributes['columns'];
    } elseif ($attributes['postView'] === 'list') {
        $blockClass = 'list-view';
    } elseif ($attributes['postView'] === 'slider') {
        $blockClass = 'slider-view';
        $blockClass .= ' style-' . $attributes['sliderStyle'];
    } elseif ($attributes['postView'] === 'frontpage') {
        $blockClass = 'frontpage-view';
        $blockClass .= ' layout-' . $attributes['frontpageLayout'];
        $blockClass .= ' gap-' . $attributes['gap'];
        $blockClass .= ' style-' . $attributes['frontpageStyle'];
        (isset($attributes['frontpageLayoutT']) && $attributes['frontpageLayoutT']) ? $blockClass .= ' tbl-layout-' . $attributes['frontpageLayoutT'] : '';
        (isset($attributes['frontpageLayoutM']) && $attributes['frontpageLayoutM']) ? $blockClass .= ' mbl-layout-' . $attributes['frontpageLayoutM'] : '';
    }

    if (isset($attributes['className'])) {
        $blockClass .= ' ' . $attributes['className'];
    }

    $blockHtml = sprintf(
        '<div class="advgb-recent-posts-block %2$s"><div class="advgb-recent-posts">%1$s</div></div>',
        $postHtml,
        esc_attr($blockClass)
    );

    return $blockHtml;
}

/**
 * Register block Recent Posts
 *
 * @return void
 */
function advgbRegisterBlockRecentPosts()
{
    if (!function_exists('register_block_type')) {
        return;
    }

    register_block_type('advgb/recent-posts', array(
        'attributes' => array(
            'postView' => array(
                'type' => 'string',
                'default' => 'grid',
            ),
            'order' => array(
                'type' => 'string',
                'default' => 'desc',
            ),
            'orderBy'  => array(
                'type' => 'string',
                'default' => 'date',
            ),
            'categories' => array(
                'type' => 'array',
                'items' => array(
                    'type' => 'object'
                )
            ),
            'tags' => array(
                'type' => 'array',
                'items' => array(
                    'type' => 'string'
                )
            ),
            'numberOfPosts' => array(
                'type' => 'number',
                'default' => 8,
            ),
            'columns' => array(
                'type' => 'number',
                'default' => 2,
            ),
            'displayFeaturedImage' => array(
                'type' => 'boolean',
                'default' => true,
            ),
            'displayFeaturedImageFor' => array(
                'type' => 'string',
                'default' => 'all',
            ),
            'displayAuthor' => array(
                'type' => 'boolean',
                'default' => false,
            ),
            'postDate' => array(
                'type' => 'string',
                'default' => 'hide',
            ),
            'postDateFormat' => array(
                'type' => 'string',
                'default' => 'absolute',
            ),
            'displayTime' => array(
                'type' => 'boolean',
                'default' => false,
            ),
            'displayExcerpt' => array(
                'type' => 'boolean',
                'default' => true,
            ),
            'postTextAsExcerpt' => array(
                'type' => 'boolean',
                'default' => false,
            ),
            'postTextExcerptLength' => array(
                'type' => 'number',
                'default' => 150,
            ),
            'displayReadMore' => array(
                'type' => 'boolean',
                'default' => true,
            ),
            'myToken' => array(
                'type' => 'number',
            ),
            'readMoreLbl' => array(
                'type' => 'string',
            ),
            'frontpageLayout' => array(
                'type' => 'string',
                'default' => '1-3',
            ),
            'frontpageLayoutT' => array(
                'type' => 'string',
            ),
            'frontpageLayoutM' => array(
                'type' => 'string',
            ),
            'gap' => array(
                'type' => 'number',
                'default' => 10,
            ),
            'frontpageStyle' => array(
                'type' => 'string',
                'default' => 'default',
            ),
            'sliderStyle' => array(
                'type' => 'string',
                'default' => 'default',
            ),
            'changed' => array(
                'type' => 'boolean',
                'default' => false,
            ),
            'excludeCurrentPost' => array(
                'type' => 'boolean',
                'default' => false,
            ),
            'postType' => array(
                'type' => 'string',
            ),
            'showCategories' => array(
                'type' => 'string',
                'default' => 'hide',
            ),
            'showTags' => array(
                'type' => 'string',
                'default' => 'hide',
            ),
            'displayCommentCount' => array(
                'type' => 'boolean',
                'default' => false,
            ),
            'textAfterTitle' => array(
                'type' => 'string',
            ),
            'textBeforeReadmore' => array(
                'type' => 'string',
            ),
			// deprecrated attributes...
            'displayDate' => array(
                'type' => 'boolean',
                'default' => false,
            ),
            'category' => array(
                'type' => 'string',
            ),
        ),
        'render_callback' => 'advgbRenderBlockRecentPosts',
    ));
}

add_action('init', 'advgbRegisterBlockRecentPosts');

/**
 * Register additional fields returned in REST.
 *
 * @return void
 */
function advgbRegisterCustomFields() {
    register_rest_field( 'post',
        'coauthors',
        array(
            'get_callback'  => 'advgbGetCoauthors',
            'update_callback'   => null,
            'schema'            => null,
        )
    );

    register_rest_field( 'page',
        'author_meta',
        array(
            'get_callback'  => 'advgbGetAuthorMeta',
            'update_callback'   => null,
            'schema'            => null,
        )
    );

    register_rest_field( 'post',
        'tax_additional',
        array(
            'get_callback'  => 'advgbGetAdditionalTaxInfo',
            'update_callback'   => null,
            'schema'            => null,
        )
    );

    register_rest_field( 'post',
        'comment_count',
        array(
            'get_callback'  => 'advgbGetComments',
            'update_callback'   => null,
            'schema'            => null,
        )
    );

    register_rest_field( 'post',
        'relative_dates',
        array(
            'get_callback'  => 'advgbGetRelativeDates',
            'update_callback'   => null,
            'schema'            => null,
        )
    );

}
add_action( 'rest_api_init', 'advgbRegisterCustomFields' );

/**
 * Allow more orderBy values for posts.
 *
 * @return array
 */
function advgbAllowPostQueryVars( $query_params ) {
	$query_params['orderby']['enum'][] = 'rand';
	$query_params['orderby']['enum'][] = 'comment_count';
	return $query_params;
}
add_filter( 'rest_post_collection_params', 'advgbAllowPostQueryVars' );

/**
 * Allow more orderBy values for pages.
 *
 * @return array
 */
function advgbAllowPageQueryVars( $query_params ) {
	$query_params['orderby']['enum'][] = 'author';
	$query_params['orderby']['enum'][] = 'rand';
	return $query_params;
}
add_filter( 'rest_page_collection_params', 'advgbAllowPageQueryVars' );

/**
 * Returns the relative dates of the post.
 *
 * @return array
 */
function advgbGetRelativeDates( $post ) {
	return array(
		'created' => __( 'Posted', 'advanced-gutenberg') . ' ' .human_time_diff( get_the_date( 'U', $post['id'] ) ) . ' ' . __( 'ago', 'advanced-gutenberg'),
		'modified' => __( 'Updated', 'advanced-gutenberg') . ' ' .human_time_diff( get_the_modified_date( 'U', $post['id'] ) ) . ' ' . __( 'ago', 'advanced-gutenberg')
	);
}

/**
 * Returns the number of comments against the post;
 *
 * @return int
 */
function advgbGetComments( $post ) {
	return get_comments_number( $post['id'] );
}

/**
 * Populates the HTML corresponding to the categories and tags in case they need to be shown in the post.
 *
 * @return array
 */
function advgbGetAdditionalTaxInfo( $post ) {
	$info = array();

	$categories = get_the_category( $post['id'] );
	if ( ! empty( $categories ) ) {
		$cats = array( 'linked' => array(), 'unlinked' => array() );
		foreach ( $categories as $category ) {
			$cats['linked'][] = sprintf( '<a href="%s" class="advgb-post-tax-term">%s</a>', esc_url( get_category_link( $category ) ), esc_html( $category->name ) );
			$cats['unlinked'][] = sprintf( '<span class="advgb-post-tax-term">%s</span>', esc_html( $category->name ) );
		}
		$info['categories'] = $cats;
	}

	$tags = get_the_tags( $post['id'] );
	if ( ! empty( $tags ) ) {
		$cats = array( 'linked' => array(), 'unlinked' => array() );
		foreach ( $tags as $tag ) {
			$cats['linked'][] = sprintf( '<a href="%s" class="advgb-post-tax-term">%s</a>', esc_url( get_tag_link( $category ) ), esc_html( $tag->name ) );
			$cats['unlinked'][] = sprintf( '<span class="advgb-post-tax-term">%s</span>', esc_html( $tag->name ) );
		}
		$info['tags'] = $cats;
	}
	return $info;
}

/**
 * Get the coauthors from the PublishPress Authors plugin if it is activated.
 *
 * @return array
 */
function advgbGetCoauthors( $post ) {
	$coauthors = array();
	if ( function_exists('get_multiple_authors') ){
		$authors = get_multiple_authors( $post[ 'id' ] );
		foreach ($authors as $user) {
			$author = MultipleAuthors\Classes\Objects\Author::get_by_user_id( $user->ID );
			$coauthors[] = array( 'link' => $author->__get('link'), 'display_name' => $author->__get('name'));
		}
	}
    return $coauthors;
}


/**
 * Populate the author_meta for pages.
 *
 * @return array
 */
function advgbGetAuthorMeta( $page ) {
	return array( 'author_link' => get_author_posts_url( $page['author'] ), 'display_name' => get_the_author_meta( 'display_name', $page['author'] ) );
}

/**
 * If multiple authors are defined using PublishPress Authors plugin, use the first author in the list.
 */
function advgbMultipleAuthorSort() {
	if ( function_exists('get_multiple_authors') ){
		add_action('pre_get_posts', function( $query )  {
			if ( is_admin() ) {
				return $query;
			}

			$query->set('orderby', 'meta_value');
			$query->set('meta_key', 'ppma_authors_name');

			return $query;

		} );
	}
}

/**
 * Populate the correct arguments in REST for sorting by author.
 *
 * The results depends on whether PublishPress Authors plugin is activated.
 *
 * @return array
 */
function advgbMultipleAuthorSortREST( $args, $request ) {
	if ( isset( $request['orderby'] ) && 'author' === $request['orderby'] && function_exists('get_multiple_authors') ) {
		$args['meta_key'] = 'ppma_authors_name';
		$args['orderby'] = 'meta_value';
	}
	return $args;
}
add_filter( 'rest_post_query', 'advgbMultipleAuthorSortREST', 10, 2 );

/**
 * Check if Featured image is enable for each post
 *
 * @return boolean
 */
function advgbCheckImageStatus( $attributes, $key )  {
    if(
        isset($attributes['displayFeaturedImage']) && $attributes['displayFeaturedImage']
        && ($attributes['displayFeaturedImageFor'] === 'all'
        || $key < $attributes['displayFeaturedImageFor'])
    ) {
        return true;
    } else {
        return false;
    }
}
