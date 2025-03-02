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

function loadGoogleApi(url, callback) {
    var API_URL = 'https://www.googleapis.com/';
    var API_KEY = '&key=AIzaSyDQQv6yLc_d3zkHDDHHH6j43N9iZzKQLEA';
    var req = new XMLHttpRequest();
    req.addEventListener('load', callback);
    req.open('GET', API_URL + url + API_KEY);
    req.send();
}

function loadBlogFeed() {
    var BLOG_URL = 'blogger/v3/blogs/';
    var BLOG_ID = '4570358893544606507';
    var BLOG_ARGS = '/posts?status=live&orderBy=published&maxResults=3&view=READER&fetchImages=true&fetchBodies=true';
    loadGoogleApi(BLOG_URL + BLOG_ID + BLOG_ARGS, function() {
        var postsDiv = document.getElementById('posts');
        var posts = JSON.parse(this.response).items;
        var rows = '';
        for (var i = 0; i < posts.length; i++) {
            var post = posts[i];
            var img_src = post.images.length ? post.images[0].url : '';
            img_src = (img_src || '').replace(/\/[whs][0-9]+[-=,a-zA-F0-9]*\/([^\/]+)$/, '/w72-h72-p-k-no-nu/$1');
            var summary = (post.content || '').replace(/<[^>]+>/g, ' ').replace(/[ \t\r\n]+/g, ' ').trim();
            summary = summary.replace(/(.{180,200}[^ .]*) .*/, '$1\u2026');
            rows += '<p><a href="' + post.url + '"><img src="' + img_src + '"/></a>' +
                       '<a href="' + post.url + '">' + post.title + '</a><br/>' + summary + '</p>'
        }
        postsDiv.innerHTML = rows == '' ? 'No blog posts.' : rows;
    });
}

function isiOS() {
    return (('ontouchstart' in window) || (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0) ||
            [ 'iPad Simulator', 'iPhone Simulator', 'iPod Simulator',
              'iPad', 'iPhone', 'iPod' ].includes(navigator.platform) ||
            (/iPad|iPhone|iPod/.test(navigator.userAgent)) ||
            // iPad on iOS 13 detection
            (navigator.userAgent.includes("Mac") && "ontouchend" in document));
}

function makeICal(start, end, summary, desc, loc) {
    var dt = function(d) { return d.toISOString().replace(/-|:|\.\d+/g, ''); }
    //var now = new Date(); // FIXME METHOD:REQUEST~CREATED:' + dt(now) + '~
    var org = 'SCEVA', calendar = 'Events', pfx = 'wgg-gig';
    var domain = 'spacecoasteva.club';
    var email = 'news@spacecoasteva.club';
    return [('BEGIN:VCALENDAR~VERSION:2.0~PRODID:-//' + org + '//' + calendar + '//EN' +
             '~BEGIN:VEVENT~UID:' + dt(start) + '@' + domain +
             '~DTSTAMP:' + dt(start) + '~DTSTART:' + dt(start) +
             '~DTEND:' + dt(end) + '~SUMMARY:' + summary +
             (desc ? '~DESCRIPTION:' + desc : '') +
             (loc ? '~LOCATION:' + loc + (loc.indexOf(',') > 0 ?
                 '~STREET-ADDRESS:' + loc.split(',')[1].trim() : '') : '') +
             '~ORGANIZER;CN="' + org + '":mailto:' + email + '~ATTENDEE;RSVP=FALSE:' +
             '~END:VEVENT~END:VCALENDAR~').replaceAll('~', '\r\n'),
            pfx + '-' + dt(start) + '.ics'];
}

