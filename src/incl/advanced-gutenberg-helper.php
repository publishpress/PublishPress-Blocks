<?php
defined('ABSPATH') || die;

/**
 * Helper class of Gutenberg Advanced
 */
class AdvancedGutenbergHelper
{

    /**
     * Load media files and inline CSS for Adv. Icon Block
     *
     * Since    2.4.2
     * @param   $blockAttrs The block attributes
     * @return  string      Inline CSS
     */
    public static function advgbIconCss($blockAttrs) {
        wp_enqueue_style('material_icon_font');
        $block_id = $blockAttrs['blockIDX'];
        $i = 0;
        $default_items = array();
        $item = array(
            'icon' => 'info',
            'iconType' => 'material',
            'size' => 120,
            'color' => '#111111',
            'style' => 'default',
            'bgColor' => '',
            'borderColor' => '#111',
            'borderSize' => 2,
            'borderRadius' => 0,
            'paddingTop' => 20,
            'paddingBottom' => 20,
            'paddingLeft' => 20,
            'paddingRight' => 20,
            'marginTop' => 0,
            'marginBottom' => 0,
            'marginLeft' => 0,
            'marginRight' => 0,
            'paddingUnit' => 'px',
            'marginUnit' => 'px',
            'link' => '',
            'linkTarget' => '_self',
            'title' => ''
        );
        while ($i < 10) {
            array_push($default_items, $item);
            $i++;
        }
        $items = !isset($blockAttrs['items']) ? $default_items : $blockAttrs['items'];
        $text_align = !isset($blockAttrs['tAlign']) ? 'center' : $blockAttrs['tAlign'];

        $style_html = '#' . $block_id . ' .advgb-icons, .' . $block_id . ' .advgb-icons {';
        $style_html .= 'text-align: ' . $text_align . ';';
        $style_html .= '}';

        foreach ($items as $k => $item) {
            $style_html .= '#' . $block_id . ' .advgb-item-' . $k . ' .advgb-icon, .' . $block_id . ' .advgb-item-' . $k . ' .advgb-icon {';
            $style_html .= 'display: flex;';
            $style_html .= 'align-items:center;';

            $style_html .= 'margin-top: ' . $item['marginTop'] . $item['marginUnit'] . ';';
            $style_html .= 'margin-bottom: ' . $item['marginBottom'] . $item['marginUnit'] . ';';
            $style_html .= 'margin-left: ' . $item['marginLeft'] . $item['marginUnit'] . ';';
            $style_html .= 'margin-right: ' . $item['marginRight'] . $item['marginUnit'] . ';';

            $style_html .= $item['style'] === 'default' ? 'padding-top: 0;' : 'padding-top: ' . $item['paddingTop'] . $item['paddingUnit'] . ';';
            $style_html .= $item['style'] === 'default' ? 'padding-bottom: 0;' : 'padding-bottom: ' . $item['paddingBottom'] . $item['paddingUnit'] . ';';
            $style_html .= $item['style'] === 'default' ? 'padding-left: 0;' : 'padding-left: ' . $item['paddingLeft'] . $item['paddingUnit'] . ';';
            $style_html .= $item['style'] === 'default' ? 'padding-right: 0;' : 'padding-right: ' . $item['paddingRight'] . $item['paddingUnit'] . ';';

            $style_html .= $item['style'] === 'default' ? 'border-width: 0;' : 'border-width: ' . $item['borderSize'] . 'px;';
            $style_html .= 'border-style: solid;';
            $style_html .= 'border-color: ' . $item['borderColor'] . ';';
            $style_html .= 'border-radius: ' . $item['borderRadius'] . '%;';

            $style_html .= isset($item['bgColor']) ? 'background-color: ' . $item['bgColor'] . ';' : 'background-color: transparent;';

            $style_html .= '}';

            $style_html .= '#' . $block_id . ' .advgb-item-' . $k . ' .advgb-icon > i, .' . $block_id . ' .advgb-item-' . $k . ' .advgb-icon > i{';
            $style_html .= 'font-size: ' . $item['size'] . 'px;';
            $style_html .= 'color: ' . $item['color'] . ';';
            $style_html .= '}';
        }

        return $style_html;
    }
}