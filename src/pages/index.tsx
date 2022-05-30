import { Alert, Heading, Modal } from '@navikt/ds-react'
import { GetServerSideProps } from 'next'
import React, { useEffect } from 'react'

import Arbeidssituasjon from '../components/arbeidssituasjon/Arbeidssituasjon'
import Banner from '../components/banner/Banner'
import Brodsmuler, { Brodsmule } from '../components/brodsmuler/Brodsmuler'
import { IngenSykmelding } from '../components/ingen-sykmelding/IngenSykmelding'
import Lenker from '../components/lenker/Lenker'
import Oppgaver from '../components/oppgaver/Oppgaver'
import QueryStatusPanel from '../components/queryStatusPanel/QueryStatusPanel'
import TidslinjeUtdrag from '../components/tidslinje-utdrag/TidslinjeUtdrag'
import { setBodyClass } from '../utils/setBodyClass'
import { tekst } from '../utils/tekster'

const brodsmuler: Brodsmule[] = []

const Index = () => {
    useEffect(() => {
        setBodyClass('forside')

        // eslint-disable-next-line
        // @ts-ignore
        Modal.setAppElement('#root')
    }, [])

    return (
        <>
            <Banner>
                <Heading size="xlarge" level="1" className="sidebanner__tittel">
                    {tekst('sidetittel.liste')}
                </Heading>
            </Banner>

            <Brodsmuler brodsmuler={brodsmuler} />

            <div className="limit">
                <QueryStatusPanel />
                <IngenSykmelding />
                <Oppgaver />
                <TidslinjeUtdrag />
                <Arbeidssituasjon />
                <Lenker />

                <Alert variant="info" className="personvern">
                    {tekst('forside.personverninfo')}
                </Alert>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    // Disable static rendring
    return {
        props: {},
    }
}

export default Index