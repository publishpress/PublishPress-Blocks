(function ( $ ) {
    var { __, _x, _n, _nx } = wp.i18n;

    $.expr[":"].contains = $.expr.createPseudo(function (arg) {
        return function ( elem ) {
            return $(elem).text().toLowerCase().indexOf(arg.toLowerCase()) >= 0;
        };
    });

    $('.advgb-feature-box--disabled, .slider--disabled').bind( 'click', function(e) {
        e.preventDefault();
        window.open( 'https://publishpress.com/links/blocks-banner' );
    });

    // Toggle to save a single feature at the time
    $('.advgb-feature-setting .slider').bind( 'click', function(e) {
        try {
            e.preventDefault();

            // Don't execute in placeholder switch
            if( $(this).hasClass('slider--disabled') ) {
                return false;
            }

            var checkbox    = $(this).parent().find('input');
            var isChecked   = checkbox.is(':checked') ? 1 : 0;
            var newState    = isChecked == 1 ? 0 : 1; // Since is a toggle, we revert the state
            var feature     = checkbox.data('feature');
            var slider      = checkbox.parent().find('.slider');
            $.ajax({
                url: advgb_main_dashboard.ajaxurl,
                method: 'POST',
                data: {
                    action: 'advgb_feature_save',
                    feature: feature,
                    new_state: newState,
                    nonce: advgb_main_dashboard.nonce
                },
                beforeSend: function(){
                  slider.css('opacity', 0.5);
                },
                success: function(){
                    newState == 1 ? checkbox.prop('checked', true) : checkbox.prop('checked', false);
                    slider.css('opacity', 1);

                    // Dynamic submenu display/hide
                    var pMenu = $('#toplevel_page_advgb_main');

                    switch(feature) {
                        case 'enable_block_access':
                            advgbDynamicSubmenu(
                                'advgb_block_access',
                                newState
                            );
                        break;
                        case 'enable_advgb_blocks':
                            advgbDynamicSubmenu(
                                'advgb_block_settings',
                                newState
                            );
                        break;
                        case 'enable_custom_styles':
                            advgbDynamicSubmenu(
                                'advgb_custom_styles',
                                newState
                            );
                        break;
                        case 'block_controls':
                            advgbDynamicSubmenu(
                                'advgb_block_controls',
                                newState
                            );
                        break;
                        case 'reusable_blocks':
                            advgbDynamicSubmenu(
                                '[class*="wp_block"]', // For 'edit.php?post_type=wp_block' class
                                newState,
                                true
                            );
                        break;
                        case 'enable_block_usage':
                            advgbDynamicSubmenu(
                                'advgb_block_usage',
                                newState
                            );
                        break;
                    }

                    statusMsgNotification = advgbTimerStatus();
                },
                error: function(jqXHR, textStatus, errorThrown){
                    console.error(jqXHR.responseText);
                    statusMsgNotification = advgbTimerStatus( 'error' );
                }
            });
        } catch(e) {
            console.error(e);
        }
    });

    function advgbTimerStatus( type = 'success' ) {

        setTimeout( function() {
            var uniqueClass = 'advgb-floating-msg-' + Math.round(new Date().getTime() + (Math.random() * 100));
            var message = type === 'success'
                ? __( 'Changes saved!', 'advanced-gutenberg' )
                : __( ' Error: changes can\'t be saved.', 'advanced-gutenberg' );
            var instances = $( '.advgb-floating-status' ).length;
            $('#wpbody-content').after(
                '<span class="advgb-floating-status advgb-floating-status--' + type + ' ' + uniqueClass + '">'
                    + message
                + '</span>'
            );
            $( '.' + uniqueClass ).css( 'bottom', instances * 45 ).fadeIn(1000).delay(10000).fadeOut(1000, function() { $(this).remove() });
        }, 500);
    }

    /**
     * Dynamically show/hide admin submenu
     *
     * @since 3.1.3 - Added attrSelector param
     *
     * @param {string}  slug            Page slug
     * @param {string}  newState        New feature state
     * @param {string}  attrSelector    When the <li> class requires to use an attribute selector. e.g. class 'edit.php?post_type=wp_block' => [class*="wp_block"]
     */
    function advgbDynamicSubmenu( slug, newState, attrSelector = false ) {
        var pMenu       = $('#toplevel_page_advgb_main');
        var cSubmenu    = ! attrSelector
                            ? $(pMenu).find('li.' + slug + '-menu-item')
                            : $(pMenu).find('li' + slug);

        // Check if submenu exists and show/hide
        if(cSubmenu.length) {
            newState == 1
                ? cSubmenu.removeClass( 'advgb-hide-menu-item' ).find('a').removeClass( 'advgb-hide-menu-item' )
                : cSubmenu.addClass( 'advgb-hide-menu-item' ).find('a').addClass( 'advgb-hide-menu-item' );
        }
    }

})(jQuery);

