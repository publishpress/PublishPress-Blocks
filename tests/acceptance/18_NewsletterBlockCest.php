<?php

class NewsletterBlockCest
{
    public function _before(AcceptanceTester $I)
    {
        try {
            // Back to edit post
            $I->click('Edit Post');
            $I->waitForElement('#editor');
            $I->waitForElement('.advgb-newsletter-wrapper');
            $I->clickWithLeftButton('.advgb-newsletter-wrapper');
        } catch(Exception $e) {
            // do stuff
        }
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function createNewsletterBlock(AcceptanceTester $I)
    {
        $I->loginAsAdmin('admin', 'password');

        $I->wantTo('Create a Newsletter block');

        $I->amOnPage('/wp-admin/post-new.php');

        // Hide the Tips popup
        $I->executeJS('wp.data.dispatch( "core/nux" ).disableTips()');

        $I->fillField('.editor-post-title__input', 'Newsletter Block');

        // Insert some headings
        $I->insertBlock('Newsletter');
        $I->waitForElement('.advgb-newsletter-wrapper');

        // Publish post
        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->click('//div[@class="post-publish-panel__postpublish-buttons"]/a[text()="View Post"]');
        $I->waitForElement('.wp-block-advgb-newsletter');

        // Check
        $I->seeElement('//div[contains(@class, "advgb-newsletter")]/form/div[@class="advgb-form-field"]/input[contains(@class, "advgb-form-input-email")]');
    }

    public function changeNewsletterStyles(AcceptanceTester $I)
    {
        $I->wantTo('Change newsletter form styles');

        // Change
        $I->selectOption('//label[text()="Form style"]/following-sibling::node()', array('text' => 'Alternative'));
        $I->fillField('//label[text()="Form width (px)"]/following-sibling::node()/following-sibling::node()', 500);

        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-newsletter');

        // Check
        $I->seeElement('//div[contains(@class, "advgb-newsletter")][contains(@class, "style-alt")][contains(@style, "max-width:500px")]');
        $I->seeElement('//div[contains(@class, "advgb-newsletter")]//input[contains(@class, "advgb-form-input-fname")]');
        $I->seeElement('//div[contains(@class, "advgb-newsletter")]//input[contains(@class, "advgb-form-input-lname")]');
        $I->seeElement('//div[contains(@class, "advgb-newsletter")]//input[contains(@class, "advgb-form-input-email")]');
    }
}