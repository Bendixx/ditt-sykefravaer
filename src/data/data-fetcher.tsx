import Spinner from 'nav-frontend-spinner'
import React, { useEffect } from 'react'

import IngenData from '../pages/feil/ingen-data'
import { RSSoknad } from '../types/rs-types/rs-soknad'
import { RSVedtakWrapper } from '../types/rs-types/rs-vedtak'
import { Soknad } from '../types/soknad'
import { Sykmelding } from '../types/sykmelding'
import env from '../utils/environment'
import { logger } from '../utils/logger'
import useFetch from './rest/use-fetch'
import { FetchState, hasAny401, hasAnyFailed, hasData, isAnyNotStartedOrPending, isNotStarted } from './rest/utils'
import { useAppStore } from './stores/app-store'

export function DataFetcher(props: { children: any }) {
    const {
        setSoknader,
        setRsVedtak,
        setSykmeldinger,
        setSnartSluttPaSykepengene,
    } = useAppStore()
    const rssoknader = useFetch<RSSoknad[]>()
    const rsVedtak = useFetch<RSVedtakWrapper[]>()
    const sykmeldinger = useFetch<Sykmelding[]>()
    const snartSlutt = useFetch<boolean>()


    useEffect(() => {
        if (isNotStarted(rssoknader)) {
            rssoknader.fetch(env.flexGatewayRoot + '/syfosoknad/api/soknader', {
                credentials: 'include',
            }, (fetchState: FetchState<RSSoknad[]>) => {
                if (hasData(fetchState)) {
                    setSoknader(fetchState.data!.map(soknad => {
                        return new Soknad(soknad)
                    }))
                }
            })
        }

        if (isNotStarted(snartSlutt)) {
            snartSlutt.fetch(env.flexGatewayRoot + '/syfosoknad/api/syfosyketilfelle/39ukersvarsel', {
                credentials: 'include',
            }, (fetchState: FetchState<boolean>) => {
                if (hasData(fetchState)) {
                    setSnartSluttPaSykepengene(fetchState.data)
                }
            })
        }

        if (isNotStarted(rsVedtak)) {
            rsVedtak.fetch(env.flexGatewayRoot + '/spinnsyn-backend/api/v2/vedtak', {
                credentials: 'include',
            }, (fetchState: FetchState<RSVedtakWrapper[]>) => {
                if (hasData(fetchState)) {
                    setRsVedtak(fetchState.data)
                }
            })
        }

        if (isNotStarted(sykmeldinger)) {
            sykmeldinger.fetch(env.sykmeldingerBackendProxyRoot + '/api/v1/sykmeldinger', {
                credentials: 'include',
            }, (fetchState: FetchState<Sykmelding[]>) => {
                if (hasData(fetchState)) {
                    setSykmeldinger(fetchState.data)
                }
            })
        }

        // eslint-disable-next-line
    }, [rssoknader, rsVedtak, snartSlutt, sykmeldinger]);

    if (hasAny401([ rssoknader, rsVedtak, sykmeldinger ])) {
        window.location.href = hentLoginUrl()

    } else if (isAnyNotStartedOrPending([ rsVedtak, sykmeldinger, rssoknader, snartSlutt ])) {
        return <Spinner type={'XXL'} />

    } else if (hasAnyFailed([ rssoknader, rsVedtak, sykmeldinger, snartSlutt ])) {
        // TODO være litt mer graceful ved feil?
        logger.error(`Klarer ikke hente en av disse [ rssoknader = ${rssoknader.httpCode}, rsVedtak = ${rsVedtak.httpCode} ]`)
        return <IngenData />
    }

    return props.children
}

export const hentLoginUrl = () => {
    return `${env.loginServiceUrl}?redirect=${env.loginServiceRedirectUrl}`
}
