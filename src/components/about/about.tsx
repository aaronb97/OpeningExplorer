import React from 'react';
import './about.scss';

const About = () => (
  <div className="about-container">
    <p>
      OpeningExplorer.com is a website with the goal of allowing users to
      easiliy and intuitively explore chess tactics, with an emphasis on the
      names of various moves.
    </p>
    <p>
      Other chess websites have similar opening explorers usually with a focus
      on the number of games that have reached any given position as well as the
      ratio of wins/losses/draws from that position. I wanted to provide a
      experience that delves more into chess nomenclature and history rather
      than act simply as a chess position database.
    </p>
    <p>
      Todo:
      <ul>
        <li>Implement toggleable dark mode</li>
        <li>
          Implement caching mechanism so reloading previously fetched positions
          is not neeeded
        </li>
        <li>Display move popularity on move card / Sort moves by popularity</li>
        <li>Mobile friendly display</li>
      </ul>
    </p>
  </div>
);

export default About;
