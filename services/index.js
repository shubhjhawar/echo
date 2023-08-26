import { request, gql } from 'graphql-request';

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
    const query = gql`
        query MyQuery {
            postsConnection {
                edges {
                node {
                    author {
                    bio
                    id
                    name
                    photo {
                        url
                    }
                    }
                    createdAt
                    slug
                    title
                    excerpt
                    featuredImage {
                    url
                    }
                    categories {
                    name
                    slug
                    }
                }
            }
        }
    }
`;

    const result = await request(graphqlAPI, query);

    return result.postsConnection.edges;
}


export const getRecentPosts = async () => {
    const query = gql`
        query GetPostDetails() {
            posts(
                orderBy: createdAt_ASC
                last: 3
            ) {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `;
    const result = await request(graphqlAPI, query);
    return result.posts;
}

export const getSimilarPosts = async (categories, slug) => {
    const query=gql`
                # arguments 
        query GetPostDetails($slug: String!, $categories: [String!]) {
            # conditions
            posts(
                where: { slug_not: $slug, AND: {categories_some: { slug_in: $categories}}}
                # slug should not be the one of the main post but the same categoires of the main post
                last: 3
                # last 3 from the db
            ) 
            # things to get from graphql query
            {
                title
                featuredImage {
                    url
                }
                createdAt
                slug
            }
        }
    `
    const result = await request(graphqlAPI, query, {categories, slug});
    return result.posts;
}

export const getCategories = async () => {
    const query = gql`
        query GetCategories {
            categories {
                name
                slug
            }
        }
    `
    const result = await request(graphqlAPI, query);
    return result.categories;
}

// passing the params as the argument (slug in this case)
export const getPostDetails = async (slug) => {
    const query = gql`
        # this is like TS => decalring the type od slug and stating it is important
        query GetPostDetails($slug: String!) {
            # fetching the post where the slug is equal to the slug passed above
            post(where: {slug:$slug}) {
                author {
                    bio
                    id
                    name
                    photo {
                        url
                    }
                    }
                    createdAt
                    slug
                    title
                    excerpt
                    featuredImage {
                    url
                    }
                    categories {
                    name
                    slug
                    }
                    content {
                        raw
                    }
                }
            }`
                                                    // passing the slug here as well
    const result = await request(graphqlAPI, query, {slug});

    return result.post;
}