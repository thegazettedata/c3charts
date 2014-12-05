#Responsive C3.js charts

This is a repository of charts built for The Gazette and KCRG using [C3.js](http://c3js.org/). The CSS, JS and imgs folders are global folder that are used with every project.

Individual projects are housed in projects and have their own CSS, JS, etc. folders. To see examples, go to projects/examples and open the index.html file.

The base folder in the projects folder is meant to be copied and pasted whenever you create a new project. Just rename the folder, place it within the projects folder and hack away.

If you are iFraming the chart on a page, the iFrame.html file within the base folder includes CSS and JS to make the chart responsive.

The iFrame you should use looks like:

```html
<div id="iframe-responsive-container" data-height="320px" data-600-height="220px">
	<iframe id="iframe-responsive" frameborder="0" src="index.html" width="100%"></iframe>
</div>
```

The date-height attribute of "iframe-responsive-container" is the default height of the iFramed chart. The "data-600-height" attribute sets the height of the chart to 220px at screen sizes that are 600px wide or lower.

You can add as many "breakpoints" as you want. For instance, if you want the height of the chart to be 400px tall at screen sizes of 700px, you're code would look like so:

```html
<div id="iframe-responsive-container" data-height="320px" data-700-height="250px">
	<iframe id="iframe-responsive" frameborder="0" src="index.html" width="100%"></iframe>
</div>
```

You can also use both:

```html
<div id="iframe-responsive-container" data-height="320px" data-700-height="250px" data-600-height="220px">
	<iframe id="iframe-responsive" frameborder="0" src="index.html" width="100%"></iframe>
</div>
```

Finally, because Saxo likes to strip out attributes, which are very important, please lazy load the embed like so:

```html
<div class="lazyload"><!--
<div id="iframe-responsive-container" data-height="320px" data-700-height="250px" data-600-height="220px">
	<iframe id="iframe-responsive" frameborder="0" src="index.html" width="100%"></iframe>
</div>
--></div>
```

