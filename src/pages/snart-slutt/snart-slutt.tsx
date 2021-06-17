import './snartslutt.less'

import parser from 'html-react-parser'
import { VenstreChevron } from 'nav-frontend-chevron'
import Ekspanderbartpanel from 'nav-frontend-ekspanderbartpanel'
import { Hovedknapp, Knapp } from 'nav-frontend-knapper'
import { Element, Normaltekst, Sidetittel, Systemtittel } from 'nav-frontend-typografi'
import Veilederpanel from 'nav-frontend-veilederpanel'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'

import Banner from '../../components/banner/banner'
import Bjorn from '../../components/bjorn/bjorn'
import Brodsmuler, { Brodsmule } from '../../components/brodsmuler/brodsmuler'
import { penger } from '../../grafikk/penger'
import { veilederDame } from '../../grafikk/veileder-dame'
import env from '../../utils/environment'
import { tekst } from '../../utils/tekster'
import { setBodyClass } from '../../utils/utils'

const brodsmuler: Brodsmule[] = [
    { tittel: 'Ditt NAV', sti: env.dittNavUrl, erKlikkbar: true },
    { tittel: 'Ditt sykefravær', sti: env.sykefravaerUrl, erKlikkbar: true },
    { tittel: 'Varsling', sti: '/arbeidsrettet-oppfolging', erKlikkbar: false }
]

const SnartSlutt = () => {
    const history = useHistory()

    useEffect(() => {
        setBodyClass('snartslutt')
    }, [])

    // TODO: Sjekk logikken i handleButtonClicked-funksjonene med gammel app

    const handleJaBtnClicked = () => {
        history.push('/arbeidssokerregistrering/start?fraSykefravaer=true')
    }

    const handleNeiBtnClicked = () => {
        history.push('/sykefravaer')
    }

    return (
        <div>
            <Banner>
                <Sidetittel className="sidebanner__tittel">
                    {tekst('sidetittel.snartslutt')}
                </Sidetittel>
            </Banner>

            <Brodsmuler brodsmuler={brodsmuler} />

            <div className="limit">
                <Bjorn>
                    <Normaltekst>{tekst('snartslutt.bjorntekst')}</Normaltekst>
                </Bjorn>

                <Systemtittel tag="h2" className="subtittel">
                    {tekst('snartslutt.hva_nå')}
                </Systemtittel>

                <Veilederpanel svg={veilederDame}>
                    <Element tag="h3">
                        {tekst('snartslutt.snakk_med.tittel')}
                    </Element>
                    <Normaltekst>
                        {tekst('snartslutt.snakk_med.tekst')}
                    </Normaltekst>
                </Veilederpanel>

                <Veilederpanel svg={penger}>
                    <Element tag="h3">
                        {tekst('snartslutt.planlegg.tittel')}
                    </Element>
                    <Normaltekst>
                        {tekst('snartslutt.planlegg.tekst')}
                    </Normaltekst>
                </Veilederpanel>

                <Systemtittel tag="h2" className="subtittel">
                    {tekst('snartslutt.andre')}
                </Systemtittel>

                <Ekspanderbartpanel className="byttjobb" tittel={
                    <>
                        <Systemtittel tag="h3">
                            {tekst('snartslutt.bytt_jobb.tittel')}
                        </Systemtittel>
                        <Normaltekst>
                            {tekst('snartslutt.snakk_med.tekst')}
                        </Normaltekst>
                    </>
                }>
                    <ul>
                        <Normaltekst tag="li">
                            {parser(tekst('snartslutt.bytt_jobb.liste.del1'))}
                        </Normaltekst>
                        <Normaltekst tag="li">
                            {parser(tekst('snartslutt.bytt_jobb.liste.del2'))}
                        </Normaltekst>
                    </ul>
                </Ekspanderbartpanel>

                <Ekspanderbartpanel className="okonomien" tittel={
                    <>
                        <Systemtittel tag="h3">
                            {tekst('snartslutt.okonomien.tittel')}
                        </Systemtittel>
                        <Normaltekst>
                            {tekst('snartslutt.okonomien.tekst')}
                        </Normaltekst>
                    </>
                }>
                    <Normaltekst>
                        {tekst('snartslutt.okonomien.innhold.avsnitt1')}
                    </Normaltekst>
                    <Normaltekst>
                        {tekst('snartslutt.okonomien.innhold.avsnitt2')}
                    </Normaltekst>
                    <Normaltekst>
                        {tekst('snartslutt.okonomien.innhold.avsnitt3')}
                    </Normaltekst>
                </Ekspanderbartpanel>

                <Systemtittel tag="h2" className="subtittel">
                    {tekst('snartslutt.veiledning')}
                </Systemtittel>

                <div className="knapperad">
                    <Hovedknapp onClick={handleJaBtnClicked}>
                        {tekst('snartslutt.veiledning.ja')}
                    </Hovedknapp>
                    <Knapp onClick={handleNeiBtnClicked}>
                        {tekst('snartslutt.veiledning.nei')}
                    </Knapp>
                </div>

                <Link to="/sykefravaer" className="lenke">
                    <VenstreChevron />
                    <Normaltekst tag="span">Til hovedsiden Ditt sykefravaer</Normaltekst>
                </Link>
            </div>
        </div>
    )
}

export default SnartSlutt