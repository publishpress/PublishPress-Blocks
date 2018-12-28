<?php

namespace Helper;

// here you can define custom actions
// all public methods declared in helper class will be available in $I

class Acceptance extends \Codeception\Module
{

    public function dragAndDrop($xpath_from, $xpath_to, $sleep=0)
    {
        $webDriver = $this->getModule('WebDriver')->webDriver;

        $draggableElement = $webDriver->findElement(\WebDriverBy::xpath($xpath_from));
        $dropZone = $webDriver->findElement(\WebDriverBy::xpath($xpath_to));

        $webDriver->getMouse()->mouseMove($draggableElement->getCoordinates());
        sleep($sleep);
        $webDriver->getMouse()->mouseDown($draggableElement->getCoordinates());
        sleep($sleep);
        $webDriver->getMouse()->mouseMove($dropZone->getCoordinates());
        sleep($sleep);
        $webDriver->getMouse()->mouseUp();
    }

    /**
     * Select all the content of the element the pointer is in
     */
    public function selectCurrentElementText()
    {
        $webDriver = $this->getModule('WebDriver')->webDriver;
        $action = new \WebDriverActions($webDriver);
        $action->sendKeys(null, \WebDriverKeys::PAGE_UP)->keyDown(null, \WebDriverKeys::SHIFT)->sendKeys(null, \WebDriverKeys::PAGE_DOWN)->keyUp(null, \WebDriverKeys::SHIFT)->perform();
    }

    /**
     * Press multiple keys
     */
    public function pressKeys($keys)
    {
        $this->getModule('WebDriver')->webDriver->getKeyboard()->sendKeys($keys);
    }

    /**
     * Get an element width
     *
     * @param $xpath
     */
    public function getElementWidth($xpath)
    {
        $webDriver = $this->getModule('WebDriver')->webDriver;
        return $webDriver->findElement(\WebDriverBy::xpath('//*[contains(@class,"advgb-table-frontend")]'))->getSize()->getWidth();
    }
}
