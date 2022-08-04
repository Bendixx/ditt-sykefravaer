import { Popover } from '@navikt/ds-react'
import React, { useRef, useState } from 'react'

import { personas } from '../../data/mock/testperson'
import { isMockBackend, isOpplaering } from '../../utils/environment'
import Vis from '../Vis'

const Person = () => {
    const [visInnhold, setVisInnhold] = useState<boolean>(false)
    const person = useRef<HTMLInputElement>(null)
    const kanVelgePerson = isMockBackend() || isOpplaering()

    return (
        <Vis
            hvis={kanVelgePerson}
            render={() => (
                <div
                    style={{
                        position: 'absolute',
                        right: 10,
                        width: 425,
                        height: 400,
                    }}
                >
                    <input
                        type="image"
                        src="/syk/sykefravaer/static/person.svg"
                        alt=""
                        className="brodsmuler__ikon"
                        ref={person}
                        width={32}
                        height={32}
                        style={{ position: 'absolute', right: 10, zIndex: 100 }}
                        onClick={() => setVisInnhold(!visInnhold)}
                    />
                    <Vis
                        hvis={visInnhold}
                        render={() => (
                            <Popover
                                open={true}
                                anchorEl={person.current as HTMLElement}
                                strategy="absolute"
                                placement="left"
                                arrow={false}
                                onClose={() => setVisInnhold(false)}
                            >
                                <Popover.Content>
                                    <ul
                                        style={{
                                            margin: 0,
                                            paddingLeft: '1.4rem',
                                        }}
                                    >
                                        {Object.keys(personas).map((p, idx) => (
                                            <li key={idx}>
                                                <a href={`?testperson=${p}`}>
                                                    {p}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </Popover.Content>
                            </Popover>
                        )}
                    />
                </div>
            )}
        />
    )
}

export default Person
