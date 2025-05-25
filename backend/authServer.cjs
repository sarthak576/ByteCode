 
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(new GitHubStrategy({
  clientID: 'Ov23li8BTGCh2YI0Vtqh',
  clientSecret: 'ffc4ce28308376afc470300353d927e037638077',
  callbackURL: "http://localhost:3000/auth/github/callback"
},
function(accessToken, refreshToken, profile, done) {
  // You can add MongoDB logic here
  return done(null, profile);
}));

app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Redirect to frontend with user data
res.redirect(`http://localhost:5173/codeeditor?user=${encodeURIComponent(JSON.stringify(req.user))}`);
  });

  app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // ✅ Redirect to CodeEditor with user data as URL param
    res.redirect(`http://localhost:5173/codeeditor?user=${encodeURIComponent(JSON.stringify(req.user))}`);
  });


app.listen(3000, () => console.log('Auth server running on http://localhost:3000'));
