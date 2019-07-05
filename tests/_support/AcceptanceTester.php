<?php


/**
 * Inherited Methods
 * @method void wantToTest($text)
 * @method void wantTo($text)
 * @method void execute($callable)
 * @method void expectTo($prediction)
 * @method void expect($prediction)
 * @method void amGoingTo($argumentation)
 * @method void am($role)
 * @method void lookForwardTo($achieveValue)
 * @method void comment($description)
 * @method \Codeception\Lib\Friend haveFriend($name, $actorClass = NULL)
 *
 * @SuppressWarnings(PHPMD)
*/
class AcceptanceTester extends \Codeception\Actor
{
    use _generated\AcceptanceTesterActions;

   /**
    * Define custom actions here
    */
    public function loginAsAdmin($username, $password)
    {
        $I = $this;
        if ($I->loadSessionSnapshot('adminLogin')) {
            return;
        }
        $I->amOnPage('/wp-admin/index.php');
        $I->wait(1);
        $I->submitForm('#loginform', [
            'log' => $username,
            'pwd' => $password
        ]);
        $I->saveSessionSnapshot('adminLogin');
    }

    public function activatePlugin($plugin_slug)
    {
        $I = $this;
        $I->amOnPage('/wp-admin/plugins.php');
        $I->see('Plugins');
        try {
            $I->click('tr[data-slug="'.$plugin_slug.'"] span.activate a');
            $I->see('Plugin activated.');
        } catch (Exception $e){}
    }

    public function deactivatePlugin($plugin_slug)
    {
        $I = $this;
        $I->amOnPage('/wp-admin/plugins.php');
        $I->see('Plugins');
        try {
            $I->click('tr[data-slug="' . $plugin_slug . '"] span.deactivate a');
            $I->see('Plugin deactivated.');
        } catch (Exception $e) {}
    }

    /**
     * Click and wait for javascript run
     */
    public function clickAndWait($selector, $wait = 0.1)
    {
        $I = $this;
        $I->click($selector);
        $I->wait($wait);
    }

    /**
     * Click to view post on frontend
     */
    public function clickViewPost()
    {
        $I = $this;
        try { // latest gutenberg plugin
            $I->waitForElementClickable('.components-snackbar a.components-snackbar__action', 1);
        } catch (Exception $e) {
            // not latest, do stuff
        }
        $I->click('View Post');
    }

    /**
     * Insert new block to editor
     */
    public function insertBlock($blockName) {
        $I = $this;
        // Click on + button
        $I->click('.edit-post-header-toolbar .editor-inserter button');

        // Search for block
        $I->waitForElement('.editor-inserter__search');
        $I->wait(0.2); // wait the animation done
        $I->fillField(['xpath'=>'//input[contains(@id, \'editor-inserter__search-\')]'], $blockName);

        // Insert block
        $I->waitForText($blockName);
        $I->click($blockName);
    }
}
