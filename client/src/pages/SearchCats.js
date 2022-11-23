//Use the Apollo useMutation() Hook to execute the SAVE_BOOK mutation in the handleSaveBook() function instead of the saveBook() function imported from the API file.
import { useMutation } from '@apollo/react-hooks';
//Make sure you keep the logic for saving the book's ID to state in the try...catch block!

import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
import { searchGoogleCats } from '../utils/API';
import { saveCatIds, getSaveCatIds } from '../utils/localStorage';
import { SAVE_CAT } from '../utils/mutations';

const SearchCats = () => {
  const [saveCat, { error }] = useMutation(SAVE_CAT)
  // create state for holding returned google api data
  const [searchedCats, setSearchedCats] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved catId values
  const [savedCatIds, setSavedCatIds] = useState(getSavedCatIds());

  // set up useEffect hook to save `savedCatIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveCatIds(savedCatIds);
  });

  // create method to search for cats and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const response = await searchGoogleCats(searchInput);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      const catData = items.map((cat) => ({
        catId: cat.id,
        name: cat.volumeInfo.name || ['No cat name to display'],
        kind: cat.volumeInfo.kind,
        description: cat.volumeInfo.description,
        image: cat.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedBooks(CatData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a book to our database
  const handleSaveCat = async (catId) => {
    // find the book in `searchedBooks` state by the matching id
    const catToSave = searchedCats.find((cat) => cat.catId === catId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await saveCat({
        variables: { newcat: {...catToSave}},
      });

      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      // }
      // if book successfully saves to user's account, save book id to state
      setSaveCatIds([...savedCatIds, bookToSave.catId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for Cats!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a cat'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      {/* <Container>
        <h2>
          {searcheCats.length
            ? `Viewing ${searcheCats.length} results:`
            : 'Search for a cat to begin'}
        </h2>
        <CardColumns>
          {searcheCats.map((cat) => {
            return (
              <Card key={cat.catId} border='dark'>
                {cat.image ? (
                  <Card.Img src={cat.image} alt={`The cover for ${cat.name}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{cat.name}}</Card.Title>
                  
                  <Card.Text>{book.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveBook(book.bookId)}>
                      {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                        ? 'This book has already been saved!'
                        : 'Save this Book!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container> */}
    </>
  );
};

export default SearchCats;
