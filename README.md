# Manifest - the designer's toolkit

Build design manifests quicker than you ever have before with Automatic LESS compiling and Live Reloading.

More things to come as I go along, feel free to suggest ideas in the issue tracker.

## Installation 

First make sure you've installed [git](http://git-scm.com/downloads), [node.js](http://nodejs.org/download/), and [grunt-cli](http://gruntjs.com/getting-started).

```
git clone https://github.com/psychobunny/Manifest.git
cd Manifest
npm install
```

## Using Manifest

To boot up Manifest, simply run the following statement.

```
grunt
```

You should get a welcome screen when you navigate to http://localhost:3000/

Feel free to edit anything in the public folder - grunt should automatically update and reload your web browser with changes. Likewise, any changes in the `source/less` directory are automatically compiled and updated for you.


## Known Issues

On Linux, if you get this message:

```
Warning: watch ENOSPC
```

Try this solution: http://stackoverflow.com/questions/16748737/grunt-watch-error-waiting-fatal-error-watch-enospc