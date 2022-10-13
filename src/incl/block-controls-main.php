<?php
namespace PublishPress\Blocks;

use Exception;

/*
 * Block controls logic
 */
if( ! class_exists( '\\PublishPress\\Blocks\\Controls' ) ) {
    class Controls
    {
        public function __construct()
        {
            add_action( 'wp_loaded', [$this, 'addAttributes'], 999 );
            add_filter( 'rest_pre_dispatch', [$this, 'removeAttributes'], 10, 3 );

            if( ! is_admin() ) {
                // Frontend
                add_filter( 'render_block', [$this, 'checkBlockControls'], 10, 2 );
            }
        }

        /**
         * Check if block is using controls and decide to display or not in frontend
         *
         * @since 3.1.0 function renamed and migrated from AdvancedGutenbergMain
         * @since 2.14.0
         *
         * @param string    $block_content  Block HTML output
         * @param array     $block          Block attributes
         *
         * @return string                   $block_content or an empty string when block is hidden
         */
        public function checkBlockControls( $block_content, $block ) {
            if ( Utilities::settingIsEnabled( 'block_controls' )
                && $block['blockName']
                && isset($block['attrs']['advgbBlockControls'][0]['enabled'])
                && (bool) $block['attrs']['advgbBlockControls'][0]['enabled'] === true
            ) {
                $bControl = $block['attrs']['advgbBlockControls'][0]; // [0] is for schedule control
                $dateFrom = $dateTo = $recurring = null;
                if ( ! empty( $bControl['dateFrom'] ) ) {
                    $dateFrom = DateTime::createFromFormat( 'Y-m-d\TH:i:s', $bControl['dateFrom'] );
                    // Reset seconds to zero to enable proper comparison
                    $dateFrom->setTime( $dateFrom->format('H'), $dateFrom->format('i'), 0 );
                }
                if ( ! empty( $bControl['dateTo'] ) ) {
                    $dateTo	= DateTime::createFromFormat( 'Y-m-d\TH:i:s', $bControl['dateTo'] );
                    // Reset seconds to zero to enable proper comparison
                    $dateTo->setTime( $dateTo->format('H'), $dateTo->format('i'), 0 );

                    if ( $dateFrom ) {
                        // Recurring is only relevant when both dateFrom and dateTo are defined
                        $recurring = isset( $bControl['recurring'] ) ? $bControl['recurring'] : false;
                    }
                }

                if ( $dateFrom || $dateTo ) {
                    // Fetch current time keeping in mind the timezone
                    $now = DateTime::createFromFormat( 'U', date_i18n( 'U', true ) );

                    // Reset seconds to zero to enable proper comparison
                    // as the from and to dates have those as 0
                    // but do this only for the from comparison
                    // as we need the block to stop showing at the right time and not 1 minute extra
                    $nowFrom = clone $now;
                    $nowFrom->setTime( $now->format('H'), $now->format('i'), 0 );

                    if( $recurring ) {
                        // Make the year same as today's
                        $dateFrom->setDate( $nowFrom->format('Y'), $dateFrom->format('m'), $dateFrom->format('j') );
                        $dateTo->setDate( $nowFrom->format('Y'), $dateTo->format('m'), $dateTo->format('j') );
                    }

                    if ( ! ( ( ! $dateFrom || $dateFrom->getTimestamp() <= $nowFrom->getTimestamp() ) && ( ! $dateTo || $now->getTimestamp() < $dateTo->getTimestamp() ) ) ) {
                        // Empty $block_content (no visible)
                        return '';
                    }
                }
            }

            return $block_content;
        }

        /**
         * Add attributes to ServerSideRender blocks to fix "Invalid parameter(s): attributes" error.
         * As example: 'core/latest-comments'
         * Related Gutenberg issue: https://github.com/WordPress/gutenberg/issues/16850
         *
         * @since 3.1.0 function renamed and migrated from AdvancedGutenbergMain
         * @since 2.14.0
         */
        public function addAttributes()
        {
            $registered_blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();
    		foreach ( $registered_blocks as $block ) {
                $block->attributes['advgbBlockControls'] = [
                    'type'    => 'array',
                    'default' => [],
                ];
    		}
        }

        /**
         * Make sure ServerSideRender blocks are rendererd correctly in editor.
         * As example: 'core/latest-comments'
         * https://github.com/brainstormforce/ultimate-addons-for-gutenberg/blob/master/classes/class-uagb-loader.php#L136-L194
         *
         * @since 3.1.0 function renamed and migrated from AdvancedGutenbergMain
         * @since 2.14.0
         */
        public function removeAttributes( $result, $server, $request )
        {
    		if ( strpos( $request->get_route(), '/wp/v2/block-renderer' ) !== false ) {
    			if ( isset( $request['attributes'] )
                    && isset( $request['attributes']['advgbBlockControls'] )
                ) {
                    $attributes = $request['attributes'];
                    if( $attributes['advgbBlockControls'] ) {
                        unset( $attributes['advgbBlockControls'] );
                    }
                    $request['attributes'] = $attributes;
    			}
    		}

    		return $result;
    	}

        /**
         * Get a Block control value from database option
         *
         * @since 3.1.0
         *
         * @param string $name  Setting name - e.g. 'schedule' from advgb_block_controls > controls
         * @param bool $default Default value when $setting doesn't exist in $option
         *
         * @return bool
         */
        public function getControlValue( $name, $default )
        {
            $settings = get_option( 'advgb_block_controls' );

            $value = isset( $settings['controls'][$name] )
                ? (bool) $settings['controls'][$name]
                : (bool) $default;

            return $value;
        }

        /**
         * Save block controls page data
         *
         * @since 3.1.0
         * @return boolean true on success, false on failure
         */
        public static function save()
        {
            if ( ! current_user_can( 'activate_plugins' ) ) {
                return false;
            }

            // Controls
            if( isset( $_POST['save_controls'] ) ) // phpcs:ignore WordPress.Security.NonceVerification.Missing -- we check nonce below
            {
                if ( ! wp_verify_nonce(
                        sanitize_key( $_POST['advgb_controls_settings_nonce_field'] ),
                        'advgb_controls_settings_nonce'
                    )
                ) {
                    return false;
                }

                $advgb_block_controls                           = get_option( 'advgb_block_controls' );
                $advgb_block_controls['controls']['schedule']   = isset( $_POST['schedule_control'] ) ? (bool) 1 : (bool) 0;
                $advgb_block_controls['controls']['user_role']  = isset( $_POST['user_role_control'] ) ? (bool) 1 : (bool) 0;

                update_option( 'advgb_block_controls', $advgb_block_controls );

                wp_safe_redirect(
                    add_query_arg(
                        [
                            'save' => 'success'
                        ],
                        str_replace( '/wp-admin/', '', $_POST['_wp_http_referer'] )
                    )
                );
            }
            // Blocks
            elseif ( isset( $_POST['save_blocks'] ) ) // phpcs:ignore WordPress.Security.NonceVerification.Missing -- we check nonce below
            {
                if ( ! wp_verify_nonce(
                        sanitize_key( $_POST['advgb_controls_block_nonce_field'] ),
                        'advgb_controls_block_nonce'
                    )
                ) {
                    return false;
                }

                if ( isset( $_POST['blocks_list'] )
                    && isset( $_POST['active_blocks'] )
                    && is_array( $_POST['active_blocks'] )
                ) {
                    $blocks_list        = array_map(
                        'sanitize_text_field',
                        json_decode( stripslashes( $_POST['blocks_list'] ) )
                    );
                    $active_blocks      = array_map( 'sanitize_text_field', $_POST['active_blocks'] );
                    $inactive_blocks    = array_values( array_diff( $blocks_list, $active_blocks ) );

                    // Save block controls
                    $block_controls                     = get_option( 'advgb_block_controls' );
                    $block_controls['active_blocks']    = isset( $active_blocks ) ? $active_blocks : '';
                    $block_controls['inactive_blocks']  = isset( $inactive_blocks ) ? $inactive_blocks : '';

                    update_option( 'advgb_block_controls', $block_controls );

                    // Redirect with success message
                    wp_safe_redirect(
                        add_query_arg(
                            [
                                'tab' => 'blocks',
                                'save' => 'success'
                            ],
                            str_replace( '/wp-admin/', '', $_POST['_wp_http_referer'] )
                        )
                    );
                } else {
                    // Redirect with error message / Nothing was saved
                    wp_safe_redirect(
                        add_query_arg(
                            [
                                'save' => 'error'
                            ],
                            str_replace( '/wp-admin/', '', $_POST['_wp_http_referer'] )
                        )
                    );
                }
            } else {
                // Nothing to do here
            }

            return false;
        }

        /**
         * Javascript objects with controls configuration to load in Admin.
         * 'advgbBlockControls' object with controls configuration.
         * 'advgb_blocks_list' object with all the saved blocks in 'advgb_blocks_list' option.
         *
         * @since 3.1.0
         * @return void
         */
        public static function adminData()
        {
            // Build blocks form and add filters functions
            wp_add_inline_script(
                'advgb_main_js',
                "window.addEventListener('load', function () {
                    advgbGetBlockControls(
                        advgbBlockControls.inactive_blocks,
                        '#advgb_block_controls_nonce_field',
                        'advgb_block_controls',
                        " . wp_json_encode( self::defaultExcludedBlocks() ) . "
                    );
                });"
            );
            do_action( 'enqueue_block_editor_assets' );

            // Block categories
            $blockCategories = array();
            if (function_exists('get_block_categories')) {
                $blockCategories = get_block_categories(get_post());
            } elseif (function_exists('gutenberg_get_block_categories')) {
                $blockCategories = gutenberg_get_block_categories(get_post());
            }
            wp_add_inline_script(
                'wp-blocks',
                sprintf('wp.blocks.setCategories( %s );', wp_json_encode($blockCategories)),
                'after'
            );

            // Block types
            $block_type_registry = \WP_Block_Type_Registry::get_instance();
            foreach ( $block_type_registry->get_all_registered() as $block_name => $block_type ) {
                if ( ! empty( $block_type->editor_script ) ) {
                    wp_enqueue_script( $block_type->editor_script );
                }
            }

            /* Get blocks saved in advgb_blocks_list option to include the ones that are missing
             * as result of javascript method wp.blocks.getBlockTypes()
             * e.g. blocks registered only via PHP
             */
            if( Utilities::settingIsEnabled( 'block_extend' ) ) {
                $advgb_blocks_list = get_option( 'advgb_blocks_list' );
                if( $advgb_blocks_list && is_array( $advgb_blocks_list ) ) {
                    $saved_blocks = $advgb_blocks_list;
                } else {
                    $saved_blocks = [];
                }
                wp_localize_script(
                    'advgb_main_js',
                    'advgb_blocks_list',
                    $saved_blocks
                );
            }

            // Active and inactive blocks
            $block_controls = get_option( 'advgb_block_controls' );
            if( $block_controls
                && isset( $block_controls['active_blocks'] )
                && isset( $block_controls['inactive_blocks'] )
                && is_array( $block_controls['active_blocks'] )
                && is_array( $block_controls['inactive_blocks'] )
            ) {
                wp_localize_script(
                    'wp-blocks',
                    'advgbBlockControls',
                    [
                        'controls' => [
                            'schedule' => (bool) $block_controls['controls']['schedule'],
                            'user_role' => (bool) $block_controls['controls']['user_role']
                        ],
                        'active_blocks' => $block_controls['active_blocks'],
                        'inactive_blocks' => $block_controls['inactive_blocks']
                    ]
                );
            } else {
                // Nothing saved in database for current user role. Set empty (access to all blocks)
                wp_localize_script(
                    'wp-blocks',
                    'advgbBlockControls',
                    [
                        'controls' => [
                            'schedule' => (bool) 1,
                            'user_role' => (bool) 1
                        ],
                        'active_blocks' => [],
                        'inactive_blocks' => []
                    ]
                );
            }
        }

        /**
         * Javascript objects with controls configuration to load in Editor.
         * 'advgbBlockControls' object with controls configuration.
         *
         * @since 3.1.0
         * @return void
         */
        public static function editorData()
        {
            $advgb_block_controls = get_option( 'advgb_block_controls' );

            if( $advgb_block_controls
                && isset( $advgb_block_controls['inactive_blocks'] )
                && is_array( $advgb_block_controls['inactive_blocks'] )
                && count( $advgb_block_controls['inactive_blocks'] ) > 0
            ) {
                // Merge non supported saved and manually defined blocks
                $non_supported = array_merge(
                    $advgb_block_controls['inactive_blocks'],
                    self::defaultExcludedBlocks()
                );
                $non_supported = array_unique( $non_supported );
            } else {
                // Non supported manually defined blocks
                $non_supported = self::defaultExcludedBlocks();
            }

            $schedule_control   = isset( $advgb_block_controls['controls']['schedule'] ) ? (bool) $advgb_block_controls['controls']['schedule'] : (bool) 1;
            $user_role_control  = isset( $advgb_block_controls['controls']['user_role'] ) ? (bool) $advgb_block_controls['controls']['user_role'] : (bool) 1;

            // Output js variable
            wp_localize_script(
                'wp-blocks',
                'advgbBlockControls',
                [
                    'non_supported' => $non_supported,
                    'controls' => [
                        'schedule' => (bool) $schedule_control,
                        'user_role' => (bool) $user_role_control
                    ]
                ]
            );
        }

        /**
         * Block controls support for these blocks is not available
         *
         * @since 3.1.0
         * @return void
         */
        public static function defaultExcludedBlocks()
        {
            return [
                'core/freeform',
                'core/legacy-widget',
                'core/widget-area',
                'core/column',
                'advgb/tab',
                'advgb/column',
                'advgb/accordion' // @TODO - Deprecated block. Remove later.
            ];
        }

        /**
         * Enqueue assets for editor
         *
         * @since 3.1.0
         *
         * @param $wp_editor_dep Block editor dependency based on current screen. e.g. 'wp-editor'
         *
         * @return void
         */
        public static function editorAssets( $wp_editor_dep )
        {
            if( Utilities::settingIsEnabled( 'block_controls' ) ) {
                wp_enqueue_script(
                    'advgb_block_controls',
                    plugins_url( 'assets/blocks/block-controls.js', dirname( __FILE__ ) ),
                    [
                        'wp-blocks',
                        'wp-i18n',
                        'wp-element',
                        'wp-data',
                        $wp_editor_dep,
                        'wp-plugins',
                        'wp-compose'
                    ],
                    ADVANCED_GUTENBERG_VERSION,
                    true
                );
            }
        }
    }
}
