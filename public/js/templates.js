(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["subject"] = (function() {
function root(env, context, frame, runtime, cb) {
var lineno = 0;
var colno = 0;
var output = "";
try {
var parentTemplate = null;
output += "Space Coast EVA ";
output += runtime.suppressValue(env.getFilter("datetime_format").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"start"),"%B"), env.opts.autoescape);
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
output += runtime.suppressValue(env.getFilter("datetime_format").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"start"),"%A, %-m/%-d/%y at %-I:%M%p"), env.opts.autoescape);
output += ".</p>\n<p></p>\n<h2>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"name"), env.opts.autoescape);
output += "</h2>\n<p></p>\n<p>";
output += runtime.suppressValue(env.getFilter("datetime_format").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"start"),"%B %-d, %Y, %-I:%M%p"), env.opts.autoescape);
output += " — ";
output += runtime.suppressValue(env.getFilter("datetime_format").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"end"),"%-I:%M%p"), env.opts.autoescape);
output += "</p>\n<p></p>\n<h3>Location:</h3>\n<p>";
output += runtime.suppressValue(env.getFilter("address_split").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"location"),"<br>"), env.opts.autoescape);
output += "</p>\n<p><a href=\"https://maps.google.com/maps?q=";
output += runtime.suppressValue(env.getFilter("urlencode").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"location")), env.opts.autoescape);
output += "\" target=\"_blank\" tabindex=\"-1\">MAP</a></p>\n<p></p>\n<h3>Description:</h3>\n<p>";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"description"), env.opts.autoescape);
output += "</p>\n<p></p>\n<h3>RSVP:</h3>\n<p><a href=\"https://spacecoasteva.club/?eventid=";
output += runtime.suppressValue(env.getFilter("datetime_format").call(context, runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "event")),"start"),"%Y%m%d"), env.opts.autoescape);
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
