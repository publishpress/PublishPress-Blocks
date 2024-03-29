# PublishPress Blocks

## Description

PublishPress Blocks is the plugin that gives you more control over the WordPress block editor.

PublishPress Blocks has everything you need to build professional websites with WordPress. The blocks include 24 layout options, sliders, buttons, icons, image galleries, maps, tabs, testimonials, accordions, and much more.

### Guidelines

* Write a clear summary
* Write precise steps to reproduce

## Installation

:warning: **Warning! This plugin requires to be built before being installed!**

This repository doesn't store external dependencies required by the plugin. It's not possible to simply clone or download the repository code and have a working WordPress plugin.

We aim to follow good practices on development, and we are using Composer as dependency manager, which recommends to not add external dependencies into the repository. You can find more information on their documentation page: [Should I commit the dependencies in my vendor directory?](https://getcomposer.org/doc/faqs/should-i-commit-the-dependencies-in-my-vendor-directory.md)

### How to install?

You can download a built package from [releases page](https://github.com/publishpress/Advanced-Gutenberg/releases) and install it on your WordPress sites by uploading the zip file, or upload the folder "src" renamed as "advanced-gutenberg" to plugins folder. This last option is for developers who want to contribute and/or test.

## How to contribute with code

* Clone the repository
* Create a new branch based on "develop" branch
* Implement and commit the code
* Create a Pull Request targeting the "develop" branch adding details about your fix

We will review and contact you as soon as possible.

## Development

### React JS and JSX Files

We use [React](https://facebook.github.io/react/) to build part of the user interface.
The sources files are named with the extension JSX. Which is optional on React, but provides a way to write modern code and compile to be compatible with legacy browsers. We use [babeljs.io](https://babeljs.io/) with the presets: react and es2015 to compile to JS files.

Please check the requirements at [our documentation page](https://publishpress.github.io/docs/development/react-jsx).

**Important:** use the npm modules from [package.json](https://github.com/publishpress/Advanced-Gutenberg/blob/master/package.json), and these two files as is that already comes within the repository: webpack.config.js and .babelrc.

#### Compiling JSX files to JS

Run the command `npm run build_react_dev` just once.

#### Compiling SCSS files to CSS

Run the command `npm run compile_css` every time after you make changes to any SCSS file in order to compile to CSS.

Please note there are other commands related to CSS compilation that involves specific files from admin. For more details check all the scripts in package.json.

#### Creating a zip installer

You need to have `gulp-cli` installed globally and `gulp` and `gulp-zip` in local. [Click here](https://gulpjs.com/docs/en/getting-started/quick-start/) for more details.

Through command line run `gulp bundle`. A zip ready to install as plugin should be generated inside bundled/ folder. This zip will exclude non required files in WordPress, like JSX and SCSS.

## License

License: [GPLv2 or later](http://www.gnu.org/licenses/gpl-2.0.html)
