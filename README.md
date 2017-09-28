Cornelius lets you grab data from MLB's `/lookup/json` routes. 

All of the data Cornelius returns is property of MLB Advanced Media, and subject to their [usage terms](http://gdx.mlb.com/components/copyright.txt).

# Table of Contents

- [Getting Started](#getting-started)
- [Usage](#usage)
	-   [cornelius.searchPlayer](#corneliussearchplayer)
	-   [cornelius.getPlayer](#corneliusgetplayer)
	-   [cornelius.getStats](#corneliusgetstats)
	-   [cornelius.getRoster](#corneliusgetroster)
	-   [cornelius.pruneData](#corneliusprunedata)
- [Limitations](#limitations)
- [Development](#development)
- [Todos](#todos)

# Getting Started

```sh
npm install --save cornelius
```

```javascript
var cornelius = require('cornelius');
```

# Usage

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

## cornelius.searchPlayer

Takes a search term (player name) and returns search results.

`options` can be an object or a string. If it's a string it will return search results of active players that match the search term.
If the prune flag is set to `true` but there are no search results, you'll get an empty array.

**Parameters**

-   `options` **([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))** 
    -   `options.query` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Player name.
    -   `options.active` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Active or historic players. (optional, default `true`)
    -   `options.prune` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Prune the data. (optional, default `false`)

**Examples**

_Active player search_

```javascript
cornelius.searchPlayer('wright')
  .then(function (data) {
	   // do stuff with search results
  })
  .catch(function (error) {
	   // handle error
  });
```

_Historic player search_

```javascript
var options = {
		query: 'williams',
		active: false
	};

cornelius.searchPlayer(options)
		.then(function (data) {
			// do stuff with search results
		})
		.catch(function (error) {
			// handle error
		});
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** `search_player_all` - MLB response in JSON format.

## cornelius.getPlayer

Takes a player's ID and returns their information.

`options` can be an object or a string. If it's a string, it will return a players raw information.
If the prune flag is set to `true` but there was no player result, you'll get an empty object.

**Parameters**

-   `options` **([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))** 
    -   `options.player_id` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Player's ID.
    -   `options.prune` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Prune the data. (optional, default `false`)

**Examples**

_Get a player by ID_

```javascript
cornelius.getPlayer('529518')
 .then(function (data) {
	 // do stuff with player info
 })
 .catch(function (error) {
	 // handle error
 });
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** `player_info` -  MLB response in JSON format.

## cornelius.getStats

Takes a player's ID and returns their stats.

`options` can be an object or a string. If it's a string, it will return the player's latest _hitting_ stats.
If the prune flag is set to `true` but there's no stats to prune, you'll get an empty object.

**Parameters**

-   `options` **([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))** 
    -   `options.player_id` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Player's ID.
    -   `options.year` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)?** The season to get stats for.
    -   `options.pitching` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Return pitching stats instead. (optional, default `false`)
    -   `options.prune` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Prune the data. (optional, default `false`)

**Examples**

_Get a player's latest hitting stats_

```javascript
cornelius.getStats('594798')
	.then(function (data) {
		// do stuff with stats data
	})
	.catch(function (error) {
		// handle error
	})
```

_Get a player's pitching stats from a given year_

```javascript
var options = {
	player_id: '594798',
	pitching: true,
	year: '2015'
};

cornelius.getStats(options)
	.then(function (data) {
		// do stuff with stats data	
	})
	.catch(function (error) {
		// handle error
	});
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** `sport_[stat_type]_tm` -  MLB response in JSON format.

## cornelius.getRoster

Takes a team's ID, name, or abbreviated name, and returns their 40 man roster. 

`options` can be an object or a string. If it's a string it will return the roster with short form player objects -- just a name and ID.
An error message alerts you to an invalid `team_id`.

**Parameters**

-   `options` **([Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) \| [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String))** 
    -   `options.team_id` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Team's ID, name, or abbreviation.
    -   `options.full` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Return full player info with roster. (optional, default `false`)
    -   `options.prune` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Prune the data. (optional, default `false`)

**Examples**

_Get a team's roster by abbreviation_

```javascript
// 'New York Mets' or '121' would also be accepted
cornelius.getRoster('nym')
	.then(function (data) {
		// do stuff with roster data
	})
	.catch(function (error) {
		// handle error
	})
```

_Get a team's roster with full player info_

```javascript
var options = {
	team_id: '121',
	full: true
};

cornelius.getRoster(options)
	.then(function (data) {
		// do stuff with roster data	
	})
	.catch(function (error) {
		// handle error
	});
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** `roster_40` -  MLB response in JSON format.

## cornelius.pruneData

Takes raw player, roster, stats or search data and returns it in a pruned format.
This usually means organising objects and renaming properties for readability.
In some cases (stats) it simply strips extraneous properties and structure.

**Parameters**

-   `data` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** Data you want pruned.

**Examples**

_Prune stat data via chaining_

```javascript
cornelius.getStats('594798')
	.then(cornelius.prune)
	.then(function (data) {
		// do stuff with pruned stat data
	})
	.catch(function (error) {
		// handle error
	})
```

_Prune stat data without chaining_

```javascript
cornelius.getStats('594798')
	.then(function (data) {
		// do stuff with stat data, like pruning
		var pruned = cornelius.prune(data);
	})
	.catch(function (error) {
		// handle error
	});
```

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)**  Pruned version of the original data.

**Meta**

-   **deprecated**: pruneData will be deprecated in future versions. Switch to providing a `prune` flag to `options`.

# Limitations

## No extensive pruning on stats

Pruning aims to make the data you get easier to navigate and work with. Cornelius will strip extraneous properties and structure from stats data if `prune` is set to true, but anything more intensive than this would be highly opinionated and not necessarily any easier to navigate.

# Development

## Generating Data for Testing

For now, Cornelius uses a simple script to get and save data from each of the main endpoints it works with. This data is stored in the `test/mock` directory, which will be created if it does not already exist.

This step is required before proper testing can be done.

```javascript
npm run test-data-gen
```

## Tests

Once you've generated data for testing, you can run tests with `npm test`.

# Todos

-   Re-write pruning utilities
-   ~~Support historic/non-active players~~
-   ~~Add player stats - `cornelius.stats(playerName, key)`~~
-   Add player status - `cornelius.status(playerName, key)`
-   ~~Add team rosters - `cornelius.roster(teamName)`~~
-   ~~Add pruned/cleaned data option~~

# License

MIT
