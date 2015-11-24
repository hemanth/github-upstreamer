import test from 'ava';
import githubUpstream from './';
// TBD :/
test('title', t => {
	t.is(githubUpstream('unicorns'), 'TDB');
	t.end();
});
