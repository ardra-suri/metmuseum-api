import { favouritesAtom } from "@/store";
import { useAtom } from "jotai";
import { Row, Col, Card } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';

export default function Favourites() {
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom)
    if(!favouritesList) return null;
    return (
        <>
            <div>
                {favouritesList !== null && favouritesList !== undefined ? (
                    <Row className="gy-4">
                        {favouritesList.length > 0 ? (
                            favouritesList?.map((currObjID) => (
                                <Col lg={3} key={currObjID}>
                                    <ArtworkCard objectID={currObjID} />
                                </Col>
                            ))
                        ) : (
                            <Card>
                                <Card.Body>
                                    <h4>Nothing Here</h4>
                                    <p>Try adding some new artwork to the list.</p>
                                </Card.Body>
                            </Card>
                        )}
                    </Row>
                ) : null}
            </div>
        </>
    )
}