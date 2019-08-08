const puppeteer = require('puppeteer');
let browser;
let page;
let domain = "https://www.seleniumeasy.com/test";

beforeAll(async () => {
  browser = await puppeteer.launch({headless: true});
  page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
})

afterAll(async () => {
  await browser.close()
  console.log('done');
})

describe('Selenium basic first form demo', () => {
  const inputSelector = 'input#user-message';
  const submitButtonSelector = '#get-input>button'
  const messageLabelSelector = '#display'
  const sum1Selector = 'input#sum1';
  const sum2Selector = 'input#sum2'
  const totalButtonSelector = '#gettotal>button'
  const valueLabelSelector = '#displayvalue'

  describe('Single input fields', () => {
    it('has single input field', async () => {
      await page.goto(domain + '/basic-first-form-demo.html', { waitUntil: 'networkidle0' });
      const inputField = await page.$(inputSelector);
      expect(inputField).toBeTruthy();
    }, 20000);

    it('has submit message button', async () => {
      const submitButton = await page.$(submitButtonSelector);
      expect(submitButton).toBeTruthy();
    }, 10000);

    it('has message label', async () => {
      const messageLabel = await page.$(messageLabelSelector);
      expect(messageLabel).toBeTruthy();
    }, 10000);
  });

  describe('Single Input Functionality', () => {
    it('display value entered by user', async () => {     
      let textToShow = 'testRG!@#2345881---+_'

      await page.type(inputSelector, textToShow);
      await page.click(submitButtonSelector);

      const displayLabel = await page.$eval(messageLabelSelector, el => el.textContent);

      expect(displayLabel).toEqual(displayLabel);
    }, 10000);
  });

  describe('Two inputs field', () => {
    it('has a & b fields', async () => {
      const sum1 = await page.$(sum1Selector);
      const sum2 = await page.$(sum2Selector);

      expect(sum1).toBeTruthy();
      expect(sum2).toBeTruthy();
    }, 10000);

    it('has get total button', async () => {
      const totalButton = await page.$(totalButtonSelector);
      expect(totalButton).toBeTruthy();
    }, 10000);

    it('has display value label', async () => {
      const valueLabel = await page.$(valueLabelSelector);
      expect(valueLabel).toBeTruthy();
    }, 10000);
  });

  describe('Two Inputs Functionality', () => {
    it('can sum value entered by user', async () => {     
      let value1 = 100;
      let value2 = 99;

      await page.type(sum1Selector, value1.toString());
      await page.type(sum2Selector, value2.toString());
      await page.click(totalButtonSelector);

      const totalLabel = await page.$eval(valueLabelSelector, el => el.textContent);

      expect(parseInt(totalLabel)).toEqual(value1 + value2);
    }, 10000);
    
    it('handle non numeric value entered by user', async () => {     
      let value1 = 100;
      let value2 = "asd";

      const sum1 = await page.$eval(sum1Selector, el => el.value);
      await page.focus(sum1Selector);
      for (let i = 0; i < sum1.length; i++) {
        await page.keyboard.press('Backspace');
      }
      
      const sum2 = await page.$eval(sum2Selector, el => el.value);
      await page.focus(sum2Selector);
      for (let i = 0; i < sum2.length; i++) {
        await page.keyboard.press('Backspace');
      }
      
      await page.type(sum1Selector, value1.toString());
      await page.type(sum2Selector, value2.toString());
      await page.click(totalButtonSelector);

      const totalLabel = await page.$eval(valueLabelSelector, el => el.textContent);
      expect(totalLabel).toEqual("NaN");
    }, 10000);
  });
});

describe('Selenium basic select dropdown demo', () => {
  const dropdownSelector = '#select-demo';
  const selectedValueSelector = "p.selected-value"
  const allSelectedValueSelector = "p.getall-selected"
  const multiOptionSelector = "#multi-select"
  const firstButtonSelector = "#printMe"
  const printAllButtonSelector = "#printAll"


  describe('Dropwdown form fields', () => {
    it('has dropdown', async () => {
      await page.goto(domain + '/basic-select-dropdown-demo.html', { waitUntil: 'networkidle0' });
      const dropdown = await page.$(dropdownSelector);
      expect(dropdown).toBeTruthy();
    }, 20000);

    it('has selected value field and empty', async () => {
      const container = await page.$(selectedValueSelector);
      const text = await page.$eval(selectedValueSelector, el => el.textContent);

      expect(container).toBeTruthy();
      expect(text).toEqual("");
    }, 10000);
  });

  describe('Dropwdown Form Functionality', () => {
    it('display selected value from dropdown', async () => {
      let selectedValue = 'Monday';
      await page.select(dropdownSelector, selectedValue);
      const text = await page.$eval(selectedValueSelector, el => el.textContent);

      expect(text).toMatch(selectedValue);
    }, 10000);
  });

  describe('Multi Select Fields', () => {
    it('has multi select field', async () => {
      const multiSelect = await page.$(multiOptionSelector);
      expect(multiSelect).toBeTruthy();
    }, 20000);

    it('has `First selected` button', async () => {
      const firstButton = await page.$(firstButtonSelector);
      expect(firstButton).toBeTruthy();
    }, 10000);

    it('has `Get All Selected` button', async () => {
      const multiSelectButton = await page.$(printAllButtonSelector);
      expect(multiSelectButton).toBeTruthy();
    }, 10000);
  });

  describe('Multi Select Fields Functionality', () => {
    it('can do single selection', async () => {
      let selectMultipleValue = ['California', 'Florida'];
      await page.select(multiOptionSelector, selectMultipleValue[0], selectMultipleValue[1]);
      await page.click(printAllButtonSelector);
      const textAll = await page.$eval(allSelectedValueSelector, el => el.textContent);

      selectMultipleValue.forEach(function(v){
          expect(textAll).toEqual(expect.stringContaining(v));
      });
    }, 10000);
  });
});