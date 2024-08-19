function toggleDetail(e) {
    var t = e.target;
    while (t && t.tagName != 'BODY') {
        var l = t.classList;
        if (t.tagName == 'A' || (t.tagName == 'TR' && l.contains('event-detail'))) {
            break;
        }
        if (t.tagName == 'TR' && l.contains('event')) {
            if (l.contains('details')) { l.remove('details'); l.add('summary'); }
            else { l.remove('summary'); l.add('details'); }
            break;
        }
        t = t.parentElement;
    }
}

function loadEvents() {
    var CAL_URL = 'https://www.googleapis.com/calendar/v3/calendars/';
    var CAL_ID = '6d94a4fc92555fbdd3a2541300bfa9ce8a55621d1cd9feafd12aeb18fc489e90%40group.calendar.google.com';
    var CAL_ARGS = '/events?maxResults=20&orderBy=startTime&singleEvents=true';
    var API_KEY = '&key=AIzaSyDQQv6yLc_d3zkHDDHHH6j43N9iZzKQLEA';
    var ADD_URL = 'https://www.google.com/calendar/render?action=TEMPLATE&sf=true&output=xml&sprop=website:spacecoasteva.club';
    var MAP_URL = 'https://maps.google.com/maps?q=';
    var lang = navigator.languages[0];
    var etz = { timeZone: 'America/New_York' };
    var mtz = Intl.DateTimeFormat().resolvedOptions().timeZone != etz.timeZone ? ' ET' : '';
    var min = '&timeMin=' + (new Date(Date.now() - 182 * 24 * 60 * 60 * 1000)).toISOString();
    var max = '&timeMax=' + (new Date(Date.now() + 62 * 24 * 60 * 60 * 1000)).toISOString();
    var req = new XMLHttpRequest();
    req.addEventListener('load', function() {
        var eventsDiv = document.getElementById('events');
        var prevDiv = document.getElementById('prev-events');
        var events = JSON.parse(this.response).items;
        var now = new Date(Date.now() - 6 * 60 * 60 * 1000);
        var next_info = null;
        var rows = '';
        var prevRows = '';
        for (var i = 0; i < events.length; i++) {
            var e = events[i];
            var start = new Date(e.start.dateTime || e.start.date);
            var end = new Date(e.end.dateTime || e.end.date);
            var date = start.toDateString().replace(/(\s+)(\w+)\s*(\d+)\s*\d{3,}\s*/, '$1<span class="long">$2&nbsp;$3</span>');
            date = '<td class="event-date" title="' + start.toDateString() + '">' + date + '<span class="short">' + (start.getMonth() + 1) + '/' + start.getDate() + '</span></td>';
            var time = start.toLocaleTimeString(lang, etz) + '&nbsp;- ' + end.toLocaleTimeString(lang, etz);
            time = '<td class="event-time">' + time.replace(/:\d\d /g, ' ').replace(/ ([AaPp])([Mm])/g, '<span class="long">&nbsp;$1$2</span><span class="short">$1</span>') + '</td>';
            var desc = e.description ? e.description.replace(/ *{[^}]*}/, '') : '';
            var text = e.location || desc || e.summary;
            text = '<td class="event-text" title="' + text + '"><span></span>' + e.summary + '</td>';
            var dateFormat = function(d) { return d.toISOString().replace(/-|:|\.\d+/g, ''); }
            var add = ADD_URL + '&text=' + encodeURIComponent(e.summary) + '&dates=' +
                [start, end].map(dateFormat).join('/') +
                (desc ? '&details=' + encodeURIComponent(desc) : '') +
                (e.location ? '&location=' + encodeURIComponent(e.location) : '');
            link = '<td class="event-link" title="Add this event to your Google Calendar"><a href="' + add + '" target="_blank"><img src="img/logo-plus.png"/></a></td>';
            var rule = desc && e.location ? '<hr/>' : '';
            var maptag = '<a title="Map" target="_blank" href="' + MAP_URL + encodeURIComponent(e.location) + '">';
            var mapendtag = '<img class="map" src="img/map.png"/></a>';
            var isTBD = e.location.match(/\btb[da]\b/i);
            var summaryDetails = (start < now || isTBD) ? 'summary' : 'details';
            var detailLoc = e.location ? (isTBD ? e.location : maptag + e.location + mapendtag) : '';
            var detail = (desc || '') + rule + detailLoc;
            detail = (detail ? '<tr class="event-detail"><td colspan="4"><div>' + detail + '</div></td></tr>' : '');
            newRow = '<tr class="event ' + summaryDetails + '">' + date + time + text + link + '</tr>' + detail;
            if (start < now) {
                prevRows = newRow + prevRows;
            } else {
                rows += newRow;
            }
            if (next_info == null && rows != '') {
                var intros     = [ 'Please join us', 'Next SCEVA meeting is' ];
                var wherewhens = [ ' on $d$v. ', '$v on $d. ' ];
                var wheres     = [ ' at $v in $c', ' at $c\'s $v' ];
                var whens      = [ '$w, $d', '$d ($w)', '$W, $d', '$d ($W)' ];
                var whattimes  = [ 'Meeting starts at $t!', 'We\'ll see you at $t!' ];
                var dateOpts   = { 'month': 'long', 'day': 'numeric' };
                function pickOne(array) { return array[Math.floor(Math.random() * array.length)]; }
                function dateSfx(d) {return['st','nd','rd'][((d.getDate()+90)%100-10)%10-1]||'th';}
                function sumVenue(s) { return s.indexOf('@') < 0 ? '... ' + s : ' at ' + s.split('@')[1].trim(); }
                var locOverride = e.description ? e.description.match(/ *{([^@}]*)@([^}]*)}/) : [];
                var notTBD = e.location && !e.location.match(/\btb[da]\b/i);
                var venSub = locOverride && locOverride[1] ? (notTBD ? maptag + locOverride[1] + mapendtag : locOverride[1])
                                                           : (notTBD ? maptag + e.location.match(/[^,]*/)[0] + mapendtag : 'TBD');
                var citySub = locOverride && locOverride[2] ? locOverride[2] : (notTBD ? e.location.match(/, *([^,]*), *FL/)[1] : 'TBD');
                var date = pickOne(whens)
                        .replace('$d', start.toLocaleDateString('en-US', dateOpts) + dateSfx(start))
                        .replace('$w', start.toLocaleDateString('en-US', { 'weekday': 'short' }))
                        .replace('$W', start.toLocaleDateString('en-US', { 'weekday': 'long' }));
                var venue = (!e.location ? sumVenue(e.summary) : (pickOne(wheres)
                        .replace('$v', venSub).replace('$c', citySub)));
                next_info = document.getElementById('next_info');
                next_info.innerHTML = (pickOne(intros) + pickOne(wherewhens) + pickOne(whattimes))
                        .replace('$d', date).replace('$v', venue)
                        .replace('$t', start.toLocaleTimeString(lang, etz).replace(/(:00)?:\d+ /, '').toLowerCase() + mtz);
                next_info.nextElementSibling.setAttribute("href", add);
                document.getElementById('next_event').classList.add('live');
            }
        }
        eventsDiv.innerHTML = rows == '' ? 'No upcoming events.' : rows;
        prevDiv.innerHTML = prevRows == '' ? 'No previous events.' : prevRows;
        document.body.addEventListener('click', toggleDetail);
    });
    req.open('GET', CAL_URL + CAL_ID + CAL_ARGS + min + max + API_KEY);
    req.send();
}

window.addEventListener("load", loadEvents, false);
