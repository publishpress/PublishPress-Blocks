<?php
defined( 'ABSPATH' ) || die;
?>

<div class="publishpress-admin wrap">
    <header>
        <h1 class="wp-heading-inline">
            <?php esc_html_e( 'PublishPress Blocks', 'advanced-gutenberg' ) ?>
        </h1>
    </header>
    <div class="wrap">
        <div class="pp-columns-wrapper<?php echo ( ! defined( 'ADVANCED_GUTENBERG_PRO' )
            ? ' pp-enable-sidebar'
            : '' ) ?>"
        >
            <div class="pp-column-left">
                <div>
                    <?php
                    $isPro = defined( 'ADVANCED_GUTENBERG_PRO') ? true : false;
                    $features = [
                        [
                            'name' => 'block_controls',
                            'title' => __( 'Block controls', 'advanced-gutenberg' ),
                            'description' => __(
                                'Schedule blocks to be published and unpublished. Every block can have a “Start showing” and/or “Stop showing” option.', 'advanced-gutenberg'
                            ),
                            'default' => 1,
                            'access' => true
                        ],
                        [
                            'name' => 'enable_block_access',
                            'title' => __( 'Block access', 'advanced-gutenberg' ),
                            'description' => __(
                                'You can control who can use each block, including default WordPress blocks.', 'advanced-gutenberg'
                            ),
                            'default' => 1,
                            'access' => true
                        ],
                        [
                            'name' => 'block_extend',
                            'title' => sprintf(
                                __( 'Extend supported blocks %sBeta%s', 'advanced-gutenberg' ),
                                '<span class="advgb-label-beta">',
                                '</span>'
                            ),
                            'description' => __(
                                ' If some blocks are not listed in Block access, try enabling this feature and be sure all the blocks are saved.', 'advanced-gutenberg'
                            ),
                            'default' => 0,
                            'access' => true
                        ],
                        [
                            'name' => 'enable_custom_styles',
                            'title' => __( 'Custom styles', 'advanced-gutenberg' ),
                            'description' => __(
                                'You can add your own CSS styles for your blocks. Anyone editing posts can quickly add the styles to blocks.', 'advanced-gutenberg'
                            ),
                            'default' => 1,
                            'access' => true
                        ],
                        [
                            'name' => 'enable_advgb_blocks',
                            'title' => __( 'PublishPress blocks', 'advanced-gutenberg' ),
                            'description' => __(
                                'If disabled, blocks from PublishPress Blocks plugin won\'t be available.', 'advanced-gutenberg'
                            ),
                            'default' => 1,
                            'access' => true
                        ],
                        [
                            'name' => 'enable_core_blocks_features',
                            'title' => __( 'Core blocks features', 'advanced-gutenberg' ),
                            'description' => __(
                                'Add Google Font support to core Paragraph and Heading blocks.', 'advanced-gutenberg'
                            ),
                            'default' => 1,
                            'access' => $isPro // Feature available on pro only. In free we display a placeholder.
                        ]
                    ];

                    $this->featuresBoxes( $features );
                    ?>
                </div>
            </div><!-- .pp-column-left -->

            <?php if( ! defined( 'ADVANCED_GUTENBERG_PRO' ) ) : ?>
                <div class="pp-column-right">
                    <?php
        			$banners = new PublishPress\WordPressBanners\BannersMain;
        			$banners->pp_display_banner(
        			    '',
        			    __( 'PublishPress Blocks Pro', 'advanced-gutenberg' ),
        			    [
                            __(
                                'The Pro version comes with faster support and all the features you need to super-charge the WordPress block editor.',
                                'advanced-gutenberg'
                            )
                        ],
        			    'https://publishpress.com/links/blocks-banner',
        			    __( 'Upgrade to Pro', 'advanced-gutenberg' ),
        				'',
        				'button pp-button-yellow'
        			);
        			?>
                </div><!-- .pp-column-right -->
            <?php endif; ?>

        </div>
    </div>
</div>
