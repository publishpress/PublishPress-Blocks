<?php

class ContactFormBlockCest
{
    public function _before(AcceptanceTester $I)
    {
        try {
            // Back to edit post
            $I->click('Edit Post');
            $I->waitForElement('#editor');
            $I->waitForElement('.advgb-contact-form');
            $I->clickWithLeftButton('.advgb-contact-form');
        } catch(Exception $e) {
            // do stuff
        }
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function createContactFormBlock(AcceptanceTester $I)
    {
        $I->loginAsAdmin('admin', 'password');

        $I->wantTo('Create a Contact Form block');

        $I->amOnPage('/wp-admin/post-new.php');

        // Hide the Tips popup
        $I->executeJS('wp.data.dispatch( "core/nux" ).disableTips()');

        $I->fillField('.editor-post-title__input', 'Contact Form Block');

        // Insert some headings
        $I->insertBlock('Contact Form');
        $I->waitForElement('.advgb-contact-form');

        // Publish post
        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->click('//div[@class="post-publish-panel__postpublish-buttons"]/a[text()="View Post"]');
        $I->waitForElement('.wp-block-advgb-contact-form');

        // Check
        $I->seeElement('//div[contains(@class, "advgb-contact-form")]/form/div[contains(@class, "advgb-form-field")]/textarea[contains(@class, "advgb-form-input-msg")]');
    }

    public function changeTextHolder(AcceptanceTester $I)
    {
        $I->wantTo('Change contact form input placeholder');

        // Change
        $I->fillField('//label[text()="Name input placeholder"]/following-sibling::node()', 'Your Name');
        $I->fillField('//label[text()="Email input placeholder"]/following-sibling::node()', 'Your Email');
        $I->fillField('//label[text()="Message input placeholder"]/following-sibling::node()', 'Your Message');
        $I->fillField('//label[text()="Submit text"]/following-sibling::node()', 'Send');
        $I->fillField('//label[text()="Empty field warning text"]/following-sibling::node()', 'Not allow empty field!');
        $I->fillField('//label[text()="Submit success text"]/following-sibling::node()', 'Thanks for subscribe!');

        $I->updatePost();
        $I->waitForElement('.wp-block-advgb-contact-form');

        // Check
        $I->seeElement('//div[contains(@class, "advgb-contact-form")]//input[contains(@class, "advgb-form-input-name")][@placeholder="Your Name"]');
        $I->seeElement('//div[contains(@class, "advgb-contact-form")]//input[contains(@class, "advgb-form-input-email")][@placeholder="Your Email"]');
        $I->seeElement('//div[contains(@class, "advgb-contact-form")]//textarea[contains(@class, "advgb-form-input-msg")][@placeholder="Your Message"]');
        $I->seeElement('//div[contains(@class, "advgb-contact-form")]//button[contains(@class, "advgb-form-submit")][@data-alert="Not allow empty field!"]');
        $I->seeElement('//div[contains(@class, "advgb-contact-form")]//button[contains(@class, "advgb-form-submit")][@data-success="Thanks for subscribe!"]');
    }
}