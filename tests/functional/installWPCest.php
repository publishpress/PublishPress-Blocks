<?php

class installWPCest
{
    public function _before(FunctionalTester $I)
    {
    }

    public function _after(FunctionalTester $I)
    {
    }

    // tests
    public function InstallPlugin(FunctionalTester $I)
    {
      $I->wantTo('Install plugin');
      $I->loginAsAdmin('admin', 'password');
      $I->amOnPage('/wp-admin/plugins.php');
      $I->see('Plugins');
      $I->see('Advanced Gutenberg', 'tr[data-slug="advanced-gutenberg"].inactive td.plugin-title');
      $I->click('tr[data-slug="advanced-gutenberg"] a.edit');
      $I->see('Plugin activated.');
    }
}