// Get cookie - custom styles
function advgbGetCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length,c.length);
    }
    return "";
}

/**
 * Output categories and blocks inside a form and add filters functionality
 *
 * @param {array}   inactive_blocks The inactive blocks - e.g. advgbCUserRole.access.inactive_blocks
 * @param {string}  nonce_field_id  The nonce field id - e.g. '#advgb_access_nonce_field'
 * @param {string}  page            The feature page - e.g. 'advgb_block_access' from admin.php?page=advgb_block_access
 * @param {array}  exclude_blocks   Blocks to exclude from appearing in the feature form (is different to inactive_blocks!). e.g. ['core/paragraph','core/list'] - @since 3.1.0
 */
function advgbGetBlocksFeature( inactive_blocks, nonce_field_id, page, exclude_blocks = [] ) {
    if (typeof wp.blocks !== 'undefined') {
        if (wp.blockLibrary && typeof wp.blockLibrary.registerCoreBlocks === 'function') {
            wp.blockLibrary.registerCoreBlocks();
        }

        var $ = jQuery;
        var allBlocks = wp.blocks.getBlockTypes();
        var allCategories = wp.blocks.getCategories();
        var listBlocks = [];
        var nonce = '';

        // Get blocks saved in advgb_blocks_list option to include the ones that are missing in allBlocks.
        // e.g. blocks registered only via PHP
        if(
            typeof advgbBlocks.block_extend !== 'undefined'
            && parseInt(advgbBlocks.block_extend)
            && typeof advgb_blocks_list !== 'undefined'
            && advgb_blocks_list.length > 0
        ) {
            let diff_blocks = advgb_blocks_list.filter(
                blocksA => !allBlocks.some( blocksB => blocksA.name === blocksB.name )
            );
            if( diff_blocks.length > 0 ) {
                diff_blocks.forEach(function (block) {
                    allBlocks.push(block);
                });
            }
        }

        // Array of block names already available through wp.blocks.getBlockTypes()
        var force_deactivate_blocks = []; // 'advgb/container'

        /* Blocks not available through wp.blocks.getBlockTypes()
         * As example: the ones that loads only in Appearance > Widget
         * and we don't allow to disable
         *
         * Removed 'core/legacy-widget' as forced active block - Since 3.1.5
         */
        var force_activate_blocks = [
             {
               'name': 'core/widget-group',
               'icon': 'block-default',
               'title': 'Widget Group',
               'category': 'widgets'
             },
        ];
        force_activate_blocks.forEach(function (block) {
            allBlocks.push(block);
        });

        /* Blocks not available through wp.blocks.getBlockTypes() - Since 3.1.5
         * As example: the ones that loads only in Appearance > Widget
         * and we allow to enable/disable (different to force_activate_blocks var)
         */
        var include_blocks = [
            {
                'name': 'core/legacy-widget',
                'icon': 'block-default',
                'title': 'Legacy Widget',
                'category': 'widgets'
            }
        ];
        include_blocks.forEach(function (block) {
            allBlocks.push(block);
        });

        allBlocks.forEach(function (block) {
            var blockItemIcon = '';
            var blockItem = {
                name: block.name,
                icon: block.icon.src || block.icon,
                title: block.title,
                category: block.category,
                parent: block.parent
            };

            var savedIcon = !!block.icon.src ? block.icon.src : block.icon;

            if (block.icon.foreground !== undefined) blockItem.iconColor = block.icon.foreground;

            if (typeof savedIcon === 'function') {
                if(typeof savedIcon.prototype !== 'undefined') {
                    blockItem.icon = wp.element.renderToString(wp.element.createElement(savedIcon));
                    blockItem.icon = blockItem.icon.replace(/stopcolor/g, 'stop-color');
                    blockItem.icon = blockItem.icon.replace(/stopopacity/g, 'stop-opacity');
                } else {
                    blockItemIcon = wp.element.createElement(wp.components.Dashicon, {icon: 'block-default'});
                    blockItem.icon = wp.element.renderToString(blockItemIcon);
                }
            } else if (typeof savedIcon === 'object') {
                blockItem.icon = wp.element.renderToString(savedIcon);
                blockItem.icon = blockItem.icon.replace(/stopcolor/g, 'stop-color');
                blockItem.icon = blockItem.icon.replace(/stopopacity/g, 'stop-opacity');
            } else if (
                typeof savedIcon === 'string'
                && !savedIcon.includes('<span') // Merged blocks icons from 'advgb_blocks_list' are stored as html
                && !savedIcon.includes('<svg') // Merged blocks icons from 'advgb_blocks_list' are stored as html
            ) {
                blockItemIcon = wp.element.createElement(wp.components.Dashicon, {icon: savedIcon});
                blockItem.icon = wp.element.renderToString(blockItemIcon);
            } else {
                blockItem.icon = savedIcon; // Pure html for merged blocks icons from 'advgb_blocks_list'
            }

            listBlocks.push(blockItem);
            return block;
        });

        if (typeof updateListNonce !== 'undefined') {
            nonce = updateListNonce.nonce;
        } else {
            nonce = $(nonce_field_id).val();
        }

        // Update categories
        allCategories.forEach(function (category) {
            var categoryBlock = $('.category-block[data-category="'+ category.slug +'"]');
            if (categoryBlock.length > 0) {
                categoryBlock.find('h3.category-name').text(category.title);
            } else {
                var categoryHTML = '';
                categoryHTML += '<div class="category-block clearfix" data-category='+ category.slug +'>';
                categoryHTML +=     '<h3 class="category-name">';
                categoryHTML +=         '<span>'+ category.title +'</span>';
                categoryHTML +=         '<i class="mi"></i>';
                categoryHTML +=     '</h3>';
                categoryHTML +=     '<ul class="blocks-list"></ul>';
                categoryHTML += '</div>';

                $('.blocks-section').append(categoryHTML);
            }
        });

        var list_blocks_names = [];

        /* Remove duplicated blocks by block name, just in case - Since 3.1.5
         * e.g. when Extended supported block is enabled, 'core/legacy-widget'
         * and 'core/widget-group' are duplicated.
         */
        var uniqueNames = [];
        var i = listBlocks.length;
        while ( i-- ) {
            var name = listBlocks[i].name;
            if( uniqueNames.includes( name ) ) {
                listBlocks.splice( i, 1 );
            } else {
                uniqueNames.push( name );
            }
        }

        // Update blocks
        listBlocks.forEach(function (block) {

            // Exclude block
            if( exclude_blocks.length > 0 && exclude_blocks.indexOf(block.name) >= 0 ) {
                return;
            }

            list_blocks_names.push(block.name);

            var blockHTML = '';
            blockHTML += '<li class="block-item advgb-settings-option ' + (force_deactivate_blocks.indexOf(block.name) > -1 || force_activate_blocks.find(item => item.name === block.name) ? 'block-item-readonly' : 'block-item-editable' ) + '" data-type="'+ block.name +'">';
            blockHTML +=    '<label for="'+ block.name +'" class="advgb-setting-label">';
            blockHTML +=        '<span class="block-icon"';
            if (block.iconColor) {
                blockHTML += ' style="color:'+ block.iconColor +'"';
            }
            blockHTML += '>';
            blockHTML += block.icon;
            var checked = '';

            if ( typeof inactive_blocks === 'object' && inactive_blocks !== null ) {
                checked = inactive_blocks.indexOf(block.name) === -1
                        ? 'checked="checked"' : '';
            } else {
                checked = 'checked="checked"';
            }

            // See if block is forced to be active or deactive
            if( force_deactivate_blocks.indexOf(block.name) >= 0 ) {
                checked = '';
            } else if( force_activate_blocks.find(item => item.name === block.name) ) {
                checked = 'checked="checked"';
            } else {
                // Nothing to do here
            }

            blockHTML +=        '</span>';
            blockHTML +=        '<span class="block-title">'+ block.title +'</span>';
            blockHTML +=    '</label>';
            blockHTML +=    '<div class="advgb-switch-button">';
            blockHTML +=        '<label class="switch">';
            blockHTML +=            '<input id="'+ block.name +'" type="checkbox" name="active_blocks[]" value="'+ block.name +'" '+checked+' ' + ( force_deactivate_blocks.indexOf(block.name) > -1 || force_activate_blocks.find(item => item.name === block.name) ? 'onclick="return false;"' : '' ) + '/>';
            blockHTML +=            '<span class="slider"></span>';
            blockHTML +=        '</label>';
            blockHTML +=    '</div>';
            blockHTML += '</li>';

            var categoryBlock = $('.category-block[data-category="'+ block.category +'"]');
            categoryBlock.find('.blocks-list').append(blockHTML);

        });

        $('#blocks_list').val(JSON.stringify(list_blocks_names));

        // Toggle blocks list in category when click category title
        $('.category-block .category-name').unbind('click').click(function () {
            var categoryWrapper = $(this).closest('.category-block');

            if (categoryWrapper.hasClass('collapsed')) {
                categoryWrapper.removeClass('collapsed');
            } else {
                categoryWrapper.addClass('collapsed');
            }
        });

        // Set "Enable or disable all blocks" as enabled for not saved user roles
        var feature = $('#advgb_feature').val();
        if( typeof feature !== 'undefined' &&
            ! advgbCUserRole[feature].active_blocks.length &&
            ! advgbCUserRole[feature].inactive_blocks.length
        ) {
            $('#toggle_all_blocks').prop('checked', true);
        }

        // Search blocks function
        $('.blocks-search-input').on('input', function () {
            var searchKey = $(this).val().trim().toLowerCase();

            $('.block-item .block-title').each(function () {
                var blockTitle = $(this).text().toLowerCase().trim(),
                    blockItem = $(this).closest('.block-item');

                if (blockTitle.indexOf(searchKey) > -1) {
                    blockItem.show();
                } else {
                    blockItem.hide();
                }
            });
        });

        // On change user role dropdown
        $('#user_role').on( 'change', function(){
            window.location = 'admin.php?page=' + page + '&user_role=' + $(this).val();
        });

        // Check/Uncheck all
        $('#toggle_all_blocks').click(function () {
            $('.block-item-editable input').prop('checked', $(this).prop('checked'));
            saveButtonStatus();
        });

        // Enable save when at least one block is enabled
        $('.block-item-editable input').click(function () {
            saveButtonStatus();
        });

        // Show warning and disable save button if all blocks are disabled
        var saveButtonStatus = function() {
            if( $('.block-item-editable input:checked').length === 0 ) {
                $('.advgb-enable-one-block-msg').css('display', 'inline-block');
                $('.save-profile-button').prop('disabled', true);
            } else {
                $('.advgb-enable-one-block-msg').css('display', 'none');
                $('.save-profile-button').prop('disabled', false);
            }
        }

        $('.advgb-block-feature-loading-msg').hide();
    }
}

