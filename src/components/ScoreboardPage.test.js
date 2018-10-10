import React from 'react';
import renderer from 'react-test-renderer';
import ScoreboardPage from './ScoreboardPage';

// it('Scoreboard Page renders correctly', () => {
//   const tree = renderer
//     .create(<ScoreboardPage timeout={1}/>)
//     .toJSON();
//   expect(tree).toMatchSnapshot();
// });

import ShallowRenderer from 'react-test-renderer/shallow'

it('Matches snapshot', () => {
  const renderer = new ShallowRenderer()
  const result = renderer.render(<ScoreboardPage />)
  expect(result).toMatchSnapshot()
})