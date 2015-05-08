#Responsive C3.js charts

This is a repository of charts built for The Gazette and KCRG using [C3.js](http://c3js.org/). The CSS, JS and imgs folders are global folder that are used with every project.

Individual projects are housed in projects and have their own CSS, JS, etc. folders. To see examples, go to projects/examples and open the index.html file.

The base folder in the projects folder is meant to be copied and pasted whenever you create a new project. Just rename the folder, place it within the projects folder and hack away.

The base-tabletop folder is the same as the base folder, only the chart here is running off of data that is in a [Google spreadsheet](https://docs.google.com/spreadsheets/d/1I1kFgNtDyHG2kX9BfetoKtYiG39ko7M9uBpm-c_UGlk/edit#gid=0). We are using [Tabletop](https://github.com/jsoma/tabletop) to grab the data.

To copy one of those directories and create another one within the projects folder, run this command:

	cp -avR projects/base  projects/name_of_project_here

This command copies everything within the "base" directory into a directory within the projects folder. Change "name_of_project_here" to whatever you want the new directory to be called


#Deploy to FTP server
When you are done with your chart, you can deploy it to our FTP server with one command. First you need to make sure a few things are installed on your computer. If you are using a Mac, do the following:

Make sure you have Homebrew installed:

	ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

Install node via Homebrew:	
	
	brew install node

If you are using a Windows machine, download Node [here](https://nodejs.org/download/).

Install npm dependencies:
	
	npm install

Make sure Grunt is install correctly:
	
	sudo npm install -g grunt-cli

If you're one Windows machine and are using a PowerShell console, you may want to need add the following [here](https://github.com/gruntjs/grunt/issues/774#issuecomment-58268520)

-- Note: Dependencies for Grunt are put into package.json. If any new dependencies are put in there, you need to install them by running:
	
	npm install

Finally, once all that is installed, you can deploy your project to our FTP server by running:

	grunt deploy --project=name_of_project_here

Replace "name_of_project_here" with the name of the project you created


#Push to Github
Here's some basic Github commands that you'll need to run to push your projects to Github. First, pull down all changes that have been made to the directory by other people onto your local machine:

	git pull

Then see what you have changed on your local machine:
	
	git status

If you have added files, run:

	git add .
	
If you have added and removed files, run:

	git add --all

Commit any changes you've made:

	git commit -m "message_goes_here"

Finally, push all the changes on your local machine to Github:

	git push

#Iframing charts into stories

If you are iFraming the chart on a page, the iFrame.html file within the base folder includes CSS and JS to make the chart responsive.

The iFrame you should use looks like:

```html
<div id="iframe-responsive-container" data-height="320px" data-600-height="220px">
	<iframe id="iframe-responsive" src="http://files.gazlab.com/content-host/c3charts/projects/cr-shootings/index.html#chart-homicides" scrolling=no frameborder="0" width="100%"></iframe>
</div>
```

The date-height attribute of "iframe-responsive-container" is the default height of the iFramed chart. The "data-600-height" attribute sets the height of the chart to 220px at screen sizes that are 600px wide or lower.

You can add as many "breakpoints" as you want. For instance, if you want the height of the chart to be 400px tall at screen sizes of 700px, you're code would look like so:

```html
<div id="iframe-responsive-container" data-height="320px" data-700-height="250px">
	<iframe id="iframe-responsive" src="http://files.gazlab.com/content-host/c3charts/projects/cr-shootings/index.html#chart-homicides" scrolling=no frameborder="0" width="100%"></iframe>
</div>
```

You can also use both:

```html
<div id="iframe-responsive-container" data-height="320px" data-600-height="220px" data-700-height="250px">
	<iframe id="iframe-responsive" src="http://files.gazlab.com/content-host/c3charts/projects/cr-shootings/index.html#chart-homicides" scrolling=no frameborder="0" width="100%"></iframe>
</div>
```

It is important to note that if you are going to use multiple media queries, you put the lowest pixel amounts first within the markup. So for instance, do this:

```html
<div class="iframe-responsive-container chart" data-height="650px" data-400-height="750px" data-550-height="700px">
```

And not this:
```html
<div class="iframe-responsive-container chart" data-height="650px" data-550-height="700px" data-400-height="750px">
```

Because our CMS strips out attributes, which are very important, we must [lazy load](https://github.com/emn178/jquery-lazyload-any) the embed like so:

```html
<div class="lazyload"><!--
<div id="iframe-responsive-container" data-height="320px" data-700-height="250px" data-600-height="220px">
	<iframe id="iframe-responsive" src="http://files.gazlab.com/content-host/c3charts/projects/cr-shootings/index.html#chart-homicides" scrolling=no frameborder="0" width="100%"></iframe>
</div>
--></div>
```


You can also add a header and about text like so: 


```html
<div id="chart-homicides-container" class="chart-container">
	<h3>Homicides: 2004 - 2014</h3>
	<div class="lazyload"><!--
		<div class="iframe-responsive-container chart" data-height="250px" data-600-height="200px">
		<iframe src="http://files.gazlab.com/content-host/c3charts/projects/cr-shootings/index.html#chart-homicides" scrolling=no frameborder="0" width="100%"></iframe>
		</div>
	--></div>
	<p><strong>About:</strong> Shown are the number of victims as a result of homicide.  In 2006, police recorded five incidents with six victims, including a double homicide. This year, policed recorded six incidents with eight victims.</p>
</div>
```

NOTE: You must include "scrolling:no" in the iframe for this solution to work on iPhones. The code that makes these responsive iframes work is found here: [http://thegazette.com/js/article-embeds.js](http://thegazette.com/js/article-embeds.js). Find the "findResponsiveIframes()" for the code.