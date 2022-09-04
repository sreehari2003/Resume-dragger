import passport from 'passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
// import { isExist } from '../../server/middleware/isAuthExist';

passport.use(
    new Strategy(
        {
            clientID: process.env.CLIENT_ID!,
            clientSecret: process.env.CLIENT_SECRET!,
            callbackURL: 'http://localhost:8080/auth/google/redirect',
            // passReqToCallback: true,
            scope: ['profile', 'email'],
        },
        async (
            _accessToken: string,
            _refreshToken: string,
            profile: Profile,
            done: VerifyCallback
        ) => {
            done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(user);
});

passport.deserializeUser((user, done) => {
    done(user);
});
