const context = require.context('./components', true, /.spec\.js$/);
context.keys().forEach(context);
