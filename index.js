'use strict';

module.exports = (app, options) => {

  app.remotes().phases
    .addBefore('invoke', 'options-from-request')
    .use((ctx, next) => {
      if (!ctx.args.options || !ctx.args.options.accessToken) return next();
      const userModel = options.user || options || 'User';
      const User = app.models[userModel];
      User.findById(ctx.args.options.accessToken.userId, options.filter, ctx.args.options, (err, user) => {
        if (err) return next(err);
        ctx.args.options.currentUser = user;
        next();
      });
    });
}