import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
    query {
        repositories {
            edges {
                node {
                    id
                    fullName
                    reviewCount
                    ratingAverage
                    forksCount
                    stargazersCount
                    description
                    language
                    ownerAvatarUrl
                }
            }
        }
    }
`;

export const GET_USERS = gql`
    query {
        users {
            edges {
                node {
                    username
                }
            }
        }
    }
`;

export const CHECK_USER = gql`
    query {
        me {
            id
            username
        }
    }
`;

export const GET_ONE_USER_REPO = gql`
    query ($id: ID!) {
        repository(id: $id) {
            id
            fullName
            reviewCount
            ratingAverage
            forksCount
            stargazersCount
            description
            language
            ownerAvatarUrl
            url
        }
    }
`;