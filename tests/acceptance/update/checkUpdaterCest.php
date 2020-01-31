<?php

/**
 * @group update
 */
class checkUpdaterCest
{
    public function _before(AcceptanceTester $I)
    {
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function createUpdateTestBlocks(AcceptanceTester $I)
    {
        $I->wantTo('Check that all inserted blocks still working');

        $I->loginAsAdmin('admin', 'password');

        $I->amOnPage('/wp-admin/edit.php');

        $I->click('Update test');

        try {
            $I->waitForElementVisible('.edit-post-welcome-guide');
            $I->clickWithLeftButton('//button[@aria-label="Close dialog"]');
        } catch (Exception $e) {
            //not latest Gutenberg
        }

        try {
            $I->executeJS('wp.data.dispatch( "core/nux" ).disableTips()');
        } catch (Exception $e) {}

        $I->dontSee('This block has encountered an error and cannot be previewed.');
        $I->dontSee('This block contains unexpected or invalid content.');
    }
}
