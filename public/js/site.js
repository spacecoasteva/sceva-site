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

function strftimeET(value, format, offset) {
    const dateOptions = { timeZone: 'America/New_York', timeZoneName: 'longOffset' };
    const [_, h, m] = value.toLocaleString('en', dateOptions).match(/([+-]\d+):(\d+)$/) || ['', '+00', '00'];
    return strftime.timezone(null != offset ? offset : h * 60 + (h > 0 ? +m : -m))(format, value);
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
        postsDiv.innerHTML = nunjucks.render('blogs', { posts: posts });
    });
}

function loadEvents(openModal) {
    var CAL_URL = 'calendar/v3/calendars/';
    var CAL_ID = 'spacecoasteva@gmail.com';
    var CAL_ARGS = '/events?maxResults=20&orderBy=startTime&singleEvents=true';
    var tz = Intl.DateTimeFormat().resolvedOptions().timeZone != 'America/New_York' ? ' ET' : '';
    var min = '&timeMin=' + new Date(Date.now()).addDays(-182).toISOString();
    var max = '&timeMax=' + new Date(Date.now()).addDays(93).toISOString();
    var popEventId = location.search.replace(/^.*[?&]eventid=([^&]*).*/i, '$1');
    loadGoogleApi(CAL_URL + CAL_ID + CAL_ARGS + min + max, function() {
        var eventsDiv = document.getElementById('events');
        var prevDiv = document.getElementById('prev-events');
        var events = JSON.parse(this.response).items;
        var current = new Date(Date.now()).addHours(-6);
        var next_info = null;
        var rows = '';
        var prevRows = '';
        var eventObjs = {};
        for (var i = 0; i < events.length; i++) {
            var e = events[i];
            var isCurrent = new Date(e.start.dateTime || e.start.date) >= current;
            var eventNum  = 'eventNum' + i;
            var newRow = nunjucks.render('event', { event: e, isCurrent: isCurrent, eventNum: eventNum });
            if (!isCurrent) {
                prevRows = newRow + prevRows;
            } else {
                rows += newRow;
                var eventObj = JSON.parse(nunjucks.render('eventObj', { event: e, tz: tz }));
                eventObj.start = new Date(eventObj.start);
                eventObj.end = new Date(eventObj.end);
                eventObjs[eventNum] = eventObj;
            }
            var notNext = (e.description || '').match(/{#notnext}/);
            if (next_info == null && rows != '' && !notNext) {
                next_info = document.getElementById('next_info');
                next_info.innerHTML = nunjucks.render('next_info', { event: e, tz: tz });
                eventObjs['next_info_btn'] = eventObjs[eventNum];
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
            if (eventNum != 'next_info_btn' &&
                eventObjs[eventNum].eventid == popEventId) {
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

function setupTemplates() {
    Date.prototype.addDays = function(days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    };
    Date.prototype.addHours = function(hours) {
        var date = new Date(this.valueOf());
        date.setHours(date.getHours() + hours);
        return date;
    };
    var isTBD = function(event) {
        return !event.location || event.location.match(/\btb[da]\b/i); }
    var calendarDate = function(value) {
        return new Date(value.dateTime || value.date); };
    nunjucks.configure({ autoescape: false })
        .addFilter('isTBD', isTBD)
        .addFilter('calendarDate', calendarDate)
        .addFilter('datetimeFormat', strftimeET)
        .addFilter('calendarBefore', function(value, hoursOffset = 0) {
            return calendarDate(value) < new Date().addHours(-6);
        }).addFilter('summaryVenue', function(summary) {
            return summary.indexOf('@') < 0 ? '... ' + summary : ' at ' + summary.split('@')[1].trim();
        }).addFilter('venueSubstitute', function(where, event) {
            var maptag = '<a title="Map" target="_blank" href="https://maps.google.com/maps?q=' +
                encodeURIComponent(event.location) + '">';
            var mapendtag = '<img class="map" src="img/map.png"/></a>';
            var descLoc = event.description ? event.description.match(/ *{([^@}]*)@([^}]*)}/) : [];
            var venue = descLoc && descLoc[1]
                            ? (isTBD(event) ? descLoc[1] : maptag + descLoc[1] + mapendtag)
                            : (isTBD(event) ? 'TBD' : maptag + event.location.match(/[^,]*/)[0] + mapendtag);
            var city =  descLoc && descLoc[2] ? descLoc[2]
                            : (isTBD(event) ? 'TBD' : event.location.match(/, *([^,]*), *[A-Z][A-Z]\b/)[1]);
            return where.replace('$v', venue).replace('$c', city);
        }).addFilter('split', function(value, delim) {
            return value.split(delim);
        }).addFilter('addressSplit', function(value, delim) {
            return value.replace(/, *(?! *[A-Z][A-Z]\b)/g, delim);
        }).addFilter('stripHtmlTags', function(value) {
            var text = null, textOf = function(n) {
                return n.nodeType == n.TEXT_NODE ? n.textContent : (n.nodeType == n.ELEMENT_NODE ? text(n) : ''); };
            text = function(node) { return Array.from(node.childNodes).map(textOf).join(' '); };
            return text(new DOMParser().parseFromString(value, 'text/html').body)
                .replace(/[ \t\r\n]+/g, ' ').trim();
        }).addFilter('bloggerResize', function(value, w, h = null) {
            return value.url.replace(/\/[whs][0-9]+[-=,a-zA-F0-9]*\/([^\/]+)$/, `/w${w}-h${h || w}-p-k-no-nu/$1`);
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

    var emailSubject = document.getElementById('email-subject');
    var emailMessage = document.getElementById('email-message');
    var scring = function(s, v) { return (new TextDecoder()).decode((new TextEncoder()).encode(s).map(c => c ^ v)); }

    var modal = document.getElementById('eventModal');
    var close = document.getElementsByClassName('modal-close')[0];
    var thankYouModal = document.getElementById('thankYouModal');
    var thankYouClose = document.getElementsByClassName('modal-close')[1];
    var fillElement = function(element, value) {
        if (element) {
            if (element.nodeName == 'SPAN') { element.innerText = value; }
            else if (element.nodeName == 'A') { element.href = value; }
            else if (element.nodeName == 'INPUT') { element.value = value; }
        }
    }
    var openModal = function(eventObj) {
        for (var eventProp in eventObj) {
            fillElement(document.getElementById('event-modal-' + eventProp), eventObj[eventProp]);
            fillElement(document.getElementById('event-thank-you-modal-' + eventProp), eventObj[eventProp]);
        }
        emailSubject.innerHTML = nunjucks.render('subject', { event: eventObj });
        emailMessage.innerHTML = nunjucks.render('email', { event: eventObj });
        modal.style.display = 'block';
        var email = document.getElementById('emailAddress');
        if (email) { email.focus(); }
    }
    var hideModal = function(theModal) { theModal.style.display = 'none'; };
    close.onclick = function() { hideModal(modal); }
    thankYouClose.onclick = function() { hideModal(thankYouModal); }
    window.onclick = function(event) {
        if (event.target == modal || event.target == thankYouModal) { hideModal(event.target); }
    };
    window.onkeyup = function(event) {
        if (event.key == 'Escape' || event.key == 'Esc') { hideModal(modal); hideModal(thankYouModal); }
    };

    var rsvpForm = document.getElementById('rsvpForm');
    rsvpForm.onsubmit = function(e) {
        e.preventDefault();
        return false;
    }
    var rsvpSubmit = document.getElementById('rsvpSubmit');
    rsvpSubmit.onclick = function() {
        if (rsvpForm['emailAddress'].value == '' &&
            scring(rsvpForm['comments'].value, 0x30) == 'SXy]@')
        {
            rsvpForm['emailAddress'].value = emailSubject.innerHTML;
            rsvpForm['comments'].value = emailMessage.innerHTML;
            return;
        }
        if (!rsvpForm.reportValidity()) { return; }
        var result = rsvpForm['attendance'].value;
        firebaseDb.collection('rsvps').add({
            email: rsvpForm['emailAddress'].value,
            eventId: rsvpForm['eventid'].value,
            response: result,
            people: parseInt(rsvpForm['people'].value),
            comments: rsvpForm['comments'].value,
            timestamp: firebaseApp.firebase.firestore.FieldValue.serverTimestamp()
        }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        }).catch((error) => {
            console.error("Error adding document: ", error);
            result = 'Error';
        });
        rsvpForm['comments'].value = '';
        hideModal(modal);
        thankYouModal.firstElementChild.className = 'modal-content result' + result;
        thankYouModal.style.display = 'block';
    };

    return openModal;
}

function loadContent() {
    setupTemplates();
    loadEvents(setupEventModal());
    loadBlogFeed();
}

window.addEventListener("load", loadContent, false);
