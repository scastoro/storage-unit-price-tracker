import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from 'models/User';
import bcrypt from 'bcrypt';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Username and Password',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'example@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        if (credentials === undefined) {
          throw Error('Invalid Credentials.');
        }
        console.log(credentials);
        const authUser = await User.findOne({ username: credentials.username });
        console.log(authUser);
        const result = await bcrypt.compare(credentials.password, authUser.password);

        // Need to format user object
        const user = {
          email: authUser.username
        }
        if (result) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
