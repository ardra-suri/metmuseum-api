import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { favouritesAtom, searchHistoryAtom } from '@/store'
import { useAtom } from 'jotai'
import { getFavourites, getHistory } from '@/lib/userData'
import { isAuthenticated } from '@/lib/authenticate';

const PUBLIC_PATHS = ['/login', '/', '/_error', '/register']

export default function RouteGuard(props) {

    const [authorized, setAuthorized] = useState(false);
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
    const [history, setSearchHistory] = useAtom(searchHistoryAtom)
    const router = useRouter()

    async function updateAtoms() {
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
    }

    useEffect(() => {
        updateAtoms()
        authCheck(router.pathname)

        router.events.on('routeChangeComplete', authCheck)

        return () => {
            router.events.off('routeChangeComplete', authCheck)
        }
    }, [])

    function authCheck(url) {
        const path = url.split('?')[0];
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
          setAuthorized(false);
          router.push('/login');
        } else {
          setAuthorized(true);
        }
      }

    return <>{authorized && props.children}</>
}