// //TEMP

// import NextAuth from "next-auth/next";
// // import { CredentialsProvider } from "next-auth/providers";

// export default NextAuth({
//     providers: [
//         CredentialsProvider({
//         name: "Email",
//         credentials: {
//           username: {
//             label: "Email Address",
//             type: "text",
//             placeholder: "Input your email...",
//           },
//           password: {
//             label: "Password",
//             type: "password",
//             placeholder: "Input your password...",
//           },
//         },
//         async authorize(credentials, req) {
//           const user = { id: "1", name: "Daniel Jonathan", email: "danieljonathan@gmail.com" };
  
//           if (user) {
//             return user;
//           } else {
//             return null;
//           }
//         },
//       }),
//     ],
//     pages: {
//       signIn: "/login",
//     },
//   });