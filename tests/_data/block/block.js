var el = wp.element.createElement,
    registerBlockType = wp.blocks.registerBlockType,
    blockStyle = { backgroundColor: '#900', color: '#fff', padding: '20px' };

registerBlockType( 'gutenberg-test-block/test', {
    title: 'Test block',

    icon: 'universal-access-alt',

    category: 'layout',

    edit: function() {
        return el( 'p', { style: blockStyle }, 'Test block.' );
    },

    save: function() {
        return el( 'p', { style: blockStyle }, 'Test block saved content.' );
    },
});