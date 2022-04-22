import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from 'models/User';
import bcrypt from 'bcrypt';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Username and Password',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        if (credentials === undefined) {
          throw Error('Invalid Credentials.');
        }
        const user = await User.findOne({ username: credentials.username });
        const result = await bcrypt.compare(credentials.password, user.password);

        if (result) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
});
