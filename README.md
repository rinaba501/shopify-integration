# Shopify Integration Assignment

You will be building both a Dashboard & GraphQL API that Integrate with the Shopify API to get analytics on a Shopify Store.

## Stack / Tools

1. [Retool](https://retool.com/) to build the Dashboard Frontend
2. [Hasura](https://hasura.io/) for the GraphQL API
3. [NextJS](https://nextjs.org/) & [Typescript](https://nextjs.org/docs/basic-features/typescript) for a simple backend REST API
   1. This REST API will interface with the Hasura GraphQL Endpoint for non CRUD GraphQL Queries & Mutations

## Requirements

1. User starts with a blank app in which they can enter a Shopify store url

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
