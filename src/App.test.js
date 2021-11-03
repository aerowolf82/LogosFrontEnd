import { render, screen, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import App from './App';
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { createMemoryHistory } from 'history'
import SpaceCraft from './Components/SpaceCraft';
import SpaceCraftList from './Components/SpaceCraftList';
import ReactRouter from 'react-router';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event'
import PadsList from './Components/PadsList'
import pad from './Components/Pad'

//SPACECRAFT
describe('Testing the /spacecraft endpoint', () => {
  it('should load the app', () => {
    render(<App />);
    const home = screen.getAllByText(/home/i);
    expect(home[0]).toBeInTheDocument();
    const spacecraft = screen.getAllByText(/spacecraft/i);
    expect(spacecraft[0]).toBeInTheDocument();
    const pad = screen.getAllByText(/pads/i);
    expect(spacecraft[0]).toBeInTheDocument();
  });

  it('should render a list of items from our mock data', async () => {
    render(<App />);
    let wait = await screen.findByText(/home/i);
    fireEvent.click(screen.getByText(/space craft list/i))
    wait = await screen.findByText(/Soyuz MS-03/i);
    expect(screen.getByText(/Soyuz MS-03/i)).toBeInTheDocument();
    expect(screen.getByText(/Gemini SC12/i)).toBeInTheDocument();
  });

});

describe('Testing the individual spacecraft endpoint', () => {
  it('should load the spacecraft page', async () => {

    const history = createMemoryHistory()
    const route = 'http://localhost:3000/spacecraft'
    history.push(route)

    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ spaceId: 0 });

    render(
      <Router history={history}>
        <SpaceCraft spaceData={[{ id: 1, name: 'Soyuz MS-03' }]} />
      </Router>
    );
    let wait = await screen.findByText('Soyuz MS-03');
    const name = screen.getByText('Soyuz MS-03');
    expect(name).toBeInTheDocument();
  });
});

describe('Testing dropdown menus', () => {
  it('should contain a dropdown', async () => {

    const history = createMemoryHistory()
    const route = 'http://localhost:3000/'
    history.push(route)

    jest.spyOn(ReactRouter, 'useRouteMatch').mockReturnValue({ url: '/spacecraft', path: '/spacecraft' });

    // await act(async () => {
    //   render(
    //     <Router history={history}>
    //       <SpaceCraftList spaceData={[{ id: 1, name: 'BatSat' }]} family={[{ id: 0, name: 'I\'m batman' }]} />
    //     </Router>
    //   )
    // })

    render(
      <Router history={history}>
        <SpaceCraftList spaceData={[{ id: 1, name: 'BatSat' }]} family={[{ id: 0, name: 'I\'m batman' }]} />
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


//PADS
describe('Testing the /Pads url', () => {
  it('should load the pads page', () => {

    const history = createMemoryHistory()
    const route = 'http://localhost:3000/'
    history.push(route)

    jest.spyOn(ReactRouter, 'useRouteMatch').mockReturnValue({ url: '/pads', path: '/pads' });

    render(
      <Router history={history}>
        <PadsList padData={[{ id: 1, pad_name: 'test' }]} />
      </Router>
    );
    const pad = screen.getAllByText(/test/i);
    expect(pad[0]).toBeInTheDocument();
  });
});
//test localhost/pad/:padid
