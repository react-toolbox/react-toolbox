const context = require.context('./components', true, /(.spec\.cjsx?|.spec\.jsx?)$/);
context.keys().forEach(context);
