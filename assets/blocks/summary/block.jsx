(function ( wpI18n, wpBlocks, wpElement, wpBlockEditor, wpComponents, wpData, wpHooks ) {
    wpBlockEditor = wp.blockEditor || wp.editor;
    const { __ } = wpI18n;
    const { Component, Fragment } = wpElement;
    const { registerBlockType, getBlockContent, createBlock } = wpBlocks;
    const { BlockControls, InspectorControls, InspectorAdvancedControls, PanelColorSettings, BlockAlignmentToolbar } = wpBlockEditor;
    const { IconButton, Placeholder, Button, Toolbar, ToggleControl, TextControl, PanelBody } = wpComponents;
    const { select, dispatch } = wpData;
    const { addFilter } = wpHooks;

    const summaryBlockIcon = (
        <svg height="20" viewBox="2 2 22 22" width="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 17H4v2h10v-2zm6-8H4v2h16V9zM4 15h16v-2H4v2zM4 5v2h16V5H4z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    );

    const  latinMap = {
        'Ã': 'A',
        'Ä‚': 'A',
        'áº®': 'A',
        'áº¶': 'A',
        'áº°': 'A',
        'áº²': 'A',
        'áº´': 'A',
        'Ç': 'A',
        'Ã‚': 'A',
        'áº¤': 'A',
        'áº¬': 'A',
        'áº¦': 'A',
        'áº¨': 'A',
        'áºª': 'A',
        'Ã„': 'A',
        'Çž': 'A',
        'È¦': 'A',
        'Ç ': 'A',
        'áº ': 'A',
        'È€': 'A',
        'Ã€': 'A',
        'áº¢': 'A',
        'È‚': 'A',
        'Ä€': 'A',
        'Ä„': 'A',
        'Ã…': 'A',
        'Çº': 'A',
        'á¸€': 'A',
        'Èº': 'A',
        'Ãƒ': 'A',
        'êœ²': 'AA',
        'Ã†': 'AE',
        'Ç¼': 'AE',
        'Ç¢': 'AE',
        'êœ´': 'AO',
        'êœ¶': 'AU',
        'êœ¸': 'AV',
        'êœº': 'AV',
        'êœ¼': 'AY',
        'á¸‚': 'B',
        'á¸„': 'B',
        'Æ': 'B',
        'á¸†': 'B',
        'Éƒ': 'B',
        'Æ‚': 'B',
        'Ä†': 'C',
        'ÄŒ': 'C',
        'Ã‡': 'C',
        'á¸ˆ': 'C',
        'Äˆ': 'C',
        'ÄŠ': 'C',
        'Æ‡': 'C',
        'È»': 'C',
        'ÄŽ': 'D',
        'á¸': 'D',
        'á¸’': 'D',
        'á¸Š': 'D',
        'á¸Œ': 'D',
        'ÆŠ': 'D',
        'á¸Ž': 'D',
        'Ç²': 'D',
        'Ç…': 'D',
        'Ä': 'D',
        'Æ‹': 'D',
        'Ç±': 'DZ',
        'Ç„': 'DZ',
        'Ã‰': 'E',
        'Ä”': 'E',
        'Äš': 'E',
        'È¨': 'E',
        'á¸œ': 'E',
        'ÃŠ': 'E',
        'áº¾': 'E',
        'á»†': 'E',
        'á»€': 'E',
        'á»‚': 'E',
        'á»„': 'E',
        'á¸˜': 'E',
        'Ã‹': 'E',
        'Ä–': 'E',
        'áº¸': 'E',
        'È„': 'E',
        'Ãˆ': 'E',
        'áºº': 'E',
        'È†': 'E',
        'Ä’': 'E',
        'á¸–': 'E',
        'á¸”': 'E',
        'Ä˜': 'E',
        'É†': 'E',
        'áº¼': 'E',
        'á¸š': 'E',
        'êª': 'ET',
        'á¸ž': 'F',
        'Æ‘': 'F',
        'Ç´': 'G',
        'Äž': 'G',
        'Ç¦': 'G',
        'Ä¢': 'G',
        'Äœ': 'G',
        'Ä ': 'G',
        'Æ“': 'G',
        'á¸ ': 'G',
        'Ç¤': 'G',
        'á¸ª': 'H',
        'Èž': 'H',
        'á¸¨': 'H',
        'Ä¤': 'H',
        'â±§': 'H',
        'á¸¦': 'H',
        'á¸¢': 'H',
        'á¸¤': 'H',
        'Ä¦': 'H',
        'Ã': 'I',
        'Ä¬': 'I',
        'Ç': 'I',
        'ÃŽ': 'I',
        'Ã': 'I',
        'á¸®': 'I',
        'Ä°': 'I',
        'á»Š': 'I',
        'Èˆ': 'I',
        'ÃŒ': 'I',
        'á»ˆ': 'I',
        'ÈŠ': 'I',
        'Äª': 'I',
        'Ä®': 'I',
        'Æ—': 'I',
        'Ä¨': 'I',
        'á¸¬': 'I',
        'ê¹': 'D',
        'ê»': 'F',
        'ê½': 'G',
        'êž‚': 'R',
        'êž„': 'S',
        'êž†': 'T',
        'ê¬': 'IS',
        'Ä´': 'J',
        'Éˆ': 'J',
        'á¸°': 'K',
        'Ç¨': 'K',
        'Ä¶': 'K',
        'â±©': 'K',
        'ê‚': 'K',
        'á¸²': 'K',
        'Æ˜': 'K',
        'á¸´': 'K',
        'ê€': 'K',
        'ê„': 'K',
        'Ä¹': 'L',
        'È½': 'L',
        'Ä½': 'L',
        'Ä»': 'L',
        'á¸¼': 'L',
        'á¸¶': 'L',
        'á¸¸': 'L',
        'â± ': 'L',
        'êˆ': 'L',
        'á¸º': 'L',
        'Ä¿': 'L',
        'â±¢': 'L',
        'Çˆ': 'L',
        'Å': 'L',
        'Ç‡': 'LJ',
        'á¸¾': 'M',
        'á¹€': 'M',
        'á¹‚': 'M',
        'â±®': 'M',
        'Åƒ': 'N',
        'Å‡': 'N',
        'Å…': 'N',
        'á¹Š': 'N',
        'á¹„': 'N',
        'á¹†': 'N',
        'Ç¸': 'N',
        'Æ': 'N',
        'á¹ˆ': 'N',
        'È ': 'N',
        'Ç‹': 'N',
        'Ã‘': 'N',
        'ÇŠ': 'NJ',
        'Ã“': 'O',
        'ÅŽ': 'O',
        'Ç‘': 'O',
        'Ã”': 'O',
        'á»': 'O',
        'á»˜': 'O',
        'á»’': 'O',
        'á»”': 'O',
        'á»–': 'O',
        'Ã–': 'O',
        'Èª': 'O',
        'È®': 'O',
        'È°': 'O',
        'á»Œ': 'O',
        'Å': 'O',
        'ÈŒ': 'O',
        'Ã’': 'O',
        'á»Ž': 'O',
        'Æ ': 'O',
        'á»š': 'O',
        'á»¢': 'O',
        'á»œ': 'O',
        'á»ž': 'O',
        'á» ': 'O',
        'ÈŽ': 'O',
        'êŠ': 'O',
        'êŒ': 'O',
        'ÅŒ': 'O',
        'á¹’': 'O',
        'á¹': 'O',
        'ÆŸ': 'O',
        'Çª': 'O',
        'Ç¬': 'O',
        'Ã˜': 'O',
        'Ç¾': 'O',
        'Ã•': 'O',
        'á¹Œ': 'O',
        'á¹Ž': 'O',
        'È¬': 'O',
        'Æ¢': 'OI',
        'êŽ': 'OO',
        'Æ': 'E',
        'Æ†': 'O',
        'È¢': 'OU',
        'á¹”': 'P',
        'á¹–': 'P',
        'ê’': 'P',
        'Æ¤': 'P',
        'ê”': 'P',
        'â±£': 'P',
        'ê': 'P',
        'ê˜': 'Q',
        'ê–': 'Q',
        'Å”': 'R',
        'Å˜': 'R',
        'Å–': 'R',
        'á¹˜': 'R',
        'á¹š': 'R',
        'á¹œ': 'R',
        'È': 'R',
        'È’': 'R',
        'á¹ž': 'R',
        'ÉŒ': 'R',
        'â±¤': 'R',
        'êœ¾': 'C',
        'ÆŽ': 'E',
        'Åš': 'S',
        'á¹¤': 'S',
        'Å ': 'S',
        'á¹¦': 'S',
        'Åž': 'S',
        'Åœ': 'S',
        'È˜': 'S',
        'á¹ ': 'S',
        'á¹¢': 'S',
        'á¹¨': 'S',
        'áºž': 'SS',
        'Å¤': 'T',
        'Å¢': 'T',
        'á¹°': 'T',
        'Èš': 'T',
        'È¾': 'T',
        'á¹ª': 'T',
        'á¹¬': 'T',
        'Æ¬': 'T',
        'á¹®': 'T',
        'Æ®': 'T',
        'Å¦': 'T',
        'â±¯': 'A',
        'êž€': 'L',
        'Æœ': 'M',
        'É…': 'V',
        'êœ¨': 'TZ',
        'Ãš': 'U',
        'Å¬': 'U',
        'Ç“': 'U',
        'Ã›': 'U',
        'á¹¶': 'U',
        'Ãœ': 'U',
        'Ç—': 'U',
        'Ç™': 'U',
        'Ç›': 'U',
        'Ç•': 'U',
        'á¹²': 'U',
        'á»¤': 'U',
        'Å°': 'U',
        'È”': 'U',
        'Ã™': 'U',
        'á»¦': 'U',
        'Æ¯': 'U',
        'á»¨': 'U',
        'á»°': 'U',
        'á»ª': 'U',
        'á»¬': 'U',
        'á»®': 'U',
        'È–': 'U',
        'Åª': 'U',
        'á¹º': 'U',
        'Å²': 'U',
        'Å®': 'U',
        'Å¨': 'U',
        'á¹¸': 'U',
        'á¹´': 'U',
        'êž': 'V',
        'á¹¾': 'V',
        'Æ²': 'V',
        'á¹¼': 'V',
        'ê ': 'VY',
        'áº‚': 'W',
        'Å´': 'W',
        'áº„': 'W',
        'áº†': 'W',
        'áºˆ': 'W',
        'áº€': 'W',
        'â±²': 'W',
        'áºŒ': 'X',
        'áºŠ': 'X',
        'Ã': 'Y',
        'Å¶': 'Y',
        'Å¸': 'Y',
        'áºŽ': 'Y',
        'á»´': 'Y',
        'á»²': 'Y',
        'Æ³': 'Y',
        'á»¶': 'Y',
        'á»¾': 'Y',
        'È²': 'Y',
        'ÉŽ': 'Y',
        'á»¸': 'Y',
        'Å¹': 'Z',
        'Å½': 'Z',
        'áº': 'Z',
        'â±«': 'Z',
        'Å»': 'Z',
        'áº’': 'Z',
        'È¤': 'Z',
        'áº”': 'Z',
        'Æµ': 'Z',
        'Ä²': 'IJ',
        'Å’': 'OE',
        'á´€': 'A',
        'á´': 'AE',
        'Ê™': 'B',
        'á´ƒ': 'B',
        'á´„': 'C',
        'á´…': 'D',
        'á´‡': 'E',
        'êœ°': 'F',
        'É¢': 'G',
        'Ê›': 'G',
        'Êœ': 'H',
        'Éª': 'I',
        'Ê': 'R',
        'á´Š': 'J',
        'á´‹': 'K',
        'ÊŸ': 'L',
        'á´Œ': 'L',
        'á´': 'M',
        'É´': 'N',
        'á´': 'O',
        'É¶': 'OE',
        'á´': 'O',
        'á´•': 'OU',
        'á´˜': 'P',
        'Ê€': 'R',
        'á´Ž': 'N',
        'á´™': 'R',
        'êœ±': 'S',
        'á´›': 'T',
        'â±»': 'E',
        'á´š': 'R',
        'á´œ': 'U',
        'á´ ': 'V',
        'á´¡': 'W',
        'Ê': 'Y',
        'á´¢': 'Z',
        'Ã¡': 'a',
        'Äƒ': 'a',
        'áº¯': 'a',
        'áº·': 'a',
        'áº±': 'a',
        'áº³': 'a',
        'áºµ': 'a',
        'ÇŽ': 'a',
        'Ã¢': 'a',
        'áº¥': 'a',
        'áº­': 'a',
        'áº§': 'a',
        'áº©': 'a',
        'áº«': 'a',
        'Ã¤': 'a',
        'ÇŸ': 'a',
        'È§': 'a',
        'Ç¡': 'a',
        'áº¡': 'a',
        'È': 'a',
        'Ã ': 'a',
        'áº£': 'a',
        'Èƒ': 'a',
        'Ä': 'a',
        'Ä…': 'a',
        'á¶': 'a',
        'áºš': 'a',
        'Ã¥': 'a',
        'Ç»': 'a',
        'á¸': 'a',
        'â±¥': 'a',
        'Ã£': 'a',
        'êœ³': 'aa',
        'Ã¦': 'ae',
        'Ç½': 'ae',
        'Ç£': 'ae',
        'êœµ': 'ao',
        'êœ·': 'au',
        'êœ¹': 'av',
        'êœ»': 'av',
        'êœ½': 'ay',
        'á¸ƒ': 'b',
        'á¸…': 'b',
        'É“': 'b',
        'á¸‡': 'b',
        'áµ¬': 'b',
        'á¶€': 'b',
        'Æ€': 'b',
        'Æƒ': 'b',
        'Éµ': 'o',
        'Ä‡': 'c',
        'Ä': 'c',
        'Ã§': 'c',
        'á¸‰': 'c',
        'Ä‰': 'c',
        'É•': 'c',
        'Ä‹': 'c',
        'Æˆ': 'c',
        'È¼': 'c',
        'Ä': 'd',
        'á¸‘': 'd',
        'á¸“': 'd',
        'È¡': 'd',
        'á¸‹': 'd',
        'á¸': 'd',
        'É—': 'd',
        'á¶‘': 'd',
        'á¸': 'd',
        'áµ­': 'd',
        'á¶': 'd',
        'Ä‘': 'd',
        'É–': 'd',
        'ÆŒ': 'd',
        'Ä±': 'i',
        'È·': 'j',
        'ÉŸ': 'j',
        'Ê„': 'j',
        'Ç³': 'dz',
        'Ç†': 'dz',
        'Ã©': 'e',
        'Ä•': 'e',
        'Ä›': 'e',
        'È©': 'e',
        'á¸': 'e',
        'Ãª': 'e',
        'áº¿': 'e',
        'á»‡': 'e',
        'á»': 'e',
        'á»ƒ': 'e',
        'á»…': 'e',
        'á¸™': 'e',
        'Ã«': 'e',
        'Ä—': 'e',
        'áº¹': 'e',
        'È…': 'e',
        'Ã¨': 'e',
        'áº»': 'e',
        'È‡': 'e',
        'Ä“': 'e',
        'á¸—': 'e',
        'á¸•': 'e',
        'â±¸': 'e',
        'Ä™': 'e',
        'á¶’': 'e',
        'É‡': 'e',
        'áº½': 'e',
        'á¸›': 'e',
        'ê«': 'et',
        'á¸Ÿ': 'f',
        'Æ’': 'f',
        'áµ®': 'f',
        'á¶‚': 'f',
        'Çµ': 'g',
        'ÄŸ': 'g',
        'Ç§': 'g',
        'Ä£': 'g',
        'Ä': 'g',
        'Ä¡': 'g',
        'É ': 'g',
        'á¸¡': 'g',
        'á¶ƒ': 'g',
        'Ç¥': 'g',
        'á¸«': 'h',
        'ÈŸ': 'h',
        'á¸©': 'h',
        'Ä¥': 'h',
        'â±¨': 'h',
        'á¸§': 'h',
        'á¸£': 'h',
        'á¸¥': 'h',
        'É¦': 'h',
        'áº–': 'h',
        'Ä§': 'h',
        'Æ•': 'hv',
        'Ã­': 'i',
        'Ä­': 'i',
        'Ç': 'i',
        'Ã®': 'i',
        'Ã¯': 'i',
        'á¸¯': 'i',
        'á»‹': 'i',
        'È‰': 'i',
        'Ã¬': 'i',
        'á»‰': 'i',
        'È‹': 'i',
        'Ä«': 'i',
        'Ä¯': 'i',
        'á¶–': 'i',
        'É¨': 'i',
        'Ä©': 'i',
        'á¸­': 'i',
        'êº': 'd',
        'ê¼': 'f',
        'áµ¹': 'g',
        'êžƒ': 'r',
        'êž…': 's',
        'êž‡': 't',
        'ê­': 'is',
        'Ç°': 'j',
        'Äµ': 'j',
        'Ê': 'j',
        'É‰': 'j',
        'á¸±': 'k',
        'Ç©': 'k',
        'Ä·': 'k',
        'â±ª': 'k',
        'êƒ': 'k',
        'á¸³': 'k',
        'Æ™': 'k',
        'á¸µ': 'k',
        'á¶„': 'k',
        'ê': 'k',
        'ê…': 'k',
        'Äº': 'l',
        'Æš': 'l',
        'É¬': 'l',
        'Ä¾': 'l',
        'Ä¼': 'l',
        'á¸½': 'l',
        'È´': 'l',
        'á¸·': 'l',
        'á¸¹': 'l',
        'â±¡': 'l',
        'ê‰': 'l',
        'á¸»': 'l',
        'Å€': 'l',
        'É«': 'l',
        'á¶…': 'l',
        'É­': 'l',
        'Å‚': 'l',
        'Ç‰': 'lj',
        'Å¿': 's',
        'áºœ': 's',
        'áº›': 's',
        'áº': 's',
        'á¸¿': 'm',
        'á¹': 'm',
        'á¹ƒ': 'm',
        'É±': 'm',
        'áµ¯': 'm',
        'á¶†': 'm',
        'Å„': 'n',
        'Åˆ': 'n',
        'Å†': 'n',
        'á¹‹': 'n',
        'Èµ': 'n',
        'á¹…': 'n',
        'á¹‡': 'n',
        'Ç¹': 'n',
        'É²': 'n',
        'á¹‰': 'n',
        'Æž': 'n',
        'áµ°': 'n',
        'á¶‡': 'n',
        'É³': 'n',
        'Ã±': 'n',
        'ÇŒ': 'nj',
        'Ã³': 'o',
        'Å': 'o',
        'Ç’': 'o',
        'Ã´': 'o',
        'á»‘': 'o',
        'á»™': 'o',
        'á»“': 'o',
        'á»•': 'o',
        'á»—': 'o',
        'Ã¶': 'o',
        'È«': 'o',
        'È¯': 'o',
        'È±': 'o',
        'á»': 'o',
        'Å‘': 'o',
        'È': 'o',
        'Ã²': 'o',
        'á»': 'o',
        'Æ¡': 'o',
        'á»›': 'o',
        'á»£': 'o',
        'á»': 'o',
        'á»Ÿ': 'o',
        'á»¡': 'o',
        'È': 'o',
        'ê‹': 'o',
        'ê': 'o',
        'â±º': 'o',
        'Å': 'o',
        'á¹“': 'o',
        'á¹‘': 'o',
        'Ç«': 'o',
        'Ç­': 'o',
        'Ã¸': 'o',
        'Ç¿': 'o',
        'Ãµ': 'o',
        'á¹': 'o',
        'á¹': 'o',
        'È­': 'o',
        'Æ£': 'oi',
        'ê': 'oo',
        'É›': 'e',
        'á¶“': 'e',
        'É”': 'o',
        'á¶—': 'o',
        'È£': 'ou',
        'á¹•': 'p',
        'á¹—': 'p',
        'ê“': 'p',
        'Æ¥': 'p',
        'áµ±': 'p',
        'á¶ˆ': 'p',
        'ê•': 'p',
        'áµ½': 'p',
        'ê‘': 'p',
        'ê™': 'q',
        'Ê ': 'q',
        'É‹': 'q',
        'ê—': 'q',
        'Å•': 'r',
        'Å™': 'r',
        'Å—': 'r',
        'á¹™': 'r',
        'á¹›': 'r',
        'á¹': 'r',
        'È‘': 'r',
        'É¾': 'r',
        'áµ³': 'r',
        'È“': 'r',
        'á¹Ÿ': 'r',
        'É¼': 'r',
        'áµ²': 'r',
        'á¶‰': 'r',
        'É': 'r',
        'É½': 'r',
        'â†„': 'c',
        'êœ¿': 'c',
        'É˜': 'e',
        'É¿': 'r',
        'Å›': 's',
        'á¹¥': 's',
        'Å¡': 's',
        'á¹§': 's',
        'ÅŸ': 's',
        'Å': 's',
        'È™': 's',
        'á¹¡': 's',
        'á¹£': 's',
        'á¹©': 's',
        'Ê‚': 's',
        'áµ´': 's',
        'á¶Š': 's',
        'È¿': 's',
        'ÃŸ': 'ss',
        'É¡': 'g',
        'á´‘': 'o',
        'á´“': 'o',
        'á´': 'u',
        'Å¥': 't',
        'Å£': 't',
        'á¹±': 't',
        'È›': 't',
        'È¶': 't',
        'áº—': 't',
        'â±¦': 't',
        'á¹«': 't',
        'á¹­': 't',
        'Æ­': 't',
        'á¹¯': 't',
        'áµµ': 't',
        'Æ«': 't',
        'Êˆ': 't',
        'Å§': 't',
        'áµº': 'th',
        'É': 'a',
        'á´‚': 'ae',
        'Ç': 'e',
        'áµ·': 'g',
        'É¥': 'h',
        'Ê®': 'h',
        'Ê¯': 'h',
        'á´‰': 'i',
        'Êž': 'k',
        'êž': 'l',
        'É¯': 'm',
        'É°': 'm',
        'á´”': 'oe',
        'É¹': 'r',
        'É»': 'r',
        'Éº': 'r',
        'â±¹': 'r',
        'Ê‡': 't',
        'ÊŒ': 'v',
        'Ê': 'w',
        'ÊŽ': 'y',
        'êœ©': 'tz',
        'Ãº': 'u',
        'Å­': 'u',
        'Ç”': 'u',
        'Ã»': 'u',
        'á¹·': 'u',
        'Ã¼': 'u',
        'Ç˜': 'u',
        'Çš': 'u',
        'Çœ': 'u',
        'Ç–': 'u',
        'á¹³': 'u',
        'á»¥': 'u',
        'Å±': 'u',
        'È•': 'u',
        'Ã¹': 'u',
        'á»§': 'u',
        'Æ°': 'u',
        'á»©': 'u',
        'á»±': 'u',
        'á»«': 'u',
        'á»­': 'u',
        'á»¯': 'u',
        'È—': 'u',
        'Å«': 'u',
        'á¹»': 'u',
        'Å³': 'u',
        'á¶™': 'u',
        'Å¯': 'u',
        'Å©': 'u',
        'á¹¹': 'u',
        'á¹µ': 'u',
        'áµ«': 'ue',
        'ê¸': 'um',
        'â±´': 'v',
        'êŸ': 'v',
        'á¹¿': 'v',
        'Ê‹': 'v',
        'á¶Œ': 'v',
        'â±±': 'v',
        'á¹½': 'v',
        'ê¡': 'vy',
        'áºƒ': 'w',
        'Åµ': 'w',
        'áº…': 'w',
        'áº‡': 'w',
        'áº‰': 'w',
        'áº': 'w',
        'â±³': 'w',
        'áº˜': 'w',
        'áº': 'x',
        'áº‹': 'x',
        'á¶': 'x',
        'Ã½': 'y',
        'Å·': 'y',
        'Ã¿': 'y',
        'áº': 'y',
        'á»µ': 'y',
        'á»³': 'y',
        'Æ´': 'y',
        'á»·': 'y',
        'á»¿': 'y',
        'È³': 'y',
        'áº™': 'y',
        'É': 'y',
        'á»¹': 'y',
        'Åº': 'z',
        'Å¾': 'z',
        'áº‘': 'z',
        'Ê‘': 'z',
        'â±¬': 'z',
        'Å¼': 'z',
        'áº“': 'z',
        'È¥': 'z',
        'áº•': 'z',
        'áµ¶': 'z',
        'á¶Ž': 'z',
        'Ê': 'z',
        'Æ¶': 'z',
        'É€': 'z',
        'ï¬€': 'ff',
        'ï¬ƒ': 'ffi',
        'ï¬„': 'ffl',
        'ï¬': 'fi',
        'ï¬‚': 'fl',
        'Ä³': 'ij',
        'Å“': 'oe',
        'ï¬†': 'st',
        'â‚': 'a',
        'â‚‘': 'e',
        'áµ¢': 'i',
        'â±¼': 'j',
        'â‚’': 'o',
        'áµ£': 'r',
        'áµ¤': 'u',
        'áµ¥': 'v',
        'â‚“': 'x',
        'à': 'a',
        'á': 'a',
        'ạ': 'a',
        'ả': 'a',
        'ã': 'a',
        'â': 'a',
        'ầ': 'a',
        'ấ': 'a',
        'ậ': 'a',
        'ẫ': 'a',
        'ă': 'a',
        'ằ': 'a',
        'ắ': 'a',
        'ặ': 'a',
        'ẳ': 'a',
        'ẵ': 'a',
        'è': 'e',
        'é': 'e',
        'ẹ': 'e',
        'ẻ': 'e',
        'ẽ': 'e',
        'ê': 'e',
        'ề': 'e',
        'ế': 'e',
        'ệ': 'e',
        'ể': 'e',
        'ễ': 'e',
        'ì': 'i',
        'í': 'i',
        'ị': 'i',
        'ỉ': 'i',
        'ĩ': 'i',
        'ò': 'o',
        'ó': 'o',
        'ọ': 'o',
        'ỏ': 'o',
        'õ': 'o',
        'ô': 'o',
        'ồ': 'o',
        'ố': 'o',
        'ộ': 'o',
        'ổ': 'o',
        'ỗ': 'o',
        'ơ': 'o',
        'ờ': 'o',
        'ớ': 'o',
        'ợ': 'o',
        'ở': 'o',
        'ỡ': 'o',
        'ù': 'u',
        'ú': 'u',
        'ụ': 'u',
        'ủ': 'u',
        'ũ': 'u',
        'ư': 'u',
        'ừ': 'u',
        'ứ': 'u',
        'ự': 'u',
        'ử': 'u',
        'ữ': 'u',
        'ỳ': 'y',
        'ý': 'y',
        'ỵ': 'y',
        'ỷ': 'y',
        'ỹ': 'y',
        'đ': 'd',
    };

    const previewImageData = 'data:image/png;base64,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';

    const summaryBlockTitle = __( 'Summary', 'advanced-gutenberg' );

    // Add button to insert summary inside table of contents component
    ( function () {
        jQuery( window ).on( 'load', function () {
            if (typeof dispatch( 'core/editor' ) === 'undefined') {
                return false;
            }

            const $ = jQuery;
            const { insertBlock } = dispatch( 'core/editor' );
            const summaryBlock = createBlock( 'advgb/summary' );

            $( '#editor' ).find( '.table-of-contents' ).click( function () {
                const allBlocks = select( 'core/editor' ).getBlocks();
                const summaryBlockExist = !!allBlocks.filter( ( block ) => ( block.name === 'advgb/summary' ) ).length;
                setTimeout( function () {
                    const summaryButton = $(
                        '<button class="button" style="position: absolute; bottom: 10px; right: 15px">'
                        + __( 'Insert Summary', 'advanced-gutenberg' ) +
                        '</button>'
                    );

                    $( '#editor' ).find( '.table-of-contents__popover' ).find( '.document-outline' )
                        .append( summaryButton );
                    summaryButton.unbind( 'click' ).click( function () {
                        insertBlock( summaryBlock, 0 );
                        $('.table-of-contents__popover').hide();
                    } );

                    if (summaryBlockExist) {
                        summaryButton.prop( 'disabled', true );
                    }
                }, 100 )
            } )
        } );
    } )();

    // Add notice for user to refresh summary if manually change heading anchor
    addFilter( 'editor.BlockEdit', 'advgb/addHeadingNotice', function ( BlockEdit ) {
        return ( props ) => {
            const { isSelected, name: blockType, attributes } = props;

            return ( [
                <BlockEdit key="block-edit-summary" {...props} />,
                isSelected && blockType === 'core/heading' && attributes.nodeName !== 'H1' &&
                <InspectorAdvancedControls key="advgb-summary-controls-hint">
                    <p style={{ color: 'red', fontStyle: 'italic' }}>
                        {__( 'After manually changing the anchor, remember to refresh summary block to make the links work!', 'advanced-gutenberg' )}
                    </p>
                </InspectorAdvancedControls>,
            ] )
        }
    } );

    class SummaryBlock extends Component {
        constructor() {
            super( ...arguments );
            this.updateSummary = this.updateSummary.bind( this );
            this.latinise = this.latinise.bind(this);
        }

        componentWillMount() {
            const { attributes, setAttributes } = this.props;
            const currentBlockConfig = advgbDefaultConfig['advgb-summary'];

            // No override attributes of blocks inserted before
            if (attributes.changed !== true) {
                if (typeof currentBlockConfig === 'object' && currentBlockConfig !== null) {
                    Object.keys(currentBlockConfig).map((attribute) => {
                        if (typeof attributes[attribute] === 'boolean') {
                            attributes[attribute] = !!currentBlockConfig[attribute];
                        } else {
                            attributes[attribute] = currentBlockConfig[attribute];
                        }
                    });
                }

                // Finally set changed attribute to true, so we don't modify anything again
                setAttributes( { changed: true } );
            }
        }

        componentDidMount() {
            this.updateSummary();
        };


        /**
         * Function to get heading blocks from columns blocks
         *
         * @param block     array Columns block to get data
         * @param storeData array Data array to store heading blocks
         *
         * @returns array   array Heading blocks from block given
         */
        static getHeadingBlocksFromColumns( block, storeData )
        {
            if ( block.name === 'core/columns' || block.name === 'core/column' ) {
                block.innerBlocks.map(function ( bl ) {
                    SummaryBlock.getHeadingBlocksFromColumns( bl, storeData );
                    return bl;
                } )
            } else if ( block.name === 'core/heading' ) {
                storeData.push( block );
            }

            return storeData;
        }

        latinise(str) {
            let lettersArr = str.split('');
            let result = [];
            lettersArr.map(letter => {
                if(typeof latinMap[letter] === "undefined") {
                    result.push(letter);
                } else {
                    result.push(latinMap[letter]);
                }

            });
            return result.join('');
        }

        updateSummary() {
            let headingDatas = [];
            let headingBlocks = [];
            const allBlocks = select( 'core/editor' ).getBlocks();
            const filteredBlocks = allBlocks.filter( ( block ) => ( block.name === 'core/heading' || block.name === 'core/columns' ) );
            filteredBlocks.map(function ( block ) {
                if (block.name === 'core/columns') {
                    SummaryBlock.getHeadingBlocksFromColumns( block, headingBlocks );
                } else {
                    headingBlocks.push( block );
                }

                return block;
            });

            headingBlocks.map( ( heading ) => {
                let thisHead = {};
                thisHead[ 'level' ] = parseInt( heading.attributes.level );

                // We only get heading from h2
                if (thisHead[ 'level' ] > 1) {
                    thisHead[ 'level' ] -= 1;
                    thisHead[ 'content' ] = heading.attributes.content.length
                        ? getBlockContent( heading ).replace( /<(?:.|\n)*?>/gm, '' )
                        : '';
                    let lowerHead = unescape(thisHead[ 'content' ].toLowerCase());
                    let headId = lowerHead.replace(/[!@#$%^&*()\/\\,.?":{}|<>]/g, "");
                    headId = headId.replace(/(amp;)+/g, "");
                    headId = headId.replace(/ /g, "-");
                    headId = this.latinise(headId);

                    thisHead[ 'clientId' ] = heading.clientId;
                    if (heading.attributes.anchor) {
                        thisHead[ 'anchor' ] = heading.attributes.anchor;
                    } else {
                        // Generate a random anchor for headings without it
                        thisHead[ 'anchor' ] = headId;
                        heading.attributes.anchor = thisHead[ 'anchor' ];
                    }

                    headingDatas.push( thisHead );
                }

                return heading;
            } );

            this.props.setAttributes( {
                headings: headingDatas
            } );
        }

        render() {
            const { attributes, isSelected, setAttributes } = this.props;
            const { headings, loadMinimized, anchorColor, align, headerTitle, isPreview } = attributes;

            // No heading blocks
            let summaryContent = (
                isPreview ?
                    <img alt={__('Summary', 'advanced-gutenberg')} width='100%' src={previewImageData}/>
                    :
                    <Placeholder
                        icon={summaryBlockIcon}
                        label={summaryBlockTitle}
                        instructions={__( 'Your current post/page has no headings. Try add some headings and update this block later', 'advanced-gutenberg' )}
                    >
                        <Button onClick={this.updateSummary}
                                className={'button'}
                        >
                            {__( 'Update', 'advanced-gutenberg' )}
                        </Button>
                    </Placeholder>
            );

            // Having heading blocks
            if (headings.length > 0) {
                const { selectBlock } = dispatch( 'core/editor' );
                summaryContent = (
                    <ul className="advgb-toc">
                        {headings.map( ( heading ) => {
                            return (
                                <li className={'toc-level-' + heading.level}
                                    style={{ marginLeft: heading.level * 20 }}
                                    key={heading.anchor}
                                >
                                    <a href={'#' + heading.anchor}
                                       onClick={() => selectBlock( heading.clientId )}
                                       style={ { color: anchorColor } }
                                    >
                                        {heading.content}
                                    </a>
                                </li>
                            )
                        } )}
                    </ul>
                )
            }

            return (
                <Fragment>
                    {!!headings.length && (
                        <BlockControls>
                            <BlockAlignmentToolbar value={ align } onChange={ ( align ) => setAttributes( { align: align } ) } />
                            <Toolbar>
                                <IconButton className={'components-icon-button components-toolbar__control'}
                                            icon={'update'}
                                            label={__( 'Update Summary', 'advanced-gutenberg' )}
                                            onClick={this.updateSummary}
                                />
                            </Toolbar>
                        </BlockControls>
                    ) }
                    <InspectorControls>
                        <PanelBody title={ __( 'Summary settings', 'advanced-gutenberg' ) } >
                            <ToggleControl
                                label={ __( 'Load minimized', 'advanced-gutenberg' ) }
                                checked={ !!loadMinimized }
                                onChange={ () => setAttributes( { loadMinimized: !loadMinimized, postTitle: select('core/editor').getEditedPostAttribute('title') } ) }
                            />
                            {loadMinimized &&
                            <TextControl
                                label={ __( 'Summary header title', 'advanced-gutenberg' ) }
                                value={ headerTitle || '' }
                                placeholder={ __( 'Enter header…', 'advanced-gutenberg' ) }
                                onChange={ (value) => setAttributes( { headerTitle: value } ) }
                            />
                            }
                            <PanelColorSettings
                                title={ __( 'Anchor Color', 'advanced-gutenberg' ) }
                                initialOpen={ false }
                                colorSettings={ [
                                    {
                                        label: __( 'Anchor Color', 'advanced-gutenberg' ),
                                        value: anchorColor,
                                        onChange: ( value ) => setAttributes( { anchorColor: value } ),
                                    },
                                ] }
                            />
                        </PanelBody>
                    </InspectorControls>
                    {summaryContent}
                </Fragment>
            )
        }
    }

    const blockAttrs = {
        headings: {
            type: 'array',
            default: [],
        },
        loadMinimized: {
            type: 'boolean',
            default: false,
        },
        anchorColor: {
            type: 'string',
        },
        align: {
            type: 'string',
            default: 'none',
        },
        postTitle: {
            type: 'string',
        },
        headerTitle: {
            type: 'string',
        },
        changed: {
            type: 'boolean',
            default: false,
        },
        isPreview: {
            type: 'boolean',
            default: false,
        },
    };

    registerBlockType( 'advgb/summary', {
        title: summaryBlockTitle,
        description: __( 'Show the table of content of current post/page.', 'advanced-gutenberg' ),
        icon: {
            src: summaryBlockIcon,
            foreground: typeof advgbBlocks !== 'undefined' ? advgbBlocks.color : undefined,
        },
        category: 'advgb-category',
        keywords: [ __( 'summary', 'advanced-gutenberg' ), __( 'table of content', 'advanced-gutenberg' ), __( 'list', 'advanced-gutenberg' ) ],
        attributes: blockAttrs,
        example: {
            attributes: {
                isPreview: true
            },
        },
        supports: {
            multiple: false,
        },
        edit: SummaryBlock,
        save: ( { attributes } ) => {
            const { headings, loadMinimized, anchorColor, align = 'none', postTitle, headerTitle } = attributes;
            // No heading blocks
            if (headings.length < 1) {
                return null;
            }

            let blockStyle = undefined;
            if (loadMinimized) blockStyle = { display: 'none' };

            const summary = (
                <ul className={`advgb-toc align${align}`} style={ blockStyle }>
                    {headings.map( ( heading, index ) => {
                        return (
                            <li className={'toc-level-' + heading.level}
                                key={`summary-save-${index}`}
                                style={{ marginLeft: heading.level * 20 }}
                            >
                                <a href={'#' + heading.anchor}
                                   style={ { color: anchorColor } }
                                >
                                    {heading.content}
                                </a>
                            </li>
                        )
                    } ) }
                </ul>
            );

            if ( loadMinimized ) {
                return (
                    <div className={`align${align}`}>
                        <div className={'advgb-toc-header collapsed'}>{ headerTitle || postTitle }</div>
                        {summary}
                    </div>
                );
            }

            return summary;
        },
        getEditWrapperProps( attributes ) {
            const { align } = attributes;
            const props = { 'data-resized': true };

            if ( 'left' === align || 'right' === align || 'center' === align ) {
                props[ 'data-align' ] = align;
            }

            return props;
        },
        deprecated: [
            {
                attributes: blockAttrs,
                save: function ( { attributes } ) {
                    const { headings, loadMinimized, anchorColor, align = 'none', postTitle, headerTitle } = attributes;
                    // No heading blocks
                    if (headings.length < 1) {
                        return null;
                    }

                    let blockStyle = undefined;
                    if (loadMinimized) blockStyle = { display: 'none' };

                    const summary = (
                        <ul className={`advgb-toc align${align}`} style={ blockStyle }>
                            {headings.map( ( heading, index ) => {
                                return (
                                    <li className={'toc-level-' + heading.level}
                                        key={`summary-save-${index}`}
                                        style={{ marginLeft: heading.level * 20 }}
                                    >
                                        <a href={'#' + heading.anchor}>{heading.content}</a>
                                    </li>
                                )
                            } ) }
                            { anchorColor &&
                            <style>
                                {`.advgb-toc li a {
                                    color: ${anchorColor};
                                }`}
                            </style>
                            }
                        </ul>
                    );

                    if ( loadMinimized ) {
                        return (
                            <div className={`align${align}`}>
                                <div className={'advgb-toc-header collapsed'}>{ headerTitle || postTitle }</div>
                                {summary}
                            </div>
                        );
                    }

                    return summary;
                },
            },
        ]
    } );
})( wp.i18n, wp.blocks, wp.element, wp.blockEditor, wp.components, wp.data, wp.hooks );
