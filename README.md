# RightJS Plugins

This repository contains the [RightJS](http://rightjs.org) common use plugins
source codes, you can find all the documentation, builds and so one at the
official site over here:

[RightJS Plugins](http://rightjs.org/plugins)


# Build

To build the modules manually you'll need to to hook up the `rightjs-util`
submodule

    git submodule init
    git submodule update

After that you'll need `Ruby` and `Java` on your computer, and after that
just say 

    rake build

And that will do the trick. If you don't have `Java` on your computer, you
can build the scripts using the Google API like that

    rake build REMOTE=true

You also can build only some of the plugins

    rake build OPTIONS=json,rails

Enjoy!


# License

All the source code in this repository is released under the terms of the MIT
license.


Copyright (C) 2009-2010 Nikolay Nemshilov