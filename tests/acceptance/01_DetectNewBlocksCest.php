<?php


class DetectNewBlocksCest
{
    public function _before(AcceptanceTester $I)
    {
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function checkNewBlocks(AcceptanceTester $I)
    {
        $I->wantTo('Check if new blocks are detected');

        $I->loginAsAdmin('admin', 'password');

        $I->deactivatePlugin('test-block');

        $I->amOnPage('/wp-admin/post-new.php');

        // Hide the Tips popup
        $I->executeJS('wp.data.dispatch( "core/nux" ).disableTips()');

        // Click on + button
        $I->click('.edit-post-header-toolbar .editor-inserter button');

        // Search for Test
        $I->waitForElement('.editor-inserter__search');
        $I->wait(0.2); // wait the animation done
        $I->fillField(['xpath'=>'//input[contains(@id, \'editor-inserter__search-\')]'], 'Test');

        $I->dontSee("Test block");

        $I->activatePlugin('test-block');

        // Go to new post page
        $I->amOnPage('/wp-admin/post-new.php');
        $I->click('.edit-post-header-toolbar .editor-inserter button');
        $I->waitForElement('.editor-inserter__search');
        $I->wait(0.2); // wait the animation done
        $I->fillField(['xpath'=>'//input[contains(@id, \'editor-inserter__search-\')]'], 'Test');

        $I->see("Test block");

        $I->deactivatePlugin('test-block');
    }
}
