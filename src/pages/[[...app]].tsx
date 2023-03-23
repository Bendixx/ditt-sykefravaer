import { BodyLong, Heading, Link } from '@navikt/ds-react'
import React from 'react'

const App = () => {
    return (
        <>
            <header className="sidebanner">
                <div style={{ paddingTop: '2rem', paddingLeft: '2rem' }}>
                    <Heading size="xlarge" level="1">
                        Denne demoappen er flyttet
                    </Heading>
                    <BodyLong>
                        Grunnet avvikling av cluster labs-gcp er demoappene flyttet til
                        https://demo.ekstern.dev.nav.no/syk/sykefravaer
                    </BodyLong>
                    <BodyLong>Se også post i kanalen #flex på slack</BodyLong>
                    <Link href={'https://demo.ekstern.dev.nav.no/syk/sykefravaer'}>
                        https://demo.ekstern.dev.nav.no/syk/sykefravaer
                    </Link>
                </div>
            </header>
        </>
    )
}

export default App
