import { useQuery } from 'react-query'

import { NarmesteLeder } from '../types/narmesteLeder'
import { fetchJson } from '../utils/fetch'

export default function UseNarmesteledere() {
    return useQuery<NarmesteLeder[], Error>('narmesteledere', () =>
        fetchJson('/syk/sykefravaer/api/narmesteleder/user/v2/sykmeldt/narmesteledere'),
    )
}
