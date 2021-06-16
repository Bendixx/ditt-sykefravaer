import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock'

import env from '../../utils/environment'
import { defaultPersona, enAvvistSykmelding, enNySykmelding, heltFrisk, Persona } from './data/personas'

const mock = FetchMock.configure({
    enableFallback: true,
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.loggingMiddleware()
    )
})


function setUpMock(persona: Persona) {
    mock.get(`${env.flexGatewayRoot}/syfosoknad/api/soknader`,
        (req, res, ctx) => res(ctx.json(persona.soknader)))

    mock.get(`${env.flexGatewayRoot}/syfosoknad/api/syfosyketilfelle/39ukersvarsel`,
        (req, res, ctx) => res(ctx.json(persona.snartSluttSykepenger)))

    mock.get(`${env.flexGatewayRoot}/spinnsyn-backend/api/v2/vedtak`,
        (req, res, ctx) => res(ctx.json(persona.vedtak)))


    mock.get(`${env.sykmeldingerBackendProxyRoot}/api/v1/sykmeldinger`,
        (req, res, ctx) => res(ctx.json(persona.sykmeldinger)))
}


const href = window.location.href
if (href.includes('helt-frisk')) {
    setUpMock(heltFrisk)
} else if (href.includes('en-ny-sykmelding')) {
    setUpMock(enNySykmelding)
} else if (href.includes('en-avvist-sykmelding')) {
    setUpMock(enAvvistSykmelding)
} else {
    setUpMock(defaultPersona)
}
