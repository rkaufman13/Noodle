import React from "react";
import { Helmet } from "react-helmet";

export const About = () => {
  return (
    <>
      <Helmet>
        <title>Noodle Scheduling ~ About Noodle</title>
      </Helmet>
      <h2>About Noodle</h2>

      <p>
        Scheduling events <em>used</em> to be easy on the other sites. Then they
        started to suck. Intrusive ads, pop-ups, forced logins, slow-loading
        pages, all that jazz.
      </p>

      <p>
        Noodle is a new take on event scheduling. No ads, no logins, no emails
        you don't want.
      </p>
      <p>
        Noodle was made by{" "}
        <a href="https://github.com/rkaufman13">Rachel Kaufman</a>, with lots of
        help from{" "}
        <a href="https://www.linkedin.com/in/sarah-tonsager-9837b139/">
          Sarah Tonsager
        </a>{" "}
        and <a href="https://chriscombs.net">Chris Combs</a>.
      </p>
    </>
  );
};
