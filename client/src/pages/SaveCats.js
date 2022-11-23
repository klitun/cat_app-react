import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import Auth from '../utils/auth';

//Remove the useEffect() Hook that sets the state for UserData.

//Instead, use the useQuery() Hook to execute the GET_ME query on load and save it to a variable named userData.
import {useQuery,useMutation } from '@apollo/client'
import { GET_ME } from '../utils/queries'

//Use the useMutation() Hook to execute the REMOVE_Cat mutation in the handleDeleteCat() function instead of the deleteCat() function that's imported from API file. (Make sure you keep the removeCatId() function in place!)
import {removeCatId} from '../utils/localStorage'
import {REMOVE_Cat} from '../utils/mutations'

const SavedCats = () => {
  const [removeCat, { error }] = useMutation(REMOVE_Cat);
  const {loading,data} = useQuery(GET_ME);
  const userData = data?.me || {};

  // create function that accepts the cat's mongo _id value as param and deletes the cat from the database
  const handleDeleteCat = async (CatId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const {data} = await removeCat({
        variables: {catId},
      });

      if (error) {
        throw new Error('something went wrong!');
      }
      // upon success, remove cat's id from localStorage
      removeCatId(catId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved cats!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.saveCats.length
            ? `Viewing ${userData.saveCats.length} saved ${userData.saveCats.length === 1 ? 'cat' : 'cats'}:`
            : 'You have no saved cat!'}
        </h2>
        <CardColumns>
          {userData.saveCats.map((cat) => {
            return (
              <Card key={cat.catId} border='dark'>
                {cat.image ? <Card.Img src={cat.image} alt={`The cover for ${cat.name}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{cat.name}</Card.Title>
                  <p className='small'>Kind: {cat.kind}</p>
                  <Card.Text>{cat.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteCat(cat.catId)}>
                     You really want to remove it?
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SaveCats;
