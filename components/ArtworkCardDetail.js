import useSWR from 'swr';
import Error from 'next/error';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';

export default function ArtworkCard(props) {
    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`);

    if (error) {
        return <Error statusCode={404} />
    }
    if (data) {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={data.primaryImageSmall} />
                <Card.Body>
                    <Card.Title>{data.title ? data.title : 'N/A'}</Card.Title>
                    <Card.Text>
                        Date: {data.objectDate || 'N/A'}<br />
                        Classification: {data.classification || 'N/A'}<br />
                        Medium: {data.medium || 'N/A'}
                        <br /><br />
                        {data.artistDisplayName ? data.artistDisplayName : 'N/A'}
                        {data.creditLine ? data.creditLine : 'N/A'}
                        {data.dimensions ? data.dimensions : 'N/A'}
                        {data.artistWikidata_URL ? <a href={data.artistWikidata_URL} target="_blank" rel="noreferrer" >wiki</a> : null}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
    else {
        return null
    }

}