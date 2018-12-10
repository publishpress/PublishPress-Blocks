<?php


class RecentPostsBlockCest
{
    public function _before(AcceptanceTester $I)
    {
    }

    public function _after(AcceptanceTester $I)
    {
    }

    public function addRecentPostsBlocks(AcceptanceTester $I)
    {
        $I->wantTo('Create a recent post blocks');

        $I->amOnPage('/wp-admin/post-new.php');

        // Click on + button
        $I->click('.editor-inserter button');

        // Search for Recent Posts block
        $I->fillField(['xpath'=>'//input[contains(@id, \'editor-inserter__search-\')]'], 'Recent Posts');

        $I->click('Recent Posts');

        $I->wait(1);

        $I->selectOption('//label[text()="Category"]/following-sibling::node()', array('text' => 'Recent posts'));

        $I->fillField('.editor-post-title__input', 'Recent Posts blocks test');
        $I->wait(0.2);

        $I->click('Publish…');
        $I->waitForElementVisible('.editor-post-publish-button');

        $I->click('Publish');
        $I->waitForText('Post published.');

        $I->click('View Post');

        $I->seeNumberOfElements('.advgb-recent-post', 8);
    }

    public function changeNumberOfItems(AcceptanceTester $I)
    {
        $I->click('Edit Post');

        $I->click('.editor-block-navigation');

        $I->click('Recent Posts');

        $I->fillField('//label[text()="Number of items"]/following-sibling::node()/following-sibling::node()', 5);
        $I->wait(0.2);

        $I->click('Update');
        $I->waitForText('Post updated.');

        $I->click('View Post');

        $I->seeNumberOfElements('.advgb-recent-post', 5);

    }
}
