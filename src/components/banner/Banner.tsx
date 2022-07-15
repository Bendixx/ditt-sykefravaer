import { Heading } from '@navikt/ds-react'
import React from 'react'

interface BannerProps {
    children: React.ReactNode
}

const Banner = ({ children }: BannerProps) => {
    return (
        <header className="sidebanner">
            <div className="limit">
                <img
                    className="sidebanner__ikon"
                    src="/syk/sykefravaer/static/sykefravaer-ikon.svg"
                    alt="Sykepenger"
                />
                <Heading size="large" level="1" className="sidebanner__tittel">
                    {children}
                </Heading>
            </div>
        </header>
    )
}

export default Banner
