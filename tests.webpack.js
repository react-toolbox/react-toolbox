var context = require.context('./components', true, /.spec\.cjsx?$/);
context.keys().forEach(context);
