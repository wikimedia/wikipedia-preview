# Wikipedia Preview

This is a small Javascript component that allows showing a Wikipedia article preview on any website. It doesn't have any dependencies and should be compatible with most browsers.

This is yet another implementation of an old concept. It is heavily inspired by [jquery.wikilookup](https://github.com/mooeypoo/jquery.wikilookup) and [Page Previews](https://www.mediawiki.org/wiki/Page_Previews). 

## How to use

### As a standalone script

```html
<script src="<unpkg or your own site>/wikipedia-preview.production.js"></script>
<script type="text/javascript">
  wikipediaPreview.init()
</script>
```

### As an npm dependency
```bash
$ npm install wikipedia-preview --save
```

```javascript
const wikipediaPreview = require('wikipedia-preview')
wikipediaPreview.init()
```

### Options of the init function

The `init` function accepts the following options:

Name | Type | Default | Description
--- | --- | --- | ---
root | DOM Element | `document` | Where to look for elements that should have the popup
selector | string | `'[data-wikipedia-preview]'` | How nodes that should have the popup are identified
lang | string | `'en'` | Default Wikipedia language
popupContainer | DOM Element | `document.body` | Where to put the popup in the DOM

Example
```html
<p class="content">
	You can learn about <span class="wiki">Chat</span> and <span class="wiki">Chien</span> from Wikipedia.
</p>
<div class="popup-container"></div>
```

```javascript
wikipediaPreview.init({
	root: document.querySelector('.content'),
	selector: '.wiki',
	popupContainer: '.popup-container',
	lang: 'fr'
});
```

### Attributes

#### data-wikipedia-preview

To indicate that a word or expression should bring up the article preview popup, mark it with the `data-wikipedia-preview` attribute (or anything else as long as you're using the `selector` option described above).

By default, nodes with the `data-wikipedia-preview` attribute don't have any special visual treatment. You should style them in a way that makes sense for your context.

For example:

```lang=css
[data-wikipedia-preview] {
	background-color: yellow;
}
```

#### data-wp-title

When the article title is not the same as the node's `textContent` property, use the `data-wp-title` attribute to specify the article title.

#### data-wp-lang

To use a language different than the language specified in the options, use the `data-wp-lang` attribute.

### TODO
* rtl
* mobile
