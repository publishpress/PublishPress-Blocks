<?php

class TestimonialBlockCest
{
    public function _before(AcceptanceTester $I)
    {
        try {
            // Back to edit post
            $I->click('Edit Post');
            $I->waitForElement('#editor');
            $I->waitForElement('.advgb-testimonial');
            $I->clickWithLeftButton('//div[@class="advgb-testimonial"]');
        } catch(Exception $e) {
            // do stuff
        }
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function createTestimonialBlock(AcceptanceTester $I)
    {
        $I->loginAsAdmin('admin', 'password');

        $I->wantTo('Create a Testimonial block');

        $I->amOnPage('/wp-admin/post-new.php');

        // Hide the Tips popup
        $I->executeJS('wp.data.dispatch( \'core/nux\' ).disableTips()');

        $I->fillField('.editor-post-title__input', 'Testimonial Block');

        // Insert block
        $I->insertBlock('Testimonial');

        $I->waitForElement('//div[contains(@class, "advgb-testimonial")]');

        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->click('//div[@class="post-publish-panel__postpublish-buttons"]/a[text()="View Post"]');

        // Check block loaded
        $I->waitForElement('.wp-block-advgb-testimonial');
        $I->seeElement('.advgb-testimonial-item');
    }
}