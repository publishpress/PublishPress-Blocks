<?php

class SummaryBlockCest
{
    public function _before(AcceptanceTester $I)
    {
        try {
            // Back to edit post
            $I->click('Edit Post');
            $I->waitForElement('#editor');
            $I->waitForElement('.advgb-toc');
            $I->clickWithLeftButton('.advgb-toc');
        } catch(Exception $e) {
            // do stuff
        }
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function createSummaryBlock(AcceptanceTester $I)
    {
        $I->loginAsAdmin('admin', 'password');

        $I->wantTo('Create a Summary block');

        $I->amOnPage('/wp-admin/post-new.php');

        // Hide the Tips popup
        $I->executeJS('wp.data.dispatch( "core/nux" ).disableTips()');

        $I->fillField('.editor-post-title__input', 'Summary Block');

        // Insert some headings
        $I->insertBlock('Heading');
        $I->waitForElement('//div[@data-type="core/heading"]//div[contains(@class, "wp-block-heading")]//h2');
        $I->pressKeys('Heading lv1');
        $I->wait(0.1);

        $I->insertBlock('Heading');
        $I->waitForElement('//div[@data-type="core/heading"][2]//div[contains(@class, "wp-block-heading")]//h2');
        $I->pressKeys('Heading lv2');
        $I->wait(0.1);
        $I->click('//p[text()="Level"]/following-sibling::node()//div[3]');

        $I->insertBlock('Heading');
        $I->waitForElement('//div[@data-type="core/heading"][3]//div[contains(@class, "wp-block-heading")]//h2');
        $I->pressKeys('Heading lv3');
        $I->wait(0.1);
        $I->click('//p[text()="Level"]/following-sibling::node()//div[4]');

        $I->insertBlock('Heading');
        $I->waitForElement('//div[@data-type="core/heading"][4]//div[contains(@class, "wp-block-heading")]//h2');
        $I->pressKeys('Heading lv1');
        $I->wait(0.1);

        // Insert block
        $I->insertBlock('Summary');
        $I->dontSee('Your current post/page has no headings.');
        $I->waitForElement('.advgb-toc');

        // Publish post
        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->click('//div[@class="post-publish-panel__postpublish-buttons"]/a[text()="View Post"]');
        $I->waitForElement('.wp-block-advgb-summary');

        // Check
        $I->seeNumberOfElements('//ul[contains(@class, "advgb-toc")]/li[@class="toc-level-1"]', 2);
        $I->seeNumberOfElements('//ul[contains(@class, "advgb-toc")]/li[@class="toc-level-2"]', 1);
        $I->seeNumberOfElements('//ul[contains(@class, "advgb-toc")]/li[@class="toc-level-3"]', 1);
    }

    public function changeSummaryStyles(AcceptanceTester $I)
    {
        $I->wantTo('Change summary link color and load minimized');

        // Change
        $I->click('//button/span[text()="Anchor Color"]');
        $I->clickAndWait('//span[@class="components-base-control__label"][text()="Anchor Color"]/following-sibling::node()/div[last()]/*[1]');
        $I->clickAndWait('.components-color-picker__inputs-wrapper input');
        $I->selectCurrentElementText();
        $I->pressKeys('#ff0000');
        $I->pressKeys(WebDriverKeys::ENTER);
        $I->clickWithLeftButton('.advgb-toc'); // click block to hide picker

        $I->click('//label[text()="Load minimized"]/preceding-sibling::node()');
        $I->waitForText('Summary header title');
        $I->fillField('//label[text()="Summary header title"]/following-sibling::node()', 'Summary Content');

        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-summary');

        // Check
        $I->seeElement('//div[@class="advgb-toc-header collapsed"]');
        $I->dontSeeElement('//ul[contains(@class, "advgb-toc")]');
        $I->click('//div[contains(@class, "advgb-toc-header")]');
        $I->waitForElementVisible('//ul[contains(@class, "advgb-toc")]/li');

        $color = $I->executeJS('return jQuery(".advgb-toc li a").css("color")');
        $I->assertEquals('rgb(255, 0, 0)', $color);
    }
}