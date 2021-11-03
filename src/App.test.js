import { render, screen, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import App from './App';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import {createMemoryHistory} from 'history'
import SpaceCraft from './Components/SpaceCraft';
import SpaceCraftList from './Components/SpaceCraftList';
import ReactRouter from 'react-router';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event'

describe('Testing the /spacecraft endpoint', () => {
  const server = setupServer(
    //change get request location to intercept calls to the server
    rest.get('https://lldev.thespacedevs.com/2.2.0/spacecraft/', (request, response, context) => {
      return response(
        context.json(
          {
            //change to an array of object when receiving data from the actual server
            results: [{
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
              "pad_name": "THIS IS A TEST OF THE GIANT VOICE",
              "pad_location": "atlantis"
            },
            {
              "id": 2,
              "name": "RadarSat",
              "description": "radar for days",
              "family": "RadarSat",
              "image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Mariner_10.jpg/1200px-Mariner_10.jpg",
              "launch vehicle": "Falcon-9",
              "history": "you get radar and you get radar!",
              "launch_date": "2021",
              "height": "9m",
              "diameter": "5m",
              "pad_name": "SLC-4",
              "pad_location": "VSFB"
            }]
          }
          
        ))
    })
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())
  
  it('should load the page', () => {
    render(<App />);
    const home = screen.getAllByText(/home/i);
    expect(home[0]).toBeInTheDocument();
    const spacecraft = screen.getAllByText(/spacecraft/i);
    expect(spacecraft[0]).toBeInTheDocument();
  });

  it('should render a list of items from our mock data', async () => {
    render(<App />);
    let wait = await screen.findByText(/home/i);
    fireEvent.click(screen.getByText(/space craft list/i))
    wait = await screen.findByText(/Mercury-over9000/i);
    expect(screen.getByText(/Mercury-over9000/i)).toBeInTheDocument();
    expect(screen.getByText(/RadarSat/i)).toBeInTheDocument();
  });

});

describe('Testing the individual spacecraft endpoint', () => {
  it('should load the page', async () => {

    const history = createMemoryHistory()
    const route = 'http://localhost:3000/spacecraft'
    history.push(route)

    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ spaceId: 0 });

    render(
      <Router history={history}>
        <SpaceCraft spaceData={[{id:1, name:'Mercury-over9000'}]} />
      </Router>
    );
    let wait = await screen.findByText('Mercury-over9000');
    const name = screen.getByText('Mercury-over9000');
    expect(name).toBeInTheDocument();
  });
});

describe('Testing dropdown menus', () => {
  it('should contain a dropdowns', async () => {

    const history = createMemoryHistory()
    const route = 'http://localhost:3000/'
    history.push(route)

    jest.spyOn(ReactRouter, 'useRouteMatch').mockReturnValue({ url: '/spacecraft', path: '/spacecraft'});

    render(
      <Router history={history}>
        <SpaceCraftList spaceData={[{id:1, name:'BatSat'}]} family ={[{id: 0, name: 'I\'m batman'}]} />
      </Router>
    );
    const dropdown = screen.getAllByRole('combobox');
    expect(dropdown).toHaveLength(1);
    //update this test to get rid of "wrapped in act() warning"
    userEvent.type(dropdown[0], 'I\'m bat')
    userEvent.type(dropdown[0], '{arrowdown}')
    userEvent.type(dropdown[0], '{enter}')
    expect(dropdown[0].value).toBe('I\'m batman')
  });
});

//test localhost/pads
//test localhost/pad/:padid

    
