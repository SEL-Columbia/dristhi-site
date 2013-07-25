drishti-site
============

drishti backend website

Install
---------------
```
$ cd <this directory>
```

```
$ sudo npm install -g bower
```

```
$ sudo npm install -g grunt-cli
```

```
$ npm install
```

```
$ bower install
```

> NOTE: if you get timeout errors from the above command, you will need to have git replace git:// urls with https:// by running

```
$ git config --global url."https://".insteadOf git://
```

Run
------
```
$ grunt server
```

Deploy to Github.io
------

1. Test the distribution build and commit it if you're satisfied
    ```
    $ grunt server:dist
    ```

    ```
    $ git add dist && git commit -m "<Your lovely message>"
    ```

2. Push the **dist** subtree
    ```
    $ git subtree push --prefix dist origin gh-pages
    ```
