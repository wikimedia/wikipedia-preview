# Wix Sites integration

You can use Wikipedia Preview in your [Wix Site](https://www.wix.com/) if you have any premium account by [embedding custom code to your site](https://support.wix.com/en/article/embedding-custom-code-to-your-site). Follow these simple instructions to get started and bring the sum of all knowledge to your readers.

First head to your site's [dashboard settings](https://www.wix.com/my-account/site-selector/?buttonText=Open%20Settings&title=Select%20a%20Site&autoSelectOnSingleSite=true&actionUrl=https://www.wix.com/dashboard/{{metaSiteId}}/settings) to load and initialize Wikipedia Preview:

To load:
  1. Click the Custom Code tab under Advanced Settings
  2. Click either "Add Custom Code" at the top right or the "Add Code" button in the "Head" box
  3. Copy and paste the following code snippet in the text box provided:
  ```
  <script src="https://unpkg.com/wikipedia-preview@latest/dist/wikipedia-preview.production.js"></script>
  ```
  4. Name that "Wikipedia Preview: load"
  5. Under "Add Code to Pages", make sure "All Pages" is selected and "Load code once" in the respective dropdown menu.
  6. Make sure "Place code in: Head" is selected
  7. By default this code should be marked as "Essential", you can ensure this is the case under the Code Type tab.
  8. Click "Apply"

Then to initialize:
  1. Click "Add Code" button in the "Body - End" box:
  2. Copy and paste the following code snippet in the text box provided:
  ```
  <script>
    if (wikipediaPreview) {
      wikipediaPreview.init({
        detectLinks: true
      });
    }
  </script>
  ```
  3. Name that "Wikipedia Preview: init"
  4. Under "Add Code to Pages", make sure "All Pages" is selected and "Load code on each new page" in the respective dropdown menu.
  5. Make sure "Place code in: Body - end" is selected
  6. By default this code should be marked as "Essential", you can ensure this is the case under the Code Type tab.
  7. Click "Apply"

You are now ready to start using Wikipedia Preview in your Wix Site. Simply [add hyperlinks](https://support.wix.com/en/article/wix-editor-adding-a-text-hyperlink) through the Wix Editor with the Wikipedia article link you would like to use on a specific word. Once you publish your site to the updated version, Wikipedia Preview popups should appear on link hover (desktop) or touch (mobile).