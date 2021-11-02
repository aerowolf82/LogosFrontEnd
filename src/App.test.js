import { render, screen } from '@testing-library/react';
import App from './App';
import { rest } from 'msw'
import { setupServer } from 'msw/node'

describe('Testing the /spacecraft endpoint', () => {
  const server = setupServer(
    rest.get('http://localhost:3001/spacecraft/', (request, response, context) => {
      return response(
        context.json(

          [{
            "id": 1,
            "name": "Mercury-over9000",
            "description": "the satellite will knock your socks off",
            "family": "Mercury",
            "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Mariner_10.jpg/1200px-Mariner_10.jpg",
            "launch vehicle": "TO THE MOON",
            "history": "Mercury is a planet. lets explore it",
            "launch_date": "1776",
            "height": "over 9000",
            "diameter": "also over 9000",
            "pad_name": ""
          },
          {
            "movieId": 2,
            "metascore": "90",
            "boxOffice": "N/A",
            "rated": "PG",
            "director": "George Lucas",
            "title": "Star Wars: Episode IV - A New Hope",
            "actors": "Mark Hamill, Harrison Ford, Carrie Fisher, Peter Cushing",
            "response": "True",
            "year": "1977",
            "poster": "https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
            "genre": "Action, Adventure, Fantasy, Sci-Fi"
          }

          ]
        ))


    })
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())
  
  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });
});