<?php

class CountUpBlockCest
{
    public function _before(AcceptanceTester $I)
    {
        try {
            // Back to edit post
            $I->click('Edit Post');
            $I->waitForElement('#editor');
            $I->waitForElement('.advgb-social-links-block');
            $I->clickWithLeftButton('//div[@class="advgb-social-links-block"]');
        } catch(Exception $e) {
            // do stuff
        }
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function createCountUpBlock(AcceptanceTester $I)
    {

        $I->loginAsAdmin('admin', 'password');

        $I->wantTo('Create a Count Up block');

        $I->amOnPage('/wp-admin/post-new.php');

        // Hide the Tips popup
        $I->executeJS('wp.data.dispatch( \'core/nux\' ).disableTips()');

        $I->fillField('.editor-post-title__input', 'Count Up Block');

        // Insert block
        $I->insertBlock('Count Up');
        $I->waitForElement('.advgb-count-up');

        // Change text
        $I->click('//div[contains(@class, "advgb-count-up")]//div[@class="advgb-count-up-columns-one"]//h4');
        $I->selectCurrentElementText();
        $I->pressKeys('Visitors');

        $I->click('//div[contains(@class, "advgb-count-up")]//div[@class="advgb-count-up-columns-one"]/div[2]//div');
        $I->selectCurrentElementText();
        $I->pressKeys('2345');

        $I->click('//div[contains(@class, "advgb-count-up")]//div[@class="advgb-count-up-columns-one"]/div[3]//div');
        $I->selectCurrentElementText();
        $I->pressKeys('per day');

        // Publish post
        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->click('//div[@class="post-publish-panel__postpublish-buttons"]/a[text()="View Post"]');
        $I->waitForElement('.wp-block-advgb-count-up');

        // Check text
        $I->seeElement('//div[@class="advgb-count-up-columns-one"]/h4[@class="advgb-count-up-header"][text()="Visitors"]');
        $I->seeElement('//div[@class="advgb-count-up-columns-one"]/div/span[@class="advgb-counter-number"][text()="2345"]');
        $I->seeElement('//div[@class="advgb-count-up-columns-one"]/p[@class="advgb-count-up-desc"][text()="per day"]');
    }
}