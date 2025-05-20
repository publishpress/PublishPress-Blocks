jQuery(document).ready(function ($) {
    // Fix display of tab headers in mobile view for existing content for https://github.com/publishpress/PublishPress-Blocks/issues/1483
    $('.advgb-tabs-wrapper').each(function() {
        var $wrapper = $(this);
        var activeTab = parseInt($wrapper.data('tab-active')) || 0;
        var $containers = $wrapper.find('.advgb-tab-body-container');

        $containers.each(function(index) {
            var $container = $(this);
            var $body = $container.find('.advgb-tab-body');
            var $header = $container.find('.advgb-tab-body-header');

            // Remove display:none from all containers
            if ($container.css('display') === 'none') {
                $container.css('display', '');
            }

            // Set display for inner tab bodies based on active tab
            if (index === activeTab) {
                $body.css('display', 'block');
                $header.addClass('header-active');
            } else {
                $body.css('display', 'none');
                $header.removeClass('header-active');
            }
        });
    });


    $(".advgb-tab a:not(.ui-tabs-anchor)").unbind("click");
    $(".advgb-tabs-block").tabs();

    $('.advgb-tabs-wrapper').each(function () {
        var $wrapper = $(this);
        var activeTab = parseInt($wrapper.data('tab-active')) || 0;
        var tabs = $wrapper.find('.advgb-tab');
        var tabControls = $wrapper.find('.advgb-tab a, .advgb-tab button');
        var bodyHeaders = $wrapper.find('.advgb-tab-body-header');
        var bodyContainers = $wrapper.find('.advgb-tab-body-container');

        // Get styles from first incative tab
        var inactiveTab = $(this).find('li.advgb-tab:not(".advgb-tab-active")');
        if($(this).prop('id') !== '') {
            inactiveTab = $(this).find('li.advgb-tab:not(".ui-state-active")');
        }
        var tabStyles = {
            bgColor: inactiveTab.css('background-color'),
            borderColor: inactiveTab.css('border-color'),
            borderWidth: inactiveTab.css('border-width'),
            borderStyle: inactiveTab.css('border-style'),
            borderRadius: inactiveTab.css('border-radius'),
            textColor: inactiveTab.find('a, button').css('color')
        };

        // Unified click handler for both <a> and <button> tabs
        tabs.on('click', 'a, button', function(event) {
            event.preventDefault();
            var $control = $(this);
            var $currentTab = $control.closest('.advgb-tab');
            var panelId = $control.attr('aria-controls') || $control.attr('href').replace('#', '');

            tabs.removeClass('advgb-tab-active');
            $currentTab.addClass('advgb-tab-active');
            bodyContainers.find('.advgb-tab-body').hide();

            // Find target panel (supports multiple formats for legacy purpose)
            var $targetPanel = $wrapper.find(
                '#' + panelId + ', ' +
                '[aria-labelledby="' + panelId + '"], ' +
                '[id="' + panelId + '"]'
            ).closest('.advgb-tab-body-container');

            if ($targetPanel.length) {
                $targetPanel.find('.advgb-tab-body').show();

                // IMAGE SLIDER REFRESH
                if ($targetPanel.find('.advgb-images-slider-block').length && $.fn.slick) {
                    $targetPanel.find('.advgb-images-slider-block > .slick-initialized').slick(
                        'slickSetOption',
                        'refresh',
                        true,
                        true
                    );
                }
            } else {
                // Fallback to index-based activation
                bodyContainers.eq(tabs.index($currentTab)).find('.advgb-tab-body').show();
            }

            // Update headers
            bodyHeaders.removeClass('header-active');
            bodyHeaders.eq(tabs.index($currentTab)).addClass('header-active');
        });

        // Initialize active tab
        if (tabs.length > 0) {
            var $initialTab = tabs.eq(activeTab);
            var $initialControl = $initialTab.find('a, button').first();

            if ($initialControl.length) {
                $initialControl.trigger('click');
            }

            // Apply header styles
            bodyHeaders.css({
                backgroundColor: tabStyles.bgColor,
                color: tabStyles.textColor,
                borderColor: tabStyles.borderColor,
                borderWidth: tabStyles.borderWidth,
                borderStyle: tabStyles.borderStyle,
                borderRadius: tabStyles.borderRadius
            });
        }
    });

    $('.advgb-tab-body-header').click(function() {
        var $header = $(this);
        var bodyContainer = $header.closest('.advgb-tab-body-container');
        var tabsWrapper = $header.closest('.advgb-tabs-wrapper');
        var tabs = tabsWrapper.find('.advgb-tab');
        var idx = tabsWrapper.find('.advgb-tab-body-container').index(bodyContainer);

        tabsWrapper.find('.advgb-tab-body-header').removeClass('header-active');
        $header.addClass('header-active');
        tabs.eq(idx).find('a, button').first().trigger('click');
    });
});