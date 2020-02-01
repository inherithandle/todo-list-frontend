export default {
    getParameterByName: function(name, url) {
        /*
            query string: ?foo=lorem&bar=&baz
            var foo = getParameterByName('foo'); // "lorem"
            var bar = getParameterByName('bar'); // "" (present with empty value)
            var baz = getParameterByName('baz'); // "" (present with no value)
            var qux = getParameterByName('qux'); // null (absent)
            copied from https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
         */
        if (!url)
            url = window.location.href;

        name = name.replace(/[\[\]]/g, '\\$&');
        let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results || !results[2])
            return null;
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
}