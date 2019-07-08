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

        // Change person name
        $I->click('.advgb-testimonial .advgb-testimonial-item h4.advgb-testimonial-name');
        $I->selectCurrentElementText();
        $I->pressKeys('John Doe');

        // Change person position
        $I->click('.advgb-testimonial .advgb-testimonial-item p.advgb-testimonial-position');
        $I->selectCurrentElementText();
        $I->pressKeys('Developer');

        // Change person description
        $I->click('.advgb-testimonial .advgb-testimonial-item p.advgb-testimonial-desc');
        $I->selectCurrentElementText();
        $I->pressKeys('Coding is the passion of his life.');

        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->click('//div[@class="post-publish-panel__postpublish-buttons"]/a[text()="View Post"]');

        // Check block loaded
        $I->waitForElement('.wp-block-advgb-testimonial');
        $I->seeElement('.advgb-testimonial-item');
        $I->seeElement('//div[@class="advgb-testimonial-item"]/h4[@class="advgb-testimonial-name"][text()="John Doe"]');
        $I->seeElement('//div[@class="advgb-testimonial-item"]/p[@class="advgb-testimonial-position"][text()="Developer"]');
        $I->seeElement('//div[@class="advgb-testimonial-item"]/p[@class="advgb-testimonial-desc"][text()="Coding is the passion of his life."]');
    }
}