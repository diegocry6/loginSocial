var mongoose = require('mongoose');
var User = mongoose.model('User');
var TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function(passport) {

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });
    passport.use(new TwitterStrategy({
        consumerKey: 'HUIEgxXucwZWH0GSxkovZ4LfG',
        consumerSecret: 'Wojw7H5PuCZLlb1JjvOaYNgf02pmUxuNBC6BGqXZ1gMMC9ina7',
        callbackURL: '/auth/twitter/callback'
    }, function (accessToken, refreshToken, profile, done) {
        User.findOne({provider_id: profile.id}, function (err, user) {
            if (err) throw(err);
            if (!err && user != null) return done(null, user);

            var user = new User({
                provider_id: profile.id,
                provider: profile.provider,
                name: profile.displayName,
                photo: profile.photos[0].value
            });
            user.save(function (err) {
                if (err) throw err;
                req.session.username = profile.displayName;
                done(null, user);
            });
        });
    }));
}
