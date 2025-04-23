jQuery(document).ready(function ($) {
    $(".advgb-tab a:not(.ui-tabs-anchor)").unbind("click");
    $(".advgb-tabs-block").tabs();

    $('.advgb-tabs-wrapper').each(function () {
        var $wrapper = $(this);
        var activeTab = parseInt($wrapper.data('tab-active')) || 0;
        var tabs = $wrapper.find('.advgb-tab');
        var tabControls = $wrapper.find('.advgb-tab a, .advgb-tab button');
        var bodyHeaders = $wrapper.find('.advgb-tab-body-header');
        var bodyContainers = $wrapper.find('.advgb-tab-body-container');

        // Get styles from first tab
        var $firstTab = tabs.first();
        var tabStyles = {
            bgColor: $firstTab.css('background-color'),
            borderColor: $firstTab.css('border-color'),
            borderWidth: $firstTab.css('border-width'),
            borderStyle: $firstTab.css('border-style'),
            borderRadius: $firstTab.css('border-radius'),
            textColor: $firstTab.find('a, button').css('color')
        };

        // Unified click handler for both <a> and <button> tabs
        tabs.on('click', 'a, button', function(event) {
            event.preventDefault();
            var $control = $(this);
            var $currentTab = $control.closest('.advgb-tab');
            var panelId = $control.attr('aria-controls') || $control.attr('href').replace('#', '');

            tabs.removeClass('advgb-tab-active');
            $currentTab.addClass('advgb-tab-active');
            bodyContainers.hide();

            // Find target panel (supports multiple formats for legacy purpose)
            var $targetPanel = $wrapper.find(
                '#' + panelId + ', ' +
                '[aria-labelledby="' + panelId + '"], ' +
                '[id="' + panelId + '"]'
            ).closest('.advgb-tab-body-container');

            if ($targetPanel.length) {
                $targetPanel.show();

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
                bodyContainers.eq(tabs.index($currentTab)).show();
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