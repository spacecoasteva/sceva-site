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
    var CAL_ID = 'vt6m1geim5tivevgktlil4dhds%40group.calendar.google.com';
    var CAL_ARGS = '/events?maxResults=20&orderBy=startTime&singleEvents=true';
    var API_KEY = '&key=AIzaSyDOJ_K7_X1N8_bJTeSwaodOd6JKoN6ntmc';
    var ADD_URL = 'https://www.google.com/calendar/render?action=TEMPLATE&sf=true&output=xml&sprop=website:www.wickedgardengnomes.com';
    var MAP_URL = 'https://maps.google.com/maps?q=';
    var min = '&timeMin=' + (new Date(Date.now() - 6 * 60 * 60 * 1000)).toISOString();
    var max = '&timeMax=' + (new Date(Date.now() + 182 * 24 * 60 * 60 * 1000)).toISOString();
    var req = new XMLHttpRequest();
    req.addEventListener('load', function() {
        var eventsDiv = document.getElementById('events');
        var events = JSON.parse(this.response).items;
        var rows = events.length > 0 ? '' : 'No upcoming events.';
        for (var i = 0; i < events.length; i++) {
            var e = events[i];
            var start = new Date(e.start.dateTime || e.start.date);
            var end = new Date(e.end.dateTime || e.end.date);
            var date = start.toDateString().replace(/(\s+)(\w+)\s*(\d+)\s*\d{3,}\s*/, '$1<span class="long">$2&nbsp;$3</span>');
            date = '<td class="event-date" title="' + start.toDateString() + '">' + date + '<span class="short">' + (start.getMonth() + 1) + '/' + start.getDate() + '</span></td>';
            var time = start.toLocaleTimeString() + '&nbsp;- ' + end.toLocaleTimeString();
            time = '<td class="event-time">' + time.replace(/:\d\d /g, ' ').replace(/ ([AaPp])([Mm])/g, '<span class="long">&nbsp;$1$2</span><span class="short">$1</span>') + '</td>';
            var summary = e.summary.replace(/^ *wgg *(sc)? *(at *|([^@]))/i, 'WGG $1 @ $3')
                                   .replace(/\bSC\b/i, 'feat. Steve Cohen');
            var text = e.location || e.description || summary;
            text = '<td class="event-text" title="' + text + '"><span></span>' + summary + '</td>';
            var dateFormat = function(d) { return d.toISOString().replace(/-|:|\.\d+/g, ''); }
            var add = ADD_URL + '&text=' + encodeURIComponent(summary) + '&dates=' +
                [start, end].map(dateFormat).join('/') +
                (e.description ? '&details=' + encodeURIComponent(e.description) : '') +
                (e.location ? '&location=' + encodeURIComponent(e.location) : '');
            link = '<td class="event-link" title="Add this event to your Google Calendar"><a href="' + add + '" target="_blank"><img src="img/logo-plus.png"></a></td>';
            var rule = e.description && e.location ? '<hr/>' : '';
            var maptag = '<a title="Wicked Map!" target="_blank" href="' + MAP_URL + encodeURIComponent(e.location) + '">';
            var detail = (e.description || '') + rule + (e.location ? maptag + e.location + '</a>' : '');
            detail = (detail ? '<tr class="event-detail"><td colspan="4"><div>' + detail + '</div></td></tr>' : '');
            rows += '<tr class="event summary">' + date + time + text + link + '</tr>' + detail;
            if (i == 0) {
                var intros     = [ 'Join us next', 'Catch the Gnomes', 'Gnext Gnome outing is',
                                   'Have a Wicked good time with us', 'See you next',
                                   'Looking forward to rocking next' ];
                var wherewhens = [ ' on $d$v. ', '$v on $d. ' ];
                var wheres     = [ ' at $v in $c', ' at $c\'s $v' ];
                var whens      = [ '$w, $d', '$d ($w)', '$W, $d', '$d ($W)' ];
                var whattimes  = [ 'Downbeat is at 6:30pm!', 'Party starts at 6:30pm!',
                                   'Fun begins at 6:30pm!', 'Music begins at 6:30pm!' ];
                var dateOpts   = { 'month': 'long', 'day': 'numeric' };
                function pickOne(array) { return array[Math.floor(Math.random() * array.length)]; }
                function dateSfx(d) {return['st','nd','rd'][((d.getDate()+90)%100-10)%10-1]||'th';}
                function sumVenue(s) { return s.indexOf('@') < 0 ? '... ' + s : ' at ' + s.split('@')[1].trim(); }
                var date = pickOne(whens)
                        .replace('$d', start.toLocaleDateString('en-US', dateOpts) + dateSfx(start))
                        .replace('$w', start.toLocaleDateString('en-US', { 'weekday': 'short' }))
                        .replace('$W', start.toLocaleDateString('en-US', { 'weekday': 'long' }));
                var venue = (!e.location ? sumVenue(summary) : (pickOne(wheres)
                        .replace('$v', maptag + e.location.match(/[^,]*/)[0] + '</a>')
                        .replace('$c', e.location.match(/, *([^,]*), *FL/)[1])));
                var next_info = document.getElementById('next_info');
                next_info.innerHTML = (pickOne(intros) + pickOne(wherewhens) + pickOne(whattimes))
                        .replace('$d', date).replace('$v', venue)
                        .replace('$t', start.toLocaleTimeString().replace(/(:00)?:\d+ /, '').toLowerCase());
                next_info.nextElementSibling.setAttribute("href", add);
                document.getElementById('next_show').classList.add('live');
            }
        }
        eventsDiv.innerHTML = rows;
        document.body.addEventListener('click', toggleDetail);
    });
    req.open('GET', CAL_URL + CAL_ID + CAL_ARGS + min + max + API_KEY);
    req.send();
}

window.onload = loadEvents;
