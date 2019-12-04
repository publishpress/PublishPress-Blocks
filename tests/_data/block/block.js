
( function( blocks, element ) {
    var el = element.createElement;

    var blockStyle = {
        backgroundColor: '#900',
        color: '#fff',
        padding: '20px',
    };

    blocks.registerBlockType( 'gutenberg-test-block/test', {
        title: 'Test block',
        icon: 'universal-access-alt',
        category: 'layout',
        example: {},
        edit: function() {
            return el(
                'p',
                { style: blockStyle },
                'Test block.'
            );
        },
        save: function() {
            return el(
                'p',
                { style: blockStyle },
                'Test block saved content.'
            );
        },
    } );
}(
    window.wp.blocks,
    window.wp.element
) );