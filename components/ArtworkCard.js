import useSWR from 'swr';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import Error from 'next/error';

export default function ArtworkCard(props) {
  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`);

  if (error) {
    return <Error statusCode={404} />;
  }

  if (data) {
    const { objectID, primaryImageSmall, title, objectDate, classification, medium } = data;

    return (
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={primaryImageSmall || "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"} />
        <Card.Body>
          <Card.Title className='font-weight-light'>{title ? title : 'N/A'}</Card.Title>
          <Card.Text>
            <strong>Date:</strong> {data.objectDate || 'N/A'}<br />
            <strong>Classification:</strong> {data.classification || 'N/A'}<br />
            <strong>Medium:</strong> {data.medium || 'N/A'}<br /><br />
            <Link href={`/artwork/${objectID}`} passHref>
              <Button variant="outline-dark">ID: {objectID}</Button>
            </Link>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  } else {
    return null;
  }
}