/**
 * Output categories and blocks inside a form and add filters functionality for Block controls page
 *
 * @param {array}   inactive_blocks The inactive blocks - e.g. advgbBlockControls.inactive_blocks
 * @param {string}  nonce_field_id  The nonce field id - e.g. '#advgb_access_nonce_field'
 * @param {string}  page            The feature page - e.g. 'advgb_block_access' from admin.php?page=advgb_block_access
 * @param {array}  exclude_blocks   Blocks to exclude from appearing in the feature form (is different to inactive_blocks!). e.g. ['core/paragraph','core/list'] - @since 3.1.0
 */
function advgbGetBlockControls( inactive_blocks, nonce_field_id, page, exclude_blocks = [] ) {
    if (typeof wp.blocks !== 'undefined') {
        if (wp.blockLibrary && typeof wp.blockLibrary.registerCoreBlocks === 'function') {
            wp.blockLibrary.registerCoreBlocks();
        }

        var $ = jQuery;
        var allBlocks = wp.blocks.getBlockTypes();
        var allCategories = wp.blocks.getCategories();
        var listBlocks = [];
        var nonce = '';

        // Get blocks saved in advgb_blocks_list option to include the ones that are missing in allBlocks.
        // e.g. blocks registered only via PHP
        if(
            typeof advgbBlocks.block_extend !== 'undefined'
            && parseInt(advgbBlocks.block_extend)
            && typeof advgb_blocks_list !== 'undefined'
            && advgb_blocks_list.length > 0
        ) {
            let diff_blocks = advgb_blocks_list.filter(
                blocksA => !allBlocks.some( blocksB => blocksA.name === blocksB.name )
            );
            if( diff_blocks.length > 0 ) {
                diff_blocks.forEach(function (block) {
                    allBlocks.push(block);
                });
            }
        }

        // Array of block names already available through wp.blocks.getBlockTypes()
        var force_deactivate_blocks = []; // 'advgb/container'

        // Array of objects not available through wp.blocks.getBlockTypes()
        // As example: the ones that loads only in Appearance > Widget
        var force_activate_blocks = [
            {
              'name': 'core/legacy-widget',
              'icon': 'block-default',
              'title': 'Legacy Widget',
              'category': 'widgets'
            }
        ];

        // Include force_activate_blocks in the blocks list
        force_activate_blocks.forEach(function (block) {
            allBlocks.push(block);
        });

        allBlocks.forEach(function (block) {
            var blockItemIcon = '';
            var blockItem = {
                name: block.name,
                icon: block.icon.src || block.icon,
                title: block.title,
                category: block.category,
                parent: block.parent
            };

            var savedIcon = !!block.icon.src ? block.icon.src : block.icon;

            if (block.icon.foreground !== undefined) blockItem.iconColor = block.icon.foreground;

            if (typeof savedIcon === 'function') {
                if(typeof savedIcon.prototype !== 'undefined') {
                    blockItem.icon = wp.element.renderToString(wp.element.createElement(savedIcon));
                    blockItem.icon = blockItem.icon.replace(/stopcolor/g, 'stop-color');
                    blockItem.icon = blockItem.icon.replace(/stopopacity/g, 'stop-opacity');
                } else {
                    blockItemIcon = wp.element.createElement(wp.components.Dashicon, {icon: 'block-default'});
                    blockItem.icon = wp.element.renderToString(blockItemIcon);
                }
            } else if (typeof savedIcon === 'object') {
                blockItem.icon = wp.element.renderToString(savedIcon);
                blockItem.icon = blockItem.icon.replace(/stopcolor/g, 'stop-color');
                blockItem.icon = blockItem.icon.replace(/stopopacity/g, 'stop-opacity');
            } else if (
                typeof savedIcon === 'string'
                && !savedIcon.includes('<span') // Merged blocks icons from 'advgb_blocks_list' are stored as html
                && !savedIcon.includes('<svg') // Merged blocks icons from 'advgb_blocks_list' are stored as html
            ) {
                blockItemIcon = wp.element.createElement(wp.components.Dashicon, {icon: savedIcon});
                blockItem.icon = wp.element.renderToString(blockItemIcon);
            } else {
                blockItem.icon = savedIcon; // Pure html for merged blocks icons from 'advgb_blocks_list'
            }

            listBlocks.push(blockItem);
            return block;
        });

        if (typeof updateListNonce !== 'undefined') {
            nonce = updateListNonce.nonce;
        } else {
            nonce = $(nonce_field_id).val();
        }

        // Update categories
        allCategories.forEach(function (category) {
            var categoryBlock = $('.category-block[data-category="'+ category.slug +'"]');
            if (categoryBlock.length > 0) {
                categoryBlock.find('h3.category-name').text(category.title);
            } else {
                var categoryHTML = '';
                categoryHTML += '<div class="category-block clearfix" data-category='+ category.slug +'>';
                categoryHTML +=     '<h3 class="category-name">';
                categoryHTML +=         '<span>'+ category.title +'</span>';
                categoryHTML +=         '<i class="mi"></i>';
                categoryHTML +=     '</h3>';
                categoryHTML +=     '<ul class="blocks-list"></ul>';
                categoryHTML += '</div>';

                $('.blocks-section').append(categoryHTML);
            }
        });

        var list_blocks_names = [];

        // @TODO - Maybe remove duplicated blocks by block name? - Same as in advgbGetBlocksFeature()

        // Update blocks
        listBlocks.forEach(function (block) {

            // Exclude block
            if( exclude_blocks.length > 0 && exclude_blocks.indexOf(block.name) >= 0 ) {
                return;
            }

            list_blocks_names.push(block.name);

            var blockHTML = '';
            blockHTML += '<li class="block-item advgb-settings-option ' + (force_deactivate_blocks.indexOf(block.name) > -1 || force_activate_blocks.find(item => item.name === block.name) ? 'block-item-readonly' : 'block-item-editable' ) + '" data-type="'+ block.name +'">';
            blockHTML +=    '<label for="'+ block.name +'" class="advgb-setting-label">';
            blockHTML +=        '<span class="block-icon"';
            if (block.iconColor) {
                blockHTML += ' style="color:'+ block.iconColor +'"';
            }
            blockHTML += '>';
            blockHTML += block.icon;
            var checked = '';

            if ( typeof inactive_blocks === 'object' && inactive_blocks !== null ) {
                checked = inactive_blocks.indexOf(block.name) === -1
                        ? 'checked="checked"' : '';
            } else {
                checked = 'checked="checked"';
            }

            // See if block is forced to be active or deactive
            if( force_deactivate_blocks.indexOf(block.name) >= 0 ) {
                checked = '';
            } else if( force_activate_blocks.find(item => item.name === block.name) ) {
                checked = 'checked="checked"';
            } else {
                // Nothing to do here
            }

            blockHTML +=        '</span>';
            blockHTML +=        '<span class="block-title">'+ block.title +'</span>';
            blockHTML +=    '</label>';
            blockHTML +=    '<div class="advgb-switch-button">';
            blockHTML +=        '<label class="switch">';
            blockHTML +=            '<input id="'+ block.name +'" type="checkbox" name="active_blocks[]" value="'+ block.name +'" '+checked+' ' + ( force_deactivate_blocks.indexOf(block.name) > -1 || force_activate_blocks.find(item => item.name === block.name) ? 'onclick="return false;"' : '' ) + '/>';
            blockHTML +=            '<span class="slider"></span>';
            blockHTML +=        '</label>';
            blockHTML +=    '</div>';
            blockHTML += '</li>';

            var categoryBlock = $('.category-block[data-category="'+ block.category +'"]');
            categoryBlock.find('.blocks-list').append(blockHTML);

        });

        $('#blocks_list').val(JSON.stringify(list_blocks_names));

        // Toggle blocks list in category when click category title
        $('.category-block .category-name').unbind('click').click(function () {
            var categoryWrapper = $(this).closest('.category-block');

            if (categoryWrapper.hasClass('collapsed')) {
                categoryWrapper.removeClass('collapsed');
            } else {
                categoryWrapper.addClass('collapsed');
            }
        });

        // Set "Enable or disable all blocks" as enabled when block controls are not saved
        if( ! advgb_block_controls_vars.active_blocks.length &&
            ! advgb_block_controls_vars.inactive_blocks.length
        ) {
            $('#toggle_all_blocks').prop('checked', true);
        }

        // Search blocks function
        $('.blocks-search-input').on('input', function () {
            var searchKey = $(this).val().trim().toLowerCase();

            $('.block-item .block-title').each(function () {
                var blockTitle = $(this).text().toLowerCase().trim(),
                    blockItem = $(this).closest('.block-item');

                if (blockTitle.indexOf(searchKey) > -1) {
                    blockItem.show();
                } else {
                    blockItem.hide();
                }
            });
        });

        // Check/Uncheck all
        $('#toggle_all_blocks').click(function () {
            $('.block-item-editable input').prop('checked', $(this).prop('checked'));
            saveButtonStatus();
        });

        // Enable save when at least one block is enabled
        $('.block-item-editable input').click(function () {
            saveButtonStatus();
        });

        // Show warning and disable save button if all blocks are disabled
        var saveButtonStatus = function() {
            if( $('.block-item-editable input:checked').length === 0 ) {
                $('.advgb-enable-one-block-msg').css('display', 'inline-block');
                $('.save-profile-button').prop('disabled', true);
            } else {
                $('.advgb-enable-one-block-msg').css('display', 'none');
                $('.save-profile-button').prop('disabled', false);
            }
        }

        $('.advgb-block-feature-loading-msg').hide();
    }
}
