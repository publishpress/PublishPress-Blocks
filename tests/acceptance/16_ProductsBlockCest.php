<?php

class ProductsBlockCest
{
    public function _before(AcceptanceTester $I)
    {
        try {
            // Back to edit post
            $I->click('Edit Post');
            $I->waitForElement('#editor');
            $I->waitForElement('.advgb-products-block');
            $I->clickWithLeftButton('.advgb-products-block');
        } catch(Exception $e) {
            // do stuff
        }
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function createProductsBlock(AcceptanceTester $I)
    {
        $I->loginAsAdmin('admin', 'password');

        $I->wantTo('Create a Products block');

        $I->activatePlugin('woocommerce');

        $I->amOnPage('/wp-admin/post-new.php');

        // Hide the Tips popup
        $I->executeJS('wp.data.dispatch( "core/nux" ).disableTips()');

        $I->fillField('.editor-post-title__input', 'Woo Products Block');

        // Insert block
        $I->insertBlock('Woo Products');
        $I->waitForElement('.advgb-products-block');

        $I->dontSee('WooCommerce has not been detected');

        // Publish post
        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->click('//div[@class="post-publish-panel__postpublish-buttons"]/a[text()="View Post"]');
        $I->waitForElement('.wp-block-advgb-woo-products');

        // Check
        $I->seeElement('.advgb-woo-products .woocommerce.columns-3 .products.columns-3');
        $I->seeNumberOfElements('//div[contains(@class, "woocommerce")]/ul[contains(@class, "products")]/li[contains(@class, "product")]', 6);
    }
}