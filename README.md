# bee-line

A Simple hash based router which supports query strings

## Documentation

This is a port of the [simple-hash-router](https://github.com/casperin/hashRouter) in ES5 syntax and includes the ability to have query strings.

Your links looks like this:

```html
<a href='#'>Index</a>
<a href='#about'>About</a>
<a href='#page/2'>Page 2</a>
```

You require the module.

```javascript
var beeline = require('bee-line');
// or just include it in the head of the html


// Then you attach a your favorite listener to the `beeline`
beeline.register(function (page, params, query) {
    console.log(page);      // Name of the page
    console.log(params);    // Object with parameters
    console.log(query); //  object describing the query params eg: ?name=value&name2=val2 => {name:value, name2:val2}

    // This is where you'd do your matic.
});


// Then you define your routes. They have to be a list because the order
// matters. beeline will trigger on the first matched route.
beeline.addRoutes([
   {'/': 'index-page'},
   {'about': 'about-page'},
   {'page/:id': 'paginated-page'}
]);

// Lastly, you start it. When starting it, it will also trigger the approrpate
// route even though the URL did not change.
beeline.start();
```

### 404?

In case you link to an undefined route, it will notify registered functions
with a `not-found` page name.

### License

MIT.

### Attribution

Original routing developed by [Gorm Casper](https://github.com/casperin)