function loadEvents(openModal) {
    var CAL_URL = 'calendar/v3/calendars/';
    var CAL_ID = 'spacecoasteva@gmail.com';
    var CAL_ARGS = '/events?maxResults=20&orderBy=startTime&singleEvents=true';
    var ADD_URL = 'https://www.google.com/calendar/render?action=TEMPLATE&sf=true&output=xml&sprop=website:spacecoasteva.club';
    var MAP_URL = 'https://maps.google.com/maps?q=';
    var ADD_ICAL_TITLE = 'Add this event to your calendar';
    var ADD_GCAL_TITLE = 'Add this event to your Google Calendar';
    var BLOG_LINK_TITLE = 'See pictures and description from this event';
    var lang = navigator.languages[0];
    var etz = { timeZone: 'America/New_York' };
    var mtz = Intl.DateTimeFormat().resolvedOptions().timeZone != etz.timeZone ? ' ET' : '';
    var min = '&timeMin=' + (new Date(Date.now() - 182 * 24 * 60 * 60 * 1000)).toISOString();
    var max = '&timeMax=' + (new Date(Date.now() + 62 * 24 * 60 * 60 * 1000)).toISOString();
    var showICal = false;//isiOS()
    var popEventId = location.search.replace(/^.*[?&]eventid=([^&]*).*/i, '$1');
    loadGoogleApi(CAL_URL + CAL_ID + CAL_ARGS + min + max, function() {
        var eventsDiv = document.getElementById('events');
        var prevDiv = document.getElementById('prev-events');
        var events = JSON.parse(this.response).items;
        var now = new Date(Date.now() - 6 * 60 * 60 * 1000);
        var next_info = null;
        var rows = '';
        var prevRows = '';
        var eventObjs = {};
        for (var i = 0; i < events.length; i++) {
            var e = events[i];
            var start = new Date(e.start.dateTime || e.start.date);
            var end = new Date(e.end.dateTime || e.end.date);
            var date = start.toDateString().replace(/(\s+)(\w+)\s*(\d+)\s*\d{3,}\s*/, '$1<span class="long">$2&nbsp;$3</span>');
            date = '<td class="event-date" title="' + start.toDateString() + '">' + date + '<span class="short">' + (start.getMonth() + 1) + '/' + start.getDate() + '</span></td>';
            var time = start.toLocaleTimeString(lang, etz) + '&nbsp;- ' + end.toLocaleTimeString(lang, etz);
            time = '<td class="event-time">' + time.replace(/:\d\d /g, ' ').replace(/ ([AaPp])([Mm])/g, '<span class="long">&nbsp;$1$2</span><span class="short">$1</span>') + '</td>';
            var desc = e.description ? e.description.replace(/ *{[^}]*}/, '') : '';
            desc = desc.replaceAll(/^https:\/\/calendar.app.google\/.*\n?|\nhttps:\/\/calendar.app.google\/.*\n|\nhttps:\/\/calendar.app.google\/.*$/g, '');
            desc = desc.replaceAll(/(?:<u>( *<a)|(<\/a> *)<\/u>)/g, "$1$2");
            var text = e.location || desc || e.summary;
            text = '<td class="event-text" title="' + text + '"><span></span>' + e.summary + '</td>';
            var dateFormat = function(d) { return d.toISOString().replace(/-|:|\.\d+/g, ''); }
            var gcal = ADD_URL + '&text=' + encodeURIComponent(e.summary) + '&dates=' +
                [start, end].map(dateFormat).join('/') +
                (desc ? '&details=' + encodeURIComponent(desc) : '') +
                (e.location ? '&location=' + encodeURIComponent(e.location) : '');
            var blog = desc.match(/(\bhttps?:\/\/blog.spacecoasteva.club\/[^\]})<>'" \t]*)/);
            blog = blog && blog[0] ? blog[0] : '';
            var ical = makeICal(start, end, e.summary, e.description, e.location);
            var icallink = 'data:text/calendar,' + encodeURIComponent(ical[0]);
            //var rsvp = e.description ? e.description.replace(/^(https:\/\/calendar.app.google\/[^\n]*).*|.*\n(https:\/\/calendar.app.google\/[^\n]*)\n.*|.*\n(https:\/\/calendar.app.google\/[^\n]*)$/s, '$1$2$3') : '';
            var rsvpDate = start.toISOString().split('T')[0];
            var rsvp = 'https://docs.google.com/forms/d/e/1FAIpQLSd8EML_JoVaWcB5O9Wwk-iwaASqvhJ1rjEt2ixdlWf3xoywPQ/viewform?usp=pp_url&entry.960126064=' + rsvpDate;
            var link = start >= now ? (showICal ? icallink : gcal) : blog;
            var linkTitle = link ? (start >= now ? 'RSVP for this event' : BLOG_LINK_TITLE) : '';
            var linkFile  = link && showICal ? ical[1] : '';
            var linkDown  = linkFile ? '" download="' + linkFile : '';
            var linkIcon  = link ? (start >= now ? 'calendar-add.png' : 'camera.png') : '';
            var eventNum  = 'eventNum' + i;
            var linkCell  = start >= now ? (link ? '<button id="' + eventNum + '" class="event-add"><img src="img/' + linkIcon + '"/></button>' : '') :
                (link ? '<a href="' + link + '" target="_blank' + linkDown + '"><img src="img/' + linkIcon + '"/></a>' : '');
            linkCell = '<td class="event-link" title="' + linkTitle + '">' + linkCell + '</td>';
            var rule = desc && e.location ? '<hr/>' : '';
            var maptag = '<a title="Map" target="_blank" href="' + MAP_URL + encodeURIComponent(e.location) + '">';
            var mapendtag = '<img class="map" src="img/map.png"/></a>';
            var isTBD = e.location.match(/\btb[da]\b/i);
            var summaryDetails = (start < now || isTBD) ? 'summary' : 'details';
            var detailLoc = e.location ? (isTBD ? e.location : maptag + e.location + mapendtag) : '';
            var detail = (desc || '') + rule + detailLoc;
            detail = (detail ? '<tr class="event-detail"><td colspan="4"><div>' + detail + '</div></td></tr>' : '');
            newRow = '<tr class="event ' + summaryDetails + '">' + date + time + text + linkCell + '</tr>' + detail;
            if (start < now) {
                prevRows = newRow + prevRows;
            } else {
                rows += newRow;
                var rsvpParts = rsvpDate.split('-');
                eventObjs[eventNum] = { 'name': e.summary, 'rsvp': rsvp,
                    'google': link, 'apple': icallink, 'other': icallink,
                    'date': date.replace(/^[^>]*"(\w+)(\W+\w+\W+\d+)([^"]*)">.*/, '$1,$2,$3'),
                    'time': time.replace(/^[^>]*>([^<]*)[^[^;]*;([AP]M).*/, '$1$2'),
                    'eventid': rsvpDate.replaceAll('-', '') };
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
                var isTBD = !e.location || e.location.match(/\btb[da]\b/i);
                var venSub = locOverride && locOverride[1] ? (isTBD ? locOverride[1] : maptag + locOverride[1] + mapendtag)
                                                           : (isTBD ? 'TBD' : maptag + e.location.match(/[^,]*/)[0] + mapendtag);
                var citySub = locOverride && locOverride[2] ? locOverride[2] : (isTBD ? 'TBD' : e.location.match(/, *([^,]*), *FL/)[1]);
                var date = pickOne(whens)
                        .replace('$d', start.toLocaleDateString('en-US', dateOpts) + dateSfx(start))
                        .replace('$w', start.toLocaleDateString('en-US', { 'weekday': 'short' }))
                        .replace('$W', start.toLocaleDateString('en-US', { 'weekday': 'long' }));
                var venue = (isTBD ? ', location to be announced' : (!e.location ? sumVenue(e.summary) :
                        (pickOne(wheres).replace('$v', venSub).replace('$c', citySub))));
                next_info = document.getElementById('next_info');
                next_info.innerHTML = (pickOne(intros) + (isTBD ? wherewhens[0] : pickOne(wherewhens)) + pickOne(whattimes))
                        .replace('$d', date).replace('$v', venue)
                        .replace('$t', start.toLocaleTimeString(lang, etz).replace(/(:00)?:\d+ /, '').toLowerCase() + mtz);
                eventObjs['next_info_btn'] = eventObjs[eventNum];
                if (linkFile) { next_info.nextElementSibling.setAttribute("download", linkFile); }
                document.getElementById('next_event').classList.add('live');
            }
        }
        eventsDiv.innerHTML = rows == '' ? 'No upcoming events.' : rows;
        prevDiv.innerHTML = prevRows == '' ? 'No previous events.' : prevRows;
        var popEvent = null;
        for (var eventNum in eventObjs) {
            var eventBtn = document.getElementById(eventNum);
            eventBtn.onclick = (function(eventObj) {
                return function(event) {
                    openModal(eventObj);
                    event.stopPropagation();
                };
            })(eventObjs[eventNum]);
            if (eventObjs[eventNum].eventid == popEventId) {
                popEvent = eventNum;
            }
        }
        document.body.addEventListener('click', toggleDetail);
        if (popEvent) {
            var event = document.getElementById(popEvent);
            if (event) { event = event.closest('tr').nextElementSibling; }
            if (event) { event.scrollIntoView({ block: 'end' }); }
            openModal(eventObjs[popEvent]);
        }
    });
}

