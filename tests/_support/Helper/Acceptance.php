<?php

namespace Helper;

// here you can define custom actions
// all public methods declared in helper class will be available in $I

class Acceptance extends \Codeception\Module
{
    protected $config = ['php-version' => null, 'map-api-key'];

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
        $action->sendKeys(null, \WebDriverKeys::PAGE_UP)->sendKeys(null, \WebDriverKeys::HOME)->keyDown(null, \WebDriverKeys::SHIFT)->sendKeys(null, \WebDriverKeys::PAGE_DOWN)->sendKeys(null, \WebDriverKeys::END)->keyUp(null, \WebDriverKeys::SHIFT)->perform();
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
        return $webDriver->findElement(\WebDriverBy::xpath($xpath))->getSize()->getWidth();
    }

    /**
     * Get an element height
     *
     * @param $xpath
     */
    public function getElementHeight($xpath)
    {
        $webDriver = $this->getModule('WebDriver')->webDriver;
        return $webDriver->findElement(\WebDriverBy::xpath($xpath))->getSize()->getHeight();
    }

    /**
     * Get param from commandline
     */
    public function getParam($key, $default=null)
    {
        if (isset($this->config[$key])) {
            return $this->config[$key];
        }
        if ($default!==null) {
            return $default;
        }
        return '';
    }
}
