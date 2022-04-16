import { Amplify } from 'aws-amplify'
import { defineNuxtPlugin } from '@nuxtjs/composition-api'

export default defineNuxtPlugin(({ $config }) => {
  Amplify.configure({
    Auth: {
      region: $config.region,
      userPoolId: $config.userPoolId,
      userPoolWebClientId: $config.userPoolClientId,
      // identityPoolId,
      // authenticationFlowType: 'USER_PASSWORD_AUTH',
    },
    API: {
      aws_project_region: $config.region,
      aws_appsync_region: $config.region,
      aws_appsync_graphqlEndpoint: $config.appsyncEndpoint,
      aws_appsync_authenticationType: 'AMAZON_COGNITO_USER_POOLS',
    },
  })

  Amplify.configure({
    API: {
      graphql_headers: async () => {
        const session = await Amplify.Auth.currentSession()
        return {
          Authorization: session.getIdToken().getJwtToken(),
        }
      },
    },
  })
})
