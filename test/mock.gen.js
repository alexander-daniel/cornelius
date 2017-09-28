'use strict';

let fs = require('fs'),
		http = require('http');

fs.stat(__dirname + '/mock', (err, stats) => {
	if (err) {
		if (err.code == 'ENOENT') {
			fs.mkdirSync(__dirname + '/mock');
		}
	}
});

const endpoints = [
	{
		name: 'search_player_all',
		url: 'http://mlb.mlb.com/lookup/json/named.search_player_all.bam?sport_code=%27mlb%27&name_part=%27wright%25%27&active_sw=%27Y%27'
	},
	{
		name: 'player_info',
		url: 'http://mlb.mlb.com/lookup/json/named.player_info.bam?sport_code=%27mlb%27&player_id=%27431151%27'
	},
	{
		name: 'sport_hitting_tm',
		url: 'http://mlb.mlb.com/lookup/json/named.sport_hitting_tm.bam?player_id=431151&game_type=%27R%27&league_list_id=%27mlb%27'
	},
	{
		name: 'sport_pitching_tm',
		url: 'http://mlb.mlb.com/lookup/json/named.sport_pitching_tm.bam?player_id=453286&game_type=%27R%27&league_list_id=%27mlb%27'
	},
	{
		name: 'sport_pitching_tm_empty',
		url: 'http://mlb.mlb.com/lookup/json/named.sport_pitching_tm.bam?player_id=431151&game_type=%27R%27&league_list_id=%27mlb%27'
	},
	{
		name: 'roster_40.short',
		url: 'http://mlb.mlb.com/lookup/json/named.roster_40.bam?team_id=%27121%27&roster_40.col_in=name_display_first_last&roster_40.col_in=player_id'
	},
	{
		name: 'roster_40',
		url: 'http://mlb.mlb.com/lookup/json/named.roster_40.bam?team_id=%27121%27'
	}
];

endpoints.forEach( (endpoint) => {
	http.get(endpoint.url, (res) => {
		const { statusCode } = res;
		const contentType = res.headers['content-type'];
	
		let error;
		if (statusCode !== 200) {
			error = new Error('Request Failed.\n' +
												`Status Code: ${statusCode}`);
		} else if (!/^application\/json/.test(contentType)) {
			error = new Error('Invalid content-type.\n' +
												`Expected application/json but received ${contentType}`);
		}
		if (error) {
			console.error(error.message);
			res.resume();
			return;
		}
	
		res.setEncoding('utf8');

		let writeStream = fs.createWriteStream(`${__dirname}/mock/${endpoint.name}.json`, 'utf8');
		res.on('data', (chunk) => { writeStream.write(chunk); });
		res.on('end', () => {
			writeStream.end();
		});

	}).on('error', (error) => {
		console.log(`Error making request: ${error.message}`);
	});
});

console.log('Mock data generation completed.');