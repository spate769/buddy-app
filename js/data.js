/* ==========================================================
   Buddy · sample data for the prototype
   Every person and event here is an EXAMPLE. Replace with real
   data from the backend (see README "Connecting a backend").
   Venues are real public places in London, Ontario.
   ========================================================== */
(function () {
  const CATEGORIES = [
    { id: 'basketball', name: 'Basketball' },
    { id: 'movies', name: 'Movies' },
    { id: 'board-games', name: 'Board Games' },
    { id: 'walking', name: 'Walks and Hikes' },
    { id: 'coffee', name: 'Coffee' },
    { id: 'pickleball', name: 'Pickleball' },
    { id: 'running', name: 'Running' },
    { id: 'cooking', name: 'Cooking' },
    { id: 'books', name: 'Book Club' },
    { id: 'music', name: 'Live Music' },
    { id: 'trivia', name: 'Trivia' },
    { id: 'volunteering', name: 'Volunteering' },
    { id: 'art', name: 'Art' }
  ];

  // Area centres (approximate). Used only to estimate distance; never shown as coordinates.
  const AREAS = [
    { id: 'downtown', name: 'Downtown', lat: 42.9849, lng: -81.2453 },
    { id: 'old-north', name: 'Old North', lat: 43.0010, lng: -81.2500 },
    { id: 'western', name: 'Near Western University', lat: 43.0096, lng: -81.2737 },
    { id: 'masonville', name: 'Masonville', lat: 43.0250, lng: -81.2780 },
    { id: 'old-east', name: 'Old East Village', lat: 42.9890, lng: -81.2290 },
    { id: 'wortley', name: 'Wortley Village', lat: 42.9700, lng: -81.2490 },
    { id: 'byron', name: 'Byron', lat: 42.9650, lng: -81.3350 },
    { id: 'westmount', name: 'Westmount', lat: 42.9500, lng: -81.2900 },
    { id: 'oakridge', name: 'Oakridge', lat: 42.9920, lng: -81.3150 },
    { id: 'hyde-park', name: 'Hyde Park', lat: 43.0090, lng: -81.3300 },
    { id: 'fanshawe', name: 'Near Fanshawe College', lat: 43.0130, lng: -81.2000 },
    { id: 'white-oaks', name: 'White Oaks', lat: 42.9300, lng: -81.2300 }
  ];

  // Public meeting places. Group meetups only happen in public places.
  const PLACES = [
    { id: 'western-rec', name: 'Western Student Recreation Centre', area: 'Near Western University', lat: 43.0039, lng: -81.2745 },
    { id: 'hyland', name: 'Hyland Cinema', area: 'Wortley Village', lat: 42.9737, lng: -81.2626 },
    { id: 'central-library', name: 'Central Library', area: 'Downtown', lat: 42.9835, lng: -81.2459 },
    { id: 'springbank', name: 'Springbank Park', area: 'Westmount', lat: 42.9555, lng: -81.3005 },
    { id: 'covent-garden', name: 'Covent Garden Market', area: 'Downtown', lat: 42.9822, lng: -81.2500 },
    { id: 'carling-heights', name: 'Carling Heights Community Centre', area: 'Old East Village', lat: 43.0035, lng: -81.2310 },
    { id: 'the-forks', name: 'The Forks of the Thames', area: 'Downtown', lat: 42.9842, lng: -81.2546 },
    { id: 'western-fair', name: "Western Fair Farmers' Market", area: 'Old East Village', lat: 42.9878, lng: -81.2257 },
    { id: 'byron-library', name: 'Byron Memorial Library', area: 'Byron', lat: 42.9620, lng: -81.3330 },
    { id: 'victoria-park', name: 'Victoria Park', area: 'Downtown', lat: 42.9887, lng: -81.2483 },
    { id: 'gibbons-park', name: 'Gibbons Park', area: 'Old North', lat: 43.0050, lng: -81.2575 },
    { id: 'museum-london', name: 'Museum London', area: 'Downtown', lat: 42.9845, lng: -81.2525 },
    { id: 'masonville-library', name: 'Masonville Library', area: 'Masonville', lat: 43.0240, lng: -81.2820 }
  ];

  const LIFE_STAGES = ['Student', 'Working', 'New to London', 'Parent', 'Kids have left home', 'Retired'];

  // [id, first name, age, gender, life stage, area id, interests]
  // Most sample members are 18 to 30 (our primary customer). A few are older, because everyone 18+ can join.
  // gender: 'woman' | 'man' | 'non-binary'
  const M = [
    ['m1', 'Maya', 24, 'woman', 'Working', 'old-north', ['coffee', 'walking', 'art', 'books']],
    ['m2', 'Jordan', 21, 'man', 'Student', 'western', ['basketball', 'running', 'movies', 'trivia']],
    ['m3', 'Priya', 27, 'woman', 'New to London', 'downtown', ['cooking', 'coffee', 'music', 'volunteering']],
    ['m4', 'Sam', 29, 'non-binary', 'Working', 'wortley', ['board-games', 'movies', 'trivia', 'coffee']],
    ['m5', 'Darnell', 22, 'man', 'Student', 'western', ['basketball', 'music', 'movies']],
    ['m6', 'Leah', 25, 'woman', 'Working', 'byron', ['walking', 'books', 'pickleball', 'cooking']],
    ['m7', 'Tomás', 29, 'man', 'Working', 'old-east', ['running', 'music', 'cooking']],
    ['m8', 'Aisha', 18, 'woman', 'Student', 'western', ['movies', 'art', 'board-games', 'coffee']],
    ['m9', 'Grace', 54, 'woman', 'Kids have left home', 'westmount', ['books', 'walking', 'volunteering', 'art']],
    ['m10', 'Kevin', 38, 'man', 'Parent', 'hyde-park', ['basketball', 'pickleball', 'trivia']],
    ['m11', 'Mei', 26, 'woman', 'Working', 'masonville', ['board-games', 'trivia', 'coffee', 'running']],
    ['m12', 'Owen', 23, 'man', 'Student', 'old-north', ['basketball', 'board-games', 'trivia', 'running']],
    ['m13', 'Fatima', 28, 'woman', 'New to London', 'white-oaks', ['cooking', 'walking', 'volunteering']],
    ['m14', 'Liam', 19, 'man', 'Student', 'western', ['basketball', 'movies', 'music']],
    ['m15', 'Sofia', 24, 'woman', 'Working', 'downtown', ['music', 'art', 'coffee', 'running']],
    ['m16', 'Raj', 27, 'man', 'Working', 'masonville', ['pickleball', 'running', 'trivia']],
    ['m17', 'Hannah', 22, 'woman', 'Student', 'wortley', ['books', 'walking', 'art', 'cooking']],
    ['m18', 'Marcus', 27, 'man', 'Working', 'old-east', ['basketball', 'music', 'board-games']],
    ['m19', 'Chloe', 22, 'woman', 'Student', 'old-north', ['running', 'coffee', 'movies']],
    ['m20', 'Daniel', 42, 'man', 'Parent', 'byron', ['pickleball', 'walking', 'cooking']],
    ['m21', 'Nadia', 29, 'woman', 'Working', 'oakridge', ['pickleball', 'books', 'volunteering', 'walking']],
    ['m22', 'Ethan', 25, 'man', 'Working', 'downtown', ['trivia', 'movies', 'board-games', 'music']],
    ['m23', 'Zoe', 30, 'woman', 'Working', 'wortley', ['art', 'books', 'coffee']],
    ['m24', 'Ali', 21, 'man', 'Student', 'fanshawe', ['basketball', 'running', 'movies']],
    ['m25', 'Rosa', 63, 'woman', 'Retired', 'westmount', ['walking', 'books', 'volunteering', 'cooking']],
    ['m26', 'Ben', 26, 'man', 'New to London', 'white-oaks', ['board-games', 'trivia', 'cooking']],
    ['m27', 'Kiana', 23, 'woman', 'Student', 'fanshawe', ['music', 'art', 'movies', 'coffee']],
    ['m28', 'Paul', 26, 'man', 'Working', 'oakridge', ['pickleball', 'walking', 'trivia']],
    ['m29', 'Jess', 28, 'non-binary', 'Working', 'old-east', ['art', 'music', 'volunteering', 'board-games']],
    ['m30', 'Arjun', 24, 'man', 'New to London', 'masonville', ['basketball', 'cooking', 'movies', 'trivia']],
    ['m31', 'Elena', 30, 'woman', 'Parent', 'hyde-park', ['walking', 'coffee', 'books', 'pickleball']],
    ['m32', 'Noor', 26, 'woman', 'Working', 'downtown', ['running', 'coffee', 'cooking', 'art']],
    ['m33', 'Carol', 24, 'woman', 'Working', 'masonville', ['walking', 'coffee', 'books', 'art']],
    ['m34', 'Diane', 27, 'woman', 'Working', 'old-north', ['pickleball', 'walking', 'cooking', 'books']]
  ];
  const MEMBERS = M.map(([id, name, age, gender, stage, area, interests]) => ({ id, name, age, gender, stage, area, interests, sample: true }));

  // dayOffset is days from today, so events always look upcoming.
  const EVENTS = [
    { id: 'e1', cat: 'basketball', title: 'Pickup Basketball, All Skill Levels', place: 'western-rec', dayOffset: 2, time: '19:00', size: 6, womenOnly: false,
      desc: 'Friendly half-court games. Nobody keeps score for long. Bring indoor shoes and water.', attendees: ['m2', 'm5', 'm12', 'm14', 'm18', 'm24', 'm30', 'm10', 'm22'] },
    { id: 'e2', cat: 'movies', title: 'Indie Movie Night, Then a Drink Nearby', place: 'hyland', dayOffset: 3, time: '19:30', size: 6, womenOnly: false,
      desc: "We'll pick a film together in the group chat, then talk about it after over a drink or a hot chocolate.", attendees: ['m4', 'm8', 'm14', 'm19', 'm22', 'm24', 'm27', 'm30', 'm5', 'm15'] },
    { id: 'e3', cat: 'board-games', title: 'Board Games at the Library', place: 'central-library', dayOffset: 4, time: '18:30', size: 5, womenOnly: false,
      desc: 'Easy-to-learn games like Codenames and Ticket to Ride. No experience needed.', attendees: ['m4', 'm11', 'm12', 'm18', 'm22', 'm26', 'm29', 'm8'] },
    { id: 'e4', cat: 'walking', title: 'Morning Walk on the Thames Valley Parkway', place: 'springbank', dayOffset: 5, time: '10:00', size: 6, womenOnly: true,
      desc: 'A relaxed 5 km loop at a talking pace. Women-only group. Meet by the main parking lot.', attendees: ['m1', 'm6', 'm9', 'm13', 'm17', 'm21', 'm25', 'm31', 'm3', 'm33', 'm34'] },
    { id: 'e5', cat: 'coffee', title: 'Coffee and a Wander Through the Market', place: 'covent-garden', dayOffset: 5, time: '13:00', size: 5, womenOnly: false,
      desc: 'Grab a coffee, walk the stalls, and get to know a few people. An easy first meetup.', attendees: ['m1', 'm3', 'm11', 'm15', 'm19', 'm23', 'm27', 'm32', 'm33'] },
    { id: 'e6', cat: 'pickleball', title: 'Beginner Pickleball Doubles', place: 'carling-heights', dayOffset: 6, time: '10:30', size: 6, womenOnly: false,
      desc: 'Paddles are available to borrow. We rotate partners so everyone plays with everyone.', attendees: ['m6', 'm10', 'm16', 'm20', 'm21', 'm28', 'm31', 'm34'] },
    { id: 'e7', cat: 'running', title: 'Easy 5K Run, Then Breakfast', place: 'the-forks', dayOffset: 7, time: '08:00', size: 6, womenOnly: false,
      desc: 'Conversational pace along the river. Breakfast after is optional.', attendees: ['m2', 'm7', 'm11', 'm12', 'm15', 'm16', 'm19', 'm24', 'm32'] },
    { id: 'e8', cat: 'cooking', title: 'Market Shop and Potluck Planning', place: 'western-fair', dayOffset: 8, time: '11:00', size: 6, womenOnly: false,
      desc: 'Shop the market together, then plan a potluck in the group chat.', attendees: ['m3', 'm7', 'm13', 'm17', 'm20', 'm26', 'm30', 'm32'] },
    { id: 'e9', cat: 'books', title: 'Book Club: Bring Whatever You Are Reading', place: 'byron-library', dayOffset: 9, time: '19:00', size: 6, womenOnly: true,
      desc: 'No assigned book. Share what you are reading and swap recommendations. Women-only group.', attendees: ['m6', 'm9', 'm17', 'm21', 'm23', 'm25', 'm31', 'm1', 'm33', 'm34'] },
    { id: 'e10', cat: 'music', title: 'Free Live Music in the Park', place: 'victoria-park', dayOffset: 10, time: '18:30', size: 6, womenOnly: false,
      desc: 'Bring a blanket. We meet at the bandshell 15 minutes before the first set.', attendees: ['m3', 'm5', 'm7', 'm15', 'm18', 'm27', 'm29', 'm14'] },
    { id: 'e11', cat: 'volunteering', title: 'Riverbank Cleanup at Gibbons Park', place: 'gibbons-park', dayOffset: 11, time: '10:00', size: 6, womenOnly: false,
      desc: 'Gloves and bags provided. Two hours outside, then coffee.', attendees: ['m9', 'm13', 'm21', 'm25', 'm29', 'm3', 'm12'] },
    { id: 'e12', cat: 'art', title: 'Museum London Visit and Sketching', place: 'museum-london', dayOffset: 12, time: '14:00', size: 5, womenOnly: false,
      desc: 'Walk the galleries, then sketch for an hour. Admission is free. Bring a pencil.', attendees: ['m1', 'm8', 'm17', 'm23', 'm27', 'm29', 'm15'] },
    { id: 'e13', cat: 'trivia', title: 'Form a Trivia Team', place: 'masonville-library', dayOffset: 13, time: '19:00', size: 5, womenOnly: false,
      desc: "We'll practise with a few rounds, then pick a pub trivia night to enter as a team.", attendees: ['m11', 'm16', 'm22', 'm26', 'm28', 'm10', 'm4'] }
  ];

  // A ready-made profile so anyone reviewing the prototype can skip sign-up.
  const DEMO_PROFILE = {
    name: 'Alex', email: 'demo@buddy.test', age: 24, gender: 'woman', stage: 'Working', area: 'old-north',
    interests: ['basketball', 'board-games', 'coffee', 'trivia', 'walking'], social: 'instagram.com/alex.ldnont', photo: ''
  };

  window.BUDDY_DATA = { CATEGORIES, AREAS, PLACES, LIFE_STAGES, MEMBERS, EVENTS, DEMO_PROFILE };
})();
