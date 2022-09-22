/* eslint-disable @typescript-eslint/no-var-requires */
const withLess = require('next-with-less')
const { withSentryConfig } = require('@sentry/nextjs')
const withPlugins = require('next-compose-plugins')

const csp = {
    'default-src': ["'none'"],
    'connect-src': [
        "'self'",
        'https://*.nav.no',
        'https://www.google-analytics.com',
        'https://nav.psplugin.com',
        'https://ta-survey-v2.herokuapp.com',
        'https://*.hotjar.com',
        'https://*.hotjar.io',
        'wss://*.hotjar.com',
    ],
    'img-src': [
        "'self'",
        'data:',
        'blob:',
        'https://*.nav.no',
        'https://www.google-analytics.com',
        'https://*.hotjar.com',
    ],
    'font-src': ["'self'", 'data:', 'https://*.psplugin.com', 'https://*.hotjar.com'],
    'frame-src': ["'self'", 'data:', 'https://*.hotjar.com'],
    'worker-src': ['blob:', '*.nais.io'],
    'style-src': ["'self'", "'unsafe-inline'", 'https://*.nav.no', 'https://*.hotjar.com'],
    'script-src': [
        "'self'",
        "'unsafe-inline'",
        "'unsafe-eval'",
        'https://*.nav.no',
        'https://www.googletagmanager.com',
        'https://www.google-analytics.com',
        'https://*.hotjar.com',
        'https://in2.taskanalytics.com',
        'https://account.psplugin.com',
    ],
}

const cspString = Object.entries(csp)
    .map((entry) => `${entry[0]} ${entry[1].join(' ')}`)
    .join('; ')

const cspHeader = [
    {
        key: 'Content-Security-Policy',
        value: cspString,
    },
]

module.exports = withPlugins(
    [
        [withLess],
        [
            (nextConfig) =>
                process.env.ENABLE_SENTRY
                    ? withSentryConfig(nextConfig, {
                          silent: true,
                      })
                    : nextConfig,
        ],
    ],
    {
        async headers() {
            return [
                {
                    source: '/:path*',
                    headers: cspHeader,
                },
                {
                    source: '/api/:path*',
                    headers: [
                        {
                            key: 'Cache-Control',
                            value: 'private, no-cache, no-store, max-age=0, must-revalidate',
                        },
                    ],
                },
            ]
        },
        basePath: '/syk/sykefravaer',
        lessLoaderOptions: {},
        assetPrefix: process.env.ASSET_PREFIX || '',
        serverRuntimeConfig: {
            // Will only be available on the server side
            decoratorEnv: process.env.DECORATOR_ENV,
            noDecorator: process.env.NO_DECORATOR,
            loginserviceUrl: process.env.LOGINSERVICE_URL,
            loginServiceRedirectUrl: process.env.LOGINSERVICE_REDIRECT_URL,
            loginserviceIdportenDiscoveryUrl: process.env.LOGINSERVICE_IDPORTEN_DISCOVERY_URL,
            loginserviceIdportenAudience: process.env.LOGINSERVICE_IDPORTEN_AUDIENCE,
            tokenXWellKnownUrl: process.env.TOKEN_X_WELL_KNOWN_URL,
            tokenXPrivateJwk: process.env.TOKEN_X_PRIVATE_JWK,
            tokenXClientId: process.env.TOKEN_X_CLIENT_ID,
            idportenClientId: process.env.IDPORTEN_CLIENT_ID,
            idportenWellKnownUrl: process.env.IDPORTEN_WELL_KNOWN_URL,
            dittSykefravaerBackendClientId: process.env.DITT_SYKEFRAVAER_BACKEND_CLIENT_ID,
            spinnsynBackendClientId: process.env.SPINNSYN_BACKEND_CLIENT_ID,
            sykmeldingerBackendClientId: process.env.SYKMELDINGER_BACKEND_CLIENT_ID,
            sykepengesoknadBackendClientId: process.env.SYKEPENGESOKNAD_BACKEND_CLIENT_ID,
            narmestelederClientId: process.env.NARMESTELEDER_CLIENT_ID,
            isdialogmoteClientId: process.env.ISDIALOGMOTE_CLIENT_ID,
            syfomotebehovClientId: process.env.SYFOMOTEBEHOV_CLIENT_ID,
            syfomotebehovUrl: process.env.SYFOMOTEBEHOV_URL,
            syfomotebehovHost: process.env.SYFOMOTEBEHOV_HOST,
            veilarboppfolgingHost: process.env.VEILARBOPPFOLGING_HOST,
            veilarboppfolgingClientId: process.env.VEILARBOPPFOLGING_CLIENT_ID,
            syfooppfolgingsplanserviceHost: process.env.SYFOOPPFOLGINGSPLANSERVICE_HOST,
            syfooppfolgingsplanserviceClientId: process.env.SYFOOPPFOLGINGSPLANSERVICE_CLIENT_ID,
        },
        publicRuntimeConfig: {
            // Will be available on both server and client
            mockBackend: process.env.MOCK_BACKEND,
            opplaering: process.env.OPPLAERING,
            sykefravaerUrl: process.env.SYKEFRAVAER_URL,
            minSideUrl: process.env.MINSIDE_URL,
            amplitudeEnabled: process.env.AMPLITUDE_ENABLED,
            environment: process.env.ENVIRONMENT,
            spinnsynFrontendInterne: process.env.SPINNSYN_FRONTEND_INTERNE,
            sykepengesoknadUrl: process.env.SYKEPENGESOKNAD_URL,
            spinnsynUrl: process.env.SPINNSYN_URL,
            sykmeldingUrl: process.env.SYKMELDING_URL,
            aktivitetsplanUrl: process.env.AKTIVITETSPLAN_URL,
            oppfolgingsplanUrl: process.env.OPPFOLGINGSPLAN_URL,
            dialogmoteUrl: process.env.DIALOGMOTE_URL,
        },
    }
)
