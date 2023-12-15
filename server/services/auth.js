const mongoose = require('mongoose');
const passport = require('passport');
const LocalStorategy = require('passport-local');
const crypto = require('crypto');
const User = mongoose.model('User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(null, err);
    });
});

passport.use(
  new LocalStorategy({ usernameField: 'email' }, async function verify(
    email,
    password,
    callback
  ) {
    try {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (!user) {
        return callback(null, false, {
          message: 'Incorrect email or password',
        });
      }

      const isMatch = await user.comparePassword(password);

      if (isMatch) {
        return callback(null, user);
      } else {
        return callback(null, false, {
          message: 'Incorrect email or password',
        });
      }
    } catch (error) {
      return callback(error);
    }
  })
);

const signup = ({ name, email, password, req }) => {
  const user = new User({ name, email, password });
  if (!email || !password) {
    throw new Error('Please provide an email and password');
  }

  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        throw new Error('Email is already in use.');
      }

      return user.save();
    })
    .then((user) => {
      return new Promise((resolve, reject) => {
        req.login(user, (err) => {
          if (err) {
            reject(err);
          }
          resolve(user);
        });
      });
    });
};

// const login = async ({ email, password, req }) => {
//   return new Promise((resolve, reject) => {
//     passport.authenticate('local', (error, user) => {
//       if (error) {
//         console.error('Passport authentication error:', error);
//         return reject(error);
//       }

//       if (!user) {
//         return reject(new Error('Incorrect email or password'));
//       }

//       req.login(user, (error) => {
//         if (error) {
//           console.error('Error during login:', error);
//           return reject(error);
//         }
//         resolve(user);
//       });
//     });
//   })({ body: { email, password } });
// };
async function login({ email, password, req }) {
  return await new Promise((resolve, reject) => {
    passport.authenticate('local', (err, user) => {
      if (err) {
        console.error('Passport authentication error:', err);
        return reject(err);
      }

      if (!user) {
        return reject(new Error('Incorrect Email or Password.'));
      }

      req.login(user, (err) => {
        if (err) {
          console.error('Error during req.login:', err);
          return reject(err);
        }

        resolve(user);
      });
    })({ body: { email, password } });
  });
}

module.exports = { signup, login };
