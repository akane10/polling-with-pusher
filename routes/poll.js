const router = require('express').Router();
const Pusher = require('pusher');

const key = require('../config/keys');

const pusher = new Pusher({
	appId: key.appId,
  key: key.key,
  secret: key.secret,
  cluster: key.cluster,
  encrypted: key.encrypted
});

router.get('/', (req, res, next) => {
	res.send('poll');
});

router.post('/', (req, res, next) => {
	pusher.trigger('club-poll', 'club-vote', {
		points: 1,
		club: req.body.club
	});
	res.send('Thank you for voting');
});

module.exports = router;
