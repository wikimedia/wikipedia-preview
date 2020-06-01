import unittest
from selenium import webdriver
import requests
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.action_chains import ActionChains
import os

class LoginForm(unittest.TestCase):
    def setUp(self):
        self.username = "jpita-ctr@wikimedia.org"
        self.authkey  = os.environ.get('CBTKEY')
        self.api_session = requests.Session()
        self.api_session.auth = (self.username,self.authkey)

        self.test_result = None

        caps = {}

        caps['name'] = 'wikipedia preview firefox'
        caps['browserName'] = 'Firefox'
        caps['platform'] = 'Windows 10'

        self.driver = webdriver.Remote(
            desired_capabilities=caps,
            command_executor="http://%s:%s@hub.crossbrowsertesting.com:80/wd/hub"%(self.username,self.authkey)
        )

        self.driver.implicitly_wait(20)

    def test_CBT(self):

        try:
            self.driver.get('https://wikimedia.github.io/wikipedia-previews')
            self.driver.maximize_window()
            selectedWord=self.driver.find_element_by_css_selector('.content-en > p:nth-child(2) > span:nth-child(1)')
            ActionChains(self.driver).move_to_element(selectedWord).perform()
            selectedWord.click()

            WebDriverWait(self.driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, '.wp-link'))
            )
            wikipediaLink = self.driver.find_element_by_css_selector(".wp-link")
            print("found the link, going for actions")
            ActionChains(self.driver).move_to_element(wikipediaLink).perform()
            print("after actions")
            wikipediaLink.click()
            print("clicked the link, going for screenshot")
            self.driver.switch_to.window(self.driver.window_handles[-1])
            session_id = self.driver.session_id
            snapshot_data = requests.post('https://crossbrowsertesting.com/api/v3/selenium/' + session_id + '/snapshots',auth=self.api_session.auth).json()
            self.assertEquals('https://en.wikipedia.org/wiki/Cat', self.driver.current_url)
            self.test_result = 'pass'

        except :
            self.api_session.put('https://crossbrowsertesting.com/api/v3/selenium/' + self.driver.session_id + '/snapshots/')
            self.test_result = 'fail'
            raise

    def tearDown(self):
        print("Done with session %s" % self.driver.session_id)
        self.driver.quit()
        if self.test_result is not None:
            self.api_session.put('https://crossbrowsertesting.com/api/v3/selenium/' + self.driver.session_id,
                data={'action':'set_score', 'score':self.test_result})

if __name__ == '__main__':
    unittest.main()
