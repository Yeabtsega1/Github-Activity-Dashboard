// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import { gql } from "@apollo/client";
// import client from "../../lib/apollo-client";

// export default function handler(req, res) {
//   if (req.method === 'GET') {
//     const { username } = req.query
//     client.query({
//       query: gql`
//       query {
//         user(login: "${username}") {
//           name,
//           bio,
//           company,
//           location,
//           websiteUrl,
//           avatarUrl,
//           repositories(last: 8){
//             totalCount,
//             nodes{
//               name,
//               url
//             }
//           },
//           followers(last: 5){
//             totalCount
//           },
//           following(last: 5){
//             totalCount
//           },
//           gists(last: 5){
//             totalCount
//           }
//         },
//         rateLimit {
//           limit
//           cost
//           remaining
//           resetAt
//         }
//       }
//     `,
//     }).then((response) => {
//       // console.log(response)
//       return res.json({ success: true, ...response.data });
//     }).catch((err) => {
//       // console.log(err)
//       return res.json({ success: false, error: err });
//     })
//   }
// }

import { gql } from "@apollo/client";
import client from "../../lib/apollo-client";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ success: false, error: 'Username is required' });
  }

  try {
    const response = await client.query({
      query: gql`
        query {
          user(login: "${username}") {
            name,
            bio,
            company,
            location,
            websiteUrl,
            avatarUrl,
            repositories(last: 8) {
              totalCount,
              nodes {
                name,
                url
              }
            },
            followers(last: 5) {
              totalCount
            },
            following(last: 5) {
              totalCount
            },
            gists(last: 5) {
              totalCount
            }
          },
          rateLimit {
            limit
            cost
            remaining
            resetAt
          }
        }
      `,
    });

    return res.status(200).json({ success: true, ...response.data });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
