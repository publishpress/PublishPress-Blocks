<?php

class ColumnsBlockCest
{
    public function _before(AcceptanceTester $I)
    {
        try {
            // Back to edit post
            $I->click('Edit Post');
            $I->waitForElement('#editor');
            $I->waitForElement('.advgb-columns-wrapper');
            $I->clickWithLeftButton('.advgb-columns-wrapper');
        } catch(Exception $e) {
            // do stuff
        }
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function createColumnsBlock(AcceptanceTester $I)
    {
        $I->loginAsAdmin('admin', 'password');

        $I->wantTo('Create a Columns Manager block');

        $I->amOnPage('/wp-admin/post-new.php');

        // Hide the Tips popup
        $I->executeJS('wp.data.dispatch( "core/nux" ).disableTips()');

        $I->fillField('.editor-post-title__input', 'Columns Manager Block');

        // Insert block
        $I->insertBlock('Columns Manager');

        // Choose layout 3 columns
        $I->waitForText('Pickup a columns layout');
        $I->click('//div[contains(@class, "advgb-columns-select-layout")]/div[contains(@class, "advgb-columns-layout")][9]');

        // Insert content to column 1
        try {
            $I->click('.advgb-columns-wrapper .advgb-columns .editor-block-list__layout > div.wp-block:first-child .block-list-appender');
            $I->waitForElement('.editor-inserter__search');
            $I->wait(0.2); // wait for animation done
            // Insert paragraph block
            $I->fillField(['xpath'=>'//input[contains(@id, \'editor-inserter__search-\')]'], 'Paragraph');
            $I->waitForText('Paragraph');
            $I->click('Paragraph');
        } catch (Exception $e) {
            // not latest gutenberg
        }

        $I->click('.advgb-columns-wrapper .advgb-columns .editor-block-list__layout > div.wp-block:first-child .advgb-column .wp-block-paragraph');
        $I->selectCurrentElementText();
        $I->pressKeys("First column text");

        // Insert content to column 2
        try {
            $I->click('.advgb-columns-wrapper .advgb-columns .editor-block-list__layout > div.wp-block:nth-child(2)');
            $I->click('.advgb-columns-wrapper .advgb-columns .editor-block-list__layout > div.wp-block:nth-child(2) .block-list-appender');
            $I->waitForElement('.editor-inserter__search');
            $I->wait(0.2); // wait for animation done
            // Insert paragraph block
            $I->fillField(['xpath'=>'//input[contains(@id, \'editor-inserter__search-\')]'], 'Paragraph');
            $I->waitForText('Paragraph');
            $I->click('Paragraph');
        } catch (Exception $e) {
            // not latest gutenberg
        }

        $I->click('.advgb-columns-wrapper .advgb-columns .editor-block-list__layout > div.wp-block:nth-child(2) .advgb-column .wp-block-paragraph');
        $I->selectCurrentElementText();
        $I->pressKeys("Second column text");

        // Insert content to column 3
        try {
            $I->click('.advgb-columns-wrapper .advgb-columns .editor-block-list__layout > div.wp-block:last-child');
            $I->click('.advgb-columns-wrapper .advgb-columns .editor-block-list__layout > div.wp-block:last-child .block-list-appender');
            $I->waitForElement('.editor-inserter__search');
            $I->wait(0.2); // wait for animation done
            // Insert paragraph block
            $I->fillField(['xpath'=>'//input[contains(@id, \'editor-inserter__search-\')]'], 'Paragraph');
            $I->waitForText('Paragraph');
            $I->click('Paragraph');
        } catch (Exception $e) {
            // not latest gutenberg
        }

        $I->click('.advgb-columns-wrapper .advgb-columns .editor-block-list__layout > div.wp-block:last-child .advgb-column .wp-block-paragraph');
        $I->selectCurrentElementText();
        $I->pressKeys("Third column text");

        // Publish post
        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->click('//div[@class="post-publish-panel__postpublish-buttons"]/a[text()="View Post"]');
        $I->waitForElement('.wp-block-advgb-columns');

        // Check
        $I->seeElement('div.advgb-columns.layout-13-13-13.mbl-layout-stacked');
        $I->seeNumberOfElements('div.advgb-columns.layout-13-13-13.mbl-layout-stacked > div', 3);
    }
}