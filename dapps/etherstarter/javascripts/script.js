(function(){jQuery(function(){var e,t,a,n,i,r,c,o,l,s,u,p,d,f,g;return a="undefined"!=typeof web3&&null!==web3,o=!1,s=function(){var e;return e=web3.db.getString("etherstarter","campaigns"),""===e?[]:JSON.parse(e)},t=function(e){var t;return t=s(),t.push(e),web3.db.putString("etherstarter","campaigns",JSON.stringify(t))},g=function(){return f.watch({topic:[web3.fromAscii("etherstarter"),web3.fromAscii(i),web3.fromAscii("announce-campaign")]}).arrived(function(e){var a;return a=JSON.parse(web3.toAscii(e.payload)),t(a)})},u=function(e,t,a){var n;return n=web3.fromAscii(JSON.stringify({id:e,title:t,description:a})),f.post({topic:[web3.fromAscii("etherstarter"),web3.fromAscii(i),web3.fromAscii("announce-campaign")],payload:n,ttl:600})},a&&(f=web3.shh,i=web3.db.get("etherstarter","contract"),e=JSON.parse(web3.db.getString("etherstarter","abi")),r=web3.eth.contract(i,e),g()),c=function(){var e;return e=$("select#campaigns").val()},d=function(e){var t,n,i,c,o,l;return t=$.grep(s(),function(t){return t.id===e}),t=t[0],$(".title h1").text(t.title),$(".description").text(t.description),l=r.call().get_recipient(e),a?(i=r.call().get_goal(e),n=r.call().get_deadline(e),o=r.call().get_total(e),$(".raised .value span").text(o),$(".total span").text(i),$(".recipient_address span").text(r.call().get_recipient(e)),c=o/i*100,$(".bar .inner").width(""+c+"%"),$(".info .percent").text(""+c+"%")):void 0},$(".donate button").on("click",function(e){var t,a,n;return a=c(),t=+$(".amount input").val(),r.value(t).contribute(a),d(a),n=r.call().get_total(a),$(".raised .value span").text(n),alert("YOU PLEDGED "+t+" WEI")}),$("body.home").length>0&&(n=s(),p=$("select#campaigns"),$.each(n,function(e,t){return 0===e&&d(t.id),p.append($("<option/>",{value:t.id,text:t.title}))}),p.on("change",function(e){var t;return p=$("select#campaigns"),t=p.val(),n=s(),d(t)})),$("body.admin").length>0?(o&&($("#create_campaign").show(),$("#title").val("Title"),$("#description").val("Description"),$("#goal").val("500"),$("#duration").val("10"),$("#recipient").val("dedc82cb364f93ddec1bf323069951b91c75c591")),l=$("#create_campaign form"),l.on("submit",function(e){var t,n,i,c,o,s,p;return e.preventDefault(),p=l.find("#title").val(),n=l.find("#description").val(),i=+l.find("#goal").val(),t=Date.now()/1e3+24*+l.find("#duration").val()*60*60,o="0x"+l.find("#recipient").val(),a?(c=r.call().get_free_id(),s=r.transact().create_campaign(c,o,i,t,0,0),u(c,p,n),$("#create_campaign").hide(),$("a#create_new_campaign").show(),alert("CREATED")):void 0}),$("#create_campaign a#close").on("click",function(e){return e.preventDefault(),$("#create_campaign").hide(),$("a#create_new_campaign").show()}),$("#create_new_campaign").on("click",function(e){return e.preventDefault(),$(this).hide(),$("#create_campaign").fadeIn(),l.find("#title").focus()})):void 0})}).call(this);