function setupEventModal() {
    var howMany = document.getElementById('howMany');
    var people = document.getElementById('people');
    var attendance = document.getElementById('attendance');
    var styleHowMany = function() {
        howMany.className = (attendance.value == 'No' ? 'none' : (people.value == 1 ? 'one' : 'more'));
    };
    attendance.onchange = styleHowMany;
    people.onchange = styleHowMany;
    styleHowMany();

    var modal = document.getElementById('eventModal');
    var close = document.getElementsByClassName('modal-close')[0];
    var openModal = function(eventObj) {
        for (var eventProp in eventObj) {
            var element = document.getElementById('event-modal-' + eventProp);
            if (element) {
                if (element.nodeName == 'SPAN') { element.innerText = eventObj[eventProp]; }
                else if (element.nodeName == 'A') { element.href = eventObj[eventProp]; }
                else if (element.nodeName == 'INPUT') { element.value = eventObj[eventProp]; }
            }
        }
        modal.style.display = 'block';
    }
    var hideModal = function() { modal.style.display = 'none'; };
    close.onclick = hideModal;
    window.onclick = function(event) {
        if (event.target == modal) { hideModal(); }
    };
    window.onkeyup = function(event) {
        if (event.key == 'Escape' || event.key == 'Esc') { hideModal(); }
    };

    var rsvpForm = document.getElementById('rsvpForm');
    rsvpForm.onsubmit = function(e) {
        e.preventDefault();
        return false;
    }
    var rsvpSubmit = document.getElementById('rsvpSubmit');
    rsvpSubmit.onclick = function() {
        var now = new Date().getTime();
        firebaseDb.collection('rsvps').add({
            email: rsvpForm['emailAddress'].value,
            eventId: rsvpForm['eventid'].value,
            response: rsvpForm['attendance'].value,
            people: parseInt(rsvpForm['people'].value),
            timestamp: firebaseApp.firebase.firestore.FieldValue.serverTimestamp()
            //timestamp: { seconds: Math.trunc(now / 1000), nanoseconds: (now % 1000) * 1000000 }
        }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        }).catch((error) => {
            console.error("Error adding document: ", error);
        });
    };

    return openModal;
}

function loadContent() {
    loadEvents(setupEventModal());
    loadBlogFeed();
}

window.addEventListener("load", loadContent, false);
