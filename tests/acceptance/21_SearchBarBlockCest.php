<?php


class SearchBarBlockCest
{
    public function _before(AcceptanceTester $I)
    {
        try {
            // Back to edit post
            $I->click('Edit Post');
            $I->waitForElement('#editor');
            $I->waitForElement('.advgb-search-bar-wrapper');
            $I->clickWithLeftButton('.advgb-search-bar-wrapper');
        } catch(Exception $e) {
            // do stuff
        }
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function createSearchBarBlock(AcceptanceTester $I)
    {
        $I->loginAsAdmin('admin', 'password');

        $I->wantTo('Create a Search Bar block');

        $I->amOnPage('/wp-admin/post-new.php');

        // Hide the Tips popup
        $I->executeJS('wp.data.dispatch( "core/nux" ).disableTips()');

        $I->fillField('.editor-post-title__input', 'Search Bar Block');

        // Insert block
        $I->insertBlock('Search Bar');
        $I->waitForElement('.advgb-search-bar-wrapper');

        // Change width
        $I->fillField('//label[text()="Width"]/following-sibling::node()/following-sibling::node()', 600);

        // Publish post
        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->click('//div[@class="post-publish-panel__postpublish-buttons"]/a[text()="View Post"]');
        $I->waitForElement('.advgb-search-bar-form');
    }
}