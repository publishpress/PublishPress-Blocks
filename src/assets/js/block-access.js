window.addEventListener('load', function () {
    advgbGetBlocksFeature(
        advgbCUserRole.access.inactive_blocks,
        '#advgb_access_nonce_field',
        '#blocks_list_access',
        'advgb_block_access'
    );
});
