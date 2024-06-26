<?php

namespace App\Scraper;

use Facebook\WebDriver\Remote\DesiredCapabilities;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\WebDriverBy;
use Symfony\Component\Panther\Client;

class Scraper
{
    public static function scraper($url, $source)
    {
        try {
            $data = [];
            $client = Client::createChromeClient();
            $crawler = $client->request('GET', $url);
            $crawler->filter($source['container'])->each(function ($element) use ($source, &$data) {
                $item = [];
                $item['title'] = $element->filter($source['title'])->eq(0)->text();
                $item['link'] = $element->filter($source['link'])->eq(0)->getAttribute('href');
                $item['date']  = $element->filter($source['date'])->eq(0)->text();
                $item['description'] = $element->filter($source['description'])->eq(0)->text();
                if (count($data) < 10) {
                    $data[] = $item;
                }
            });
            return $data;
        } catch (\Throwable $th) {
            return [];
        }
    }
}
