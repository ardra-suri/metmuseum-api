import { useRouter } from 'next/router';
import { Row, Col } from 'your-ui-library';
import ArtworkCardDetail from './ArtworkCardDetail';

const ArtworkPage = () => {
    const router = useRouter();
    const { objectID } = router.query;
  
    return (
      <Row>
        <Col>
          <ArtworkCardDetail objectID={objectID} />
        </Col>
      </Row>
    );
  };
  
  export default ArtworkPage;
  