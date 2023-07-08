/**********************************************************************************
 * WEB422 – Assignment 4*
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 * Name: Ardra Surendran Student ID: 112886213 Date: __2023/7/7____
 
 * *********************************************************************************/

import { Image, Row, Col } from 'react-bootstrap';

const ArtworkPage = () => {
  return (
    <div>
      <Row>
        <Col md={6}>
          <Image src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg" fluid rounded />
        </Col>
        <Col md={6}>
          <p>
            The Metropolitan Museum of Art 
          </p>
          <p>
            The Metropolitan Museum of Art, colloquially referred to as The Met, is one of the largest and most renowned art museums in the world. In 2022 it welcomed 3,208,832 visitors, ranking it eighth on the list of most-visited art museums in the world, and the second-most visited art museum in the United States.The Metropolitan Museum of Art was founded in 1870 with its mission to bring art and art education to the American people. The museum's permanent collection consists of works of art from classical antiquity and ancient Egypt, paintings, and sculptures from nearly all the European Old Masters, and an extensive collection of American and modern art. It is located in New York City and houses a vast collection of artworks from various periods and cultures.
          </p>
          <p>
            For further information, visit <a href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art" target="_blank" rel="noreferrer">Wikipedia entry</a>.
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default ArtworkPage;
