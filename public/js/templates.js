(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["desc"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += runtime.suppressValue((lineno = 2, colno = 27, runtime.callWrap(runtime.memberLookup(((lineno = 1, colno = 27, runtime.callWrap(runtime.memberLookup(((lineno = 0, colno = 36, runtime.callWrap(runtime.memberLookup(((runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"description") || "")),"replace"), "--expression--[\"replace\"]", context, [/ *{[^}]*}/,""]))),"replaceAll"), "the return value of (--expression--[\"replace\"])[\"replaceAll\"]", context, [/^https:\/\/calendar.app.google\/.*\n?|\nhttps:\/\/calendar.app.google\/.*\n|\nhttps:\/\/calendar.app.google\/.*$/g,""]))),"replaceAll"), "the return value of (the return value of (--expression--[\"replace\"])[\"replaceAll\"])[\"replaceAll\"]", context, [/(?:<u>( *<a)|(<\/a> *)<\/u>)/g,"$1$2"])), env.opts.autoescape);
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["gcal"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
var t_1;
t_1 = (function() {
var output = "";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("desc", false, "gcal", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
callback(null,t_2);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
callback(null,t_4);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
});
return output;
})()
;
frame.set("desc", t_1, true);
if(frame.topLevel) {
context.setVariable("desc", t_1);
}
if(frame.topLevel) {
context.addExport("desc", t_1);
}
output += "https://www.google.com/calendar/render?action=TEMPLATE&sf=true&output=xml&sprop=website:spacecoasteva.club&text=";
output += runtime.suppressValue(env.getFilter("urlencode").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"summary")), env.opts.autoescape);
output += "&dates=";
output += runtime.suppressValue(env.getFilter("datetimeFormat").call(context, env.getFilter("calendarDate").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"start")),"%Y%m%dT%H%M%SZ",0), env.opts.autoescape);
output += "/";
output += runtime.suppressValue(env.getFilter("datetimeFormat").call(context, env.getFilter("calendarDate").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"end")),"%Y%m%dT%H%M%SZ",0), env.opts.autoescape);
if(runtime.contextOrFrameLookup(context, frame, "desc")) {
output += "&details=";
output += runtime.suppressValue(env.getFilter("urlencode").call(context, runtime.contextOrFrameLookup(context, frame, "desc")), env.opts.autoescape);
;
}
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"location")) {
output += "&location=";
output += runtime.suppressValue(env.getFilter("urlencode").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"location")), env.opts.autoescape);
;
}
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["ical"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
var macro_t_1 = runtime.makeMacro(
["date"], 
["format"], 
function (l_date, kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("date", l_date);
frame.set("format", Object.prototype.hasOwnProperty.call(kwargs, "format") ? kwargs["format"] : "%Y%m%dT%H%M%SZ");var t_2 = "";t_2 += runtime.suppressValue(env.getFilter("datetimeFormat").call(context, env.getFilter("calendarDate").call(context, l_date),runtime.contextOrFrameLookup(context, frame, "format"),0), env.opts.autoescape);
;
frame = callerFrame;
return new runtime.SafeString(t_2);
});
context.addExport("dt");
context.setVariable("dt", macro_t_1);
var t_3;
t_3 = "spacecoasteva.club";
frame.set("domain", t_3, true);
if(frame.topLevel) {
context.setVariable("domain", t_3);
}
if(frame.topLevel) {
context.addExport("domain", t_3);
}
var t_4;
t_4 = "news@" + runtime.contextOrFrameLookup(context, frame, "domain");
frame.set("email", t_4, true);
if(frame.topLevel) {
context.setVariable("email", t_4);
}
if(frame.topLevel) {
context.addExport("email", t_4);
}
var t_5;
t_5 = (lineno = 2, colno = 30, runtime.callWrap(macro_t_1, "dt", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"start")]));
frame.set("start", t_5, true);
if(frame.topLevel) {
context.setVariable("start", t_5);
}
if(frame.topLevel) {
context.addExport("start", t_5);
}
var t_6;
t_6 = (lineno = 2, colno = 61, runtime.callWrap(macro_t_1, "dt", context, [runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"end")]));
frame.set("end", t_6, true);
if(frame.topLevel) {
context.setVariable("end", t_6);
}
if(frame.topLevel) {
context.addExport("end", t_6);
}
var t_7;
t_7 = runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"location");
frame.set("loc", t_7, true);
if(frame.topLevel) {
context.setVariable("loc", t_7);
}
if(frame.topLevel) {
context.addExport("loc", t_7);
}
var t_8;
t_8 = (function() {
var output = "";
output += "BEGIN:VCALENDAR~VERSION:2.0~PRODID:-//SCEVA//Events//EN~BEGIN:VEVENT~UID:";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "start"), env.opts.autoescape);
output += "@";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "domain"), env.opts.autoescape);
output += "~DTSTAMP:";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "start"), env.opts.autoescape);
output += "~DTSTART:";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "start"), env.opts.autoescape);
output += "~DTEND:";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "end"), env.opts.autoescape);
output += "~SUMMARY:";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"summary"), env.opts.autoescape);
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"description")) {
output += "~DESCRIPTION:";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"description"), env.opts.autoescape);
;
}
if(runtime.contextOrFrameLookup(context, frame, "loc")) {
output += "~LOCATION:";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "loc"), env.opts.autoescape);
if((lineno = 7, colno = 63, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loc")),"indexOf"), "loc[\"indexOf\"]", context, [","])) > 0) {
output += "~STREET-ADDRESS:";
output += runtime.suppressValue((lineno = 8, colno = 60, runtime.callWrap(runtime.memberLookup((runtime.memberLookup(((lineno = 8, colno = 47, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "loc")),"split"), "loc[\"split\"]", context, [","]))),1)),"trim"), "the return value of (loc[\"split\"])[\"1\"][\"trim\"]", context, [])), env.opts.autoescape);
;
}
;
}
output += "~ORGANIZER;CN=\"SCEVA\":mailto:";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "email"), env.opts.autoescape);
output += "~ATTENDEE;RSVP=FALSE:~END:VEVENT~END:VCALENDAR~";
;
return output;
})()
;
frame.set("data", t_8, true);
if(frame.topLevel) {
context.setVariable("data", t_8);
}
if(frame.topLevel) {
context.addExport("data", t_8);
}
output += runtime.suppressValue((lineno = 10, colno = 29, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "data")),"replaceAll"), "data[\"replaceAll\"]", context, ["~","\r\n"])), env.opts.autoescape);
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["blog"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
var t_1;
t_1 = (function() {
var output = "";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("desc", false, "blog", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
callback(null,t_2);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
callback(null,t_4);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
});
return output;
})()
;
frame.set("desc", t_1, true);
if(frame.topLevel) {
context.setVariable("desc", t_1);
}
if(frame.topLevel) {
context.addExport("desc", t_1);
}
var t_6;
t_6 = (lineno = 1, colno = 37, runtime.callWrap(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "desc")),"match"), "desc[\"match\"]", context, [/(\bhttps?:\/\/blog.spacecoasteva.club\/[^\]})<>'" \t]*)/]));
frame.set("blog", t_6, true);
if(frame.topLevel) {
context.setVariable("blog", t_6);
}
if(frame.topLevel) {
context.addExport("blog", t_6);
}
if(runtime.contextOrFrameLookup(context, frame, "blog") && runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "blog")),0)) {
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "blog")),0), env.opts.autoescape);
;
}
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["eventObj"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
var t_1;
t_1 = (function() {
var output = "";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("desc", false, "eventObj", false, function(t_3,t_2) {
if(t_3) { cb(t_3); return; }
callback(null,t_2);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_5,t_4) {
if(t_5) { cb(t_5); return; }
callback(null,t_4);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
});
return output;
})()
;
frame.set("desc", t_1, true);
if(frame.topLevel) {
context.setVariable("desc", t_1);
}
if(frame.topLevel) {
context.addExport("desc", t_1);
}
var t_6;
t_6 = (function() {
var output = "";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("gcal", false, "eventObj", false, function(t_8,t_7) {
if(t_8) { cb(t_8); return; }
callback(null,t_7);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_10,t_9) {
if(t_10) { cb(t_10); return; }
callback(null,t_9);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
});
return output;
})()
;
frame.set("gcal", t_6, true);
if(frame.topLevel) {
context.setVariable("gcal", t_6);
}
if(frame.topLevel) {
context.addExport("gcal", t_6);
}
var t_11;
t_11 = (function() {
var output = "";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("ical", false, "eventObj", false, function(t_13,t_12) {
if(t_13) { cb(t_13); return; }
callback(null,t_12);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_15,t_14) {
if(t_15) { cb(t_15); return; }
callback(null,t_14);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
});
return output;
})()
;
frame.set("ical", t_11, true);
if(frame.topLevel) {
context.setVariable("ical", t_11);
}
if(frame.topLevel) {
context.addExport("ical", t_11);
}
var t_16;
t_16 = "data:text/calendar," + (env.getFilter("urlencode").call(context, runtime.contextOrFrameLookup(context, frame, "ical")));
frame.set("icallink", t_16, true);
if(frame.topLevel) {
context.setVariable("icallink", t_16);
}
if(frame.topLevel) {
context.addExport("icallink", t_16);
}
output += runtime.suppressValue(env.getFilter("dump").call(context, {"name": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"summary"),"location": runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"location"),"description": runtime.contextOrFrameLookup(context, frame, "desc"),"google": runtime.contextOrFrameLookup(context, frame, "gcal"),"apple": runtime.contextOrFrameLookup(context, frame, "icallink"),"other": runtime.contextOrFrameLookup(context, frame, "icallink"),"start": env.getFilter("calendarDate").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"start")),"end": env.getFilter("calendarDate").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"end")),"eventid": env.getFilter("datetimeFormat").call(context, env.getFilter("calendarDate").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"start")),"%Y%m%d"),"date": env.getFilter("datetimeFormat").call(context, env.getFilter("calendarDate").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"start")),"%a, %b %-d, %Y"),"time": env.getFilter("datetimeFormat").call(context, env.getFilter("calendarDate").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"start")),"%-I:%M %p" + runtime.contextOrFrameLookup(context, frame, "tz"))}), env.opts.autoescape);
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["event"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
var macro_t_1 = runtime.makeMacro(
[], 
["format"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("format", Object.prototype.hasOwnProperty.call(kwargs, "format") ? kwargs["format"] : "%a %b %-d %Y");var t_2 = "";t_2 += runtime.suppressValue(env.getFilter("datetimeFormat").call(context, env.getFilter("calendarDate").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"start")),runtime.contextOrFrameLookup(context, frame, "format")), env.opts.autoescape);
;
frame = callerFrame;
return new runtime.SafeString(t_2);
});
context.addExport("startFormat");
context.setVariable("startFormat", macro_t_1);
var macro_t_3 = runtime.makeMacro(
[], 
["format"], 
function (kwargs) {
var callerFrame = frame;
frame = new runtime.Frame();
kwargs = kwargs || {};
if (Object.prototype.hasOwnProperty.call(kwargs, "caller")) {
frame.set("caller", kwargs.caller); }
frame.set("format", Object.prototype.hasOwnProperty.call(kwargs, "format") ? kwargs["format"] : "%a %b %-d %Y");var t_4 = "";t_4 += runtime.suppressValue(env.getFilter("datetimeFormat").call(context, env.getFilter("calendarDate").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"end")),runtime.contextOrFrameLookup(context, frame, "format")), env.opts.autoescape);
;
frame = callerFrame;
return new runtime.SafeString(t_4);
});
context.addExport("endFormat");
context.setVariable("endFormat", macro_t_3);
var t_5;
t_5 = (function() {
var output = "";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("desc", false, "event", false, function(t_7,t_6) {
if(t_7) { cb(t_7); return; }
callback(null,t_6);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_9,t_8) {
if(t_9) { cb(t_9); return; }
callback(null,t_8);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
});
return output;
})()
;
frame.set("desc", t_5, true);
if(frame.topLevel) {
context.setVariable("desc", t_5);
}
if(frame.topLevel) {
context.addExport("desc", t_5);
}
var t_10;
t_10 = (function() {
var output = "";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("gcal", false, "event", false, function(t_12,t_11) {
if(t_12) { cb(t_12); return; }
callback(null,t_11);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_14,t_13) {
if(t_14) { cb(t_14); return; }
callback(null,t_13);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
});
return output;
})()
;
frame.set("gcal", t_10, true);
if(frame.topLevel) {
context.setVariable("gcal", t_10);
}
if(frame.topLevel) {
context.addExport("gcal", t_10);
}
var t_15;
t_15 = (function() {
var output = "";
var tasks = [];
tasks.push(
function(callback) {
env.getTemplate("blog", false, "event", false, function(t_17,t_16) {
if(t_17) { cb(t_17); return; }
callback(null,t_16);});
});
tasks.push(
function(template, callback){
template.render(context.getVariables(), frame, function(t_19,t_18) {
if(t_19) { cb(t_19); return; }
callback(null,t_18);});
});
tasks.push(
function(result, callback){
output += result;
callback(null);
});
env.waterfall(tasks, function(){
});
return output;
})()
;
frame.set("blog", t_15, true);
if(frame.topLevel) {
context.setVariable("blog", t_15);
}
if(frame.topLevel) {
context.addExport("blog", t_15);
}
var t_20;
t_20 = (runtime.contextOrFrameLookup(context, frame, "isCurrent")?((runtime.contextOrFrameLookup(context, frame, "gcal")?"RSVP for this event":"")):((runtime.contextOrFrameLookup(context, frame, "blog")?"See pictures and description from this event":"")));
frame.set("linkTitle", t_20, true);
if(frame.topLevel) {
context.setVariable("linkTitle", t_20);
}
if(frame.topLevel) {
context.addExport("linkTitle", t_20);
}
var t_21;
t_21 = (runtime.contextOrFrameLookup(context, frame, "isCurrent")?((runtime.contextOrFrameLookup(context, frame, "gcal")?"calendar-add.png":"")):((runtime.contextOrFrameLookup(context, frame, "blog")?"camera.png":"")));
frame.set("linkIcon", t_21, true);
if(frame.topLevel) {
context.setVariable("linkIcon", t_21);
}
if(frame.topLevel) {
context.addExport("linkIcon", t_21);
}
var t_22;
t_22 = (function() {
var output = "";
if(runtime.contextOrFrameLookup(context, frame, "isCurrent") && runtime.contextOrFrameLookup(context, frame, "gcal")) {
output += "<button id=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "eventNum"), env.opts.autoescape);
output += "\" class=\"event-add\"><img src=\"img/";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "linkIcon"), env.opts.autoescape);
output += "\"/></button>";
;
}
else {
if(!runtime.contextOrFrameLookup(context, frame, "isCurrent") && runtime.contextOrFrameLookup(context, frame, "blog")) {
output += "<a href=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "blog"), env.opts.autoescape);
output += "\" target=\"_blank\"><img src=\"img/";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "linkIcon"), env.opts.autoescape);
output += "\"/></a>";
;
}
;
}
;
return output;
})()
;
frame.set("linkImg", t_22, true);
if(frame.topLevel) {
context.setVariable("linkImg", t_22);
}
if(frame.topLevel) {
context.addExport("linkImg", t_22);
}
var t_23;
t_23 = (function() {
var output = "";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"location") && (env.getFilter("isTBD").call(context, runtime.contextOrFrameLookup(context, frame, "event")))) {
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"location"), env.opts.autoescape);
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"location")) {
output += "<a title=\"Map\" target=\"_blank\" href=\"https://maps.google.com/maps?q=";
output += runtime.suppressValue(env.getFilter("urlencode").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"location")), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"location"), env.opts.autoescape);
output += "<img class=\"map\" src=\"img/map.png\"/></a>";
;
}
;
}
;
return output;
})()
;
frame.set("detailLoc", t_23, true);
if(frame.topLevel) {
context.setVariable("detailLoc", t_23);
}
if(frame.topLevel) {
context.addExport("detailLoc", t_23);
}
output += "<tr class=\"event ";
if(env.getFilter("calendarBefore").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"start"),-6) || (env.getFilter("isTBD").call(context, runtime.contextOrFrameLookup(context, frame, "event")))) {
output += "summary";
;
}
else {
output += "details";
;
}
output += "\"><td class=\"event-date\" title=\"";
output += runtime.suppressValue((lineno = 20, colno = 173, runtime.callWrap(macro_t_1, "startFormat", context, [])), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue((lineno = 20, colno = 192, runtime.callWrap(macro_t_1, "startFormat", context, ["%a"])), env.opts.autoescape);
output += " <span class=\"long\">";
output += runtime.suppressValue((lineno = 21, colno = 38, runtime.callWrap(macro_t_1, "startFormat", context, ["%b&nbsp;%-d"])), env.opts.autoescape);
output += "</span><span class=\"short\">";
output += runtime.suppressValue((lineno = 21, colno = 95, runtime.callWrap(macro_t_1, "startFormat", context, ["%-m/%-d"])), env.opts.autoescape);
output += "</span></td><td class=\"event-time\">";
output += runtime.suppressValue((lineno = 21, colno = 156, runtime.callWrap(macro_t_1, "startFormat", context, ["%-I:%M"])), env.opts.autoescape);
output += "<span class=\"long\">";
output += runtime.suppressValue((lineno = 21, colno = 200, runtime.callWrap(macro_t_1, "startFormat", context, ["&nbsp;%p"])), env.opts.autoescape);
output += "</span><span class=\"short\">";
output += runtime.suppressValue(env.getFilter("replace").call(context, (lineno = 22, colno = 64, runtime.callWrap(macro_t_1, "startFormat", context, ["%p"])),"M",""), env.opts.autoescape);
output += "</span>";
output += runtime.suppressValue((lineno = 23, colno = 36, runtime.callWrap(macro_t_3, "endFormat", context, ["&nbsp;- %-I:%M"])), env.opts.autoescape);
output += "<span class=\"long\">";
output += runtime.suppressValue((lineno = 23, colno = 86, runtime.callWrap(macro_t_3, "endFormat", context, ["&nbsp;%p"])), env.opts.autoescape);
output += "</span><span class=\"short\">";
output += runtime.suppressValue(env.getFilter("replace").call(context, (lineno = 24, colno = 62, runtime.callWrap(macro_t_3, "endFormat", context, ["%p"])),"M",""), env.opts.autoescape);
output += "</span></td><td class=\"event-text\" title=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"location") || runtime.contextOrFrameLookup(context, frame, "desc") || runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"summary"), env.opts.autoescape);
output += "\"><span></span>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"summary"), env.opts.autoescape);
output += "</td><td class=\"event-link\" title=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "linkTitle"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "linkImg"), env.opts.autoescape);
output += "</td></tr><tr class=\"event-detail\"><td colspan=\"4\"><div>";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "desc"), env.opts.autoescape);
if(runtime.contextOrFrameLookup(context, frame, "desc") && runtime.contextOrFrameLookup(context, frame, "detailLoc")) {
output += "<hr>";
;
}
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "detailLoc"), env.opts.autoescape);
output += "</div></td></tr>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["next_info"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
var t_1;
t_1 = (function() {
var output = "";
output += runtime.suppressValue(env.getFilter("random").call(context, ["Please join us","Next SCEVA meeting is"]), env.opts.autoescape);
if((env.getFilter("isTBD").call(context, runtime.contextOrFrameLookup(context, frame, "event")))) {
output += " on $d, location to be announced.";
;
}
else {
output += runtime.suppressValue(env.getFilter("random").call(context, [" on $d$v. ","$v on $d. "]), env.opts.autoescape);
;
}
output += runtime.suppressValue(env.getFilter("random").call(context, ["Meeting starts at $t!","We'll see you at $t!"]), env.opts.autoescape);
;
return output;
})()
;
frame.set("blurb", t_1, true);
if(frame.topLevel) {
context.setVariable("blurb", t_1);
}
if(frame.topLevel) {
context.addExport("blurb", t_1);
}
output += runtime.suppressValue(env.getFilter("replace").call(context, env.getFilter("replace").call(context, env.getFilter("replace").call(context, runtime.contextOrFrameLookup(context, frame, "blurb"),"$d",env.getFilter("datetimeFormat").call(context, env.getFilter("calendarDate").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"start")),env.getFilter("random").call(context, ["%a, %B %o","%B %o (%a)","%A, %B %o","%B %o (%A)"]))),"$t",env.getFilter("replace").call(context, env.getFilter("datetimeFormat").call(context, env.getFilter("calendarDate").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"start")),"%-I:%M&nbsp;%p" + runtime.contextOrFrameLookup(context, frame, "tz")),":00","")),"$v",(!runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"location")?(env.getFilter("summaryVenue").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"summary"))):env.getFilter("venueSubstitute").call(context, env.getFilter("random").call(context, [" at $v in $c"," at $c's $v"]),runtime.contextOrFrameLookup(context, frame, "event")))), env.opts.autoescape);
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["blogs"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
frame = frame.push();
var t_3 = runtime.contextOrFrameLookup(context, frame, "posts");
if(t_3) {t_3 = runtime.fromIterator(t_3);
var t_2 = t_3.length;
for(var t_1=0; t_1 < t_3.length; t_1++) {
var t_4 = t_3[t_1];
frame.set("post", t_4);
frame.set("loop.index", t_1 + 1);
frame.set("loop.index0", t_1);
frame.set("loop.revindex", t_2 - t_1);
frame.set("loop.revindex0", t_2 - t_1 - 1);
frame.set("loop.first", t_1 === 0);
frame.set("loop.last", t_1 === t_2 - 1);
frame.set("loop.length", t_2);
output += "<p><a href=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"url"), env.opts.autoescape);
output += "\"><img src=\"";
output += runtime.suppressValue(env.getFilter("bloggerResize").call(context, env.getFilter("first").call(context, runtime.memberLookup((t_4),"images")),72), env.opts.autoescape);
output += "\"></a><a href=\"";
output += runtime.suppressValue(runtime.memberLookup((t_4),"url"), env.opts.autoescape);
output += "\">";
output += runtime.suppressValue(runtime.memberLookup((t_4),"title"), env.opts.autoescape);
output += "</a><br>";
output += runtime.suppressValue(env.getFilter("truncate").call(context, env.getFilter("trim").call(context, env.getFilter("stripHtmlTags").call(context, runtime.memberLookup((t_4),"content"))),200,false,"…"), env.opts.autoescape);
output += "</p>";
;
}
}
if (!t_2) {
output += "No blog posts.";
}
frame = frame.pop();
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["subject"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "Space Coast EVA ";
output += runtime.suppressValue(env.getFilter("datetimeFormat").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"start"),"%B"), env.opts.autoescape);
output += " Meeting";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["email"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "<p>SCEVA Members and Guests,</p>\n<p></p>\n<p>Our monthly meeting is ";
output += runtime.suppressValue(env.getFilter("datetimeFormat").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"start"),"%A, %-m/%-d/%y at %-I:%M %p"), env.opts.autoescape);
output += ".</p>\n<p></p>\n<h2>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"name"), env.opts.autoescape);
output += "</h2>\n<p></p>\n<p>";
output += runtime.suppressValue(env.getFilter("datetimeFormat").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"start"),"%B %-d, %Y, %-I:%M %p"), env.opts.autoescape);
output += " — ";
output += runtime.suppressValue(env.getFilter("datetimeFormat").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"end"),"%-I:%M %p"), env.opts.autoescape);
output += "</p>\n<p></p>\n<h3>Location:</h3>\n<p>";
output += runtime.suppressValue(env.getFilter("addressSplit").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"location"),"<br>"), env.opts.autoescape);
output += "</p>\n<p><a href=\"https://maps.google.com/maps?q=";
output += runtime.suppressValue(env.getFilter("urlencode").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"location")), env.opts.autoescape);
output += "\" target=\"_blank\" tabindex=\"-1\">MAP</a></p>\n<p></p>\n<h3>Description:</h3>\n<p>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"description"), env.opts.autoescape);
output += "</p>\n<p></p>\n<h3>RSVP:</h3>\n<p><a href=\"https://spacecoasteva.club/?eventid=";
output += runtime.suppressValue(env.getFilter("datetimeFormat").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"start"),"%Y%m%d"), env.opts.autoescape);
output += "\" target=\"_blank\" tabindex=\"-1\"><em>Let us know if you can join us and add this event to your calendar!</em></a></p>\n<p></p>\n<p></p>\n<p>Bob Hathaway<br>President, Space Coast EVA</p>\n<p></p>\n<p><em>Copyright © *|DATE:Y|* Space Coast Electric Vehicle Association, All rights reserved.</em><br>You are receiving this email because you opted in via our website or at an event.</p>";
if(parentTemplate) {
parentTemplate.rootRenderFunc(env, context, frame, runtime, cb);
} else {
cb(null, output);
}
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};

})();
})();
