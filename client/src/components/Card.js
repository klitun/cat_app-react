import React from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';


function catCard(cats) {
  return (
{/* <div>
<div className="card" >
  <img className="card-img-top" alt='Travel Image' src={cats.src} > </img>
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <p className="card-text">{cats.description}</p>
    <a href="#" className="btn btn-primary">More Info</a>
    <a href="#" className="btn btn-primary">Donate</a>
  </div>
</div>
</div> */}


{/* <Card key={cat} border='dark'>
                {cat.image ? (
                  <Card.Img src={cat.image} alt={`Photo of ${cat.name}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{cat.name}</Card.Title>          
                  <Card.Text>{cat.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={saveCat?.some((savedCatId) => savedCatId === cat.catId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveCat(cat.catId)}>
                      {savedCatIds?.some((savedCatId) => savedCatId === cat.catId)
                        ? 'You already favorited this cat'
                        : 'Favorite this cat'}
                    </Button>
                  )}
                </Card.Body>
              </Card> */}
  );
}

export default catCard;