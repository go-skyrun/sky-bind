# Sky-Bind
Sky-Bind is a javascript data-binding library for easy, simple two-way data-binding in any JS web app. It was created from the need to have simple data-binding in javascript without having to use a heavy platform like AngularJS, React, or the like. Basically you pass in a JSON structure with default values, and the HTML form uses `x-bind` attributes to attach data-binding to properties. And that's it - you just pick up the JSON on submit, and it just works.

## Usage
Check out the test file `test/index.html` for usage. Basically you just include either `sky-bind.js` or `sky-bind.min.js` in your HTML after your form, and your `x-bind` tags on HTML elements will automatically work. 

After cloning this repo, you can test `test/index.html` with any static hoster like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VSCode.

## Feedback and next steps
This is obviously a super simple first version of such a data binding library, feel free to add any feature requests or ideas for future development in the Issues.

