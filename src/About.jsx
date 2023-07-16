import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

export const About = ()=> {
    return (
        <Container><Row>
            <h2>About Noodle</h2>
            
            <p>Scheduling events <em>used</em> to be easy on the other sites. Then they started to suck. Intrusive ads, pop-ups, forced logins, slow-loading pages, all that jazz.</p>

<p>Noodle is a new take on event scheduling. No ads, no logins, no emails you don't want.</p>
</Row><Row><Col>Noodle was made by <a href="https://github.com/rkaufman13">Rachel Kaufman</a>, with lots of help from <a href="#">Sarah Tonsager</a> and <a href="https://chriscombs.net">Chris Combs</a>.
</Col></Row></Container>
    )
}