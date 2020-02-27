# Manifest Design Toolkit

Prototype NodeBB themes with Automatic SCSS compiling and Live Reloading.

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

Feel free to edit anything in the static folder - grunt should automatically update and reload your web browser with changes. Likewise, any changes in the `source` directory are automatically compiled and updated for you.