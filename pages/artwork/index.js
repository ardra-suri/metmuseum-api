import validObjectIDList from '@/public/data/validObjectIDList.json'
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Row, Col, Card, Pagination } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';
import Error from 'next/error';
const PER_PAGE = 12;

export default function Artwork() {
  const [artworkList, setArtworkList] = useState([]);
  const [page, setPage] = useState(1);

  const router = useRouter();
  let finalQuery = router.asPath.split('?')[1];

  const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`);

  function previousPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  function nextPage() {
    setPage(page + 1);
  };

  useEffect(() => {
    if (data) {
      const results = [];
      let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs?.includes(x));
      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }
      setArtworkList(results);
    }
  }, [data]);

  useEffect(() => {
    setPage(1);
  }, []);

  if (error) {
    return <Error statusCode={404} />;
  }

  return (
    <div>
      {artworkList !== null && artworkList !== undefined ? (
        <Row className="gy-4">
          {artworkList.length > 0 ? (
            artworkList[page - 1]?.map((currID) => (
              <Col lg={3} key={currID}>
                <ArtworkCard objectID={currID} />
              </Col>
            ))
          ) : (
            <Card>
              <Card.Body>
                <h4>Nothing Here</h4>
                <p>Try searching for something else.</p>
              </Card.Body>
            </Card>
          )}
        </Row>
      ) : null}

      {artworkList.length > 0 && (
        <Row>
          <Col>
            <Pagination>
              <Pagination.Prev onClick={previousPage} />
              <Pagination.Item>{page}</Pagination.Item>
              <Pagination.Next onClick={nextPage} />
            </Pagination>
          </Col>
        </Row>
      )}
    </div>
  );
}