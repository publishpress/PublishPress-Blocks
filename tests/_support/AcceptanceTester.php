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
      $I->amOnPage('/wp-admin/index.php');
      $I->wait(1);
      $I->submitForm('#loginform', [
           'log' => $username,
           'pwd' => $password
       ]);
      $I->see('Welcome to WordPress!');
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
}
