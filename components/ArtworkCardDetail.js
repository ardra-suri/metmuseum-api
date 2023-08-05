import useSWR from 'swr';
import Error from 'next/error';
import { Card, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store'
import { addToFavourites, removeFromFavourites } from '@/lib/userData';

export default function ArtworkCard(props) {

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(false);

    useEffect(() => {
        setShowAdded(favouritesList?.includes(props.objectID))
    }, [favouritesList])

    const favouritesClicked = async () => {
        if (showAdded) {
            setFavouritesList(await removeFromFavourites(props.objectID)) 
            setShowAdded(false)
        }
        else {
            setFavouritesList(await addToFavourites(props.objectID))
            setShowAdded(true)
        }
    }

    const { data, error } = useSWR(props.objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}` : null);

    if (error) {
        return <Error statusCode={404} />
    }
    if (data) {
        return (
            <Card className='w-100' style={{ width: '18rem' }}>
                <Card.Img variant="top" src={data.primaryImage} />
                <Card.Body>
                    <Card.Title>{data.title ? data.title : 'N/A'}</Card.Title>
                    <Card.Text>
                        <strong>Date: </strong>{data.objectDate || 'N/A'}<br />
                        <strong>Classification: </strong>{data.classification || 'N/A'}<br />
                        <strong>Medium: </strong>{data.medium || 'N/A'}
                        <br /><br />
                        <strong>Artist: </strong>{data.artistDisplayName ? data.artistDisplayName : 'N/A'} ( {data.artistWikidata_URL ? <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" style={{ 'color': 'gray' }}>wiki</a> : null} )<br />
                        <strong>Credit Line: </strong>{data.creditLine ? data.creditLine : 'N/A'}<br />
                        <strong>Dimensions: </strong>{data.dimensions ? data.dimensions : 'N/A'}<br />
                        <br />
                        <Button onClick={e => favouritesClicked()} variant={showAdded ? 'dark' : 'outline-dark'}>{showAdded ? '+ Favourite (added)' : '+ Favourite'}</Button>

                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
    else {
        return null
    }

}
