/*
	méthodes JSON de get-tweets.php :
    var tweetscreenname = feeds[i].user.name;
    var tweetusername = feeds[i].user.screen_name;
    var profileimage = feeds[i].user.profile_image_url_https;
    var status = feeds[i].text;
    var isaretweet = false;
    var isdirect = false;
    var tweetid = feeds[i].id_str;
*/

function drawHeader(feeds) {

  var heureEcoule = new Array(feeds.length);

  var flux = new Array();

  for (var k=0; k<feeds.length; k++) {
	if (feeds[k].text.substring(0, 4) == "MAIL" ) {

/*
		if (Math.random() > .7)
			feeds[k].text = 'o';
		else if (Math.random() > .4)
			feeds[k].text = 'i';
		else if (Math.random() > 0)
			feeds[k].text = 's';
*/

		if (k%3 == 0) {
			feeds[k].text = 's';
		}
		else if (k%3 == 1) {
			feeds[k].text = 'o';
		}
		else if (k%3 == 2) {
			feeds[k].text = 'i';
		}

		flux.push(feeds[k]);
	}
  }

  //console.log(flux);

  //reformattage du temps tweet en "since"
  for (var k=0; k<flux.length; k++) {
	 //console.log("howlongago [" + k + "] : " + howlongago(flux[k].created_at));
	 heureEcoule[k] = howlongago(flux[k].created_at);
	 // pour limiter à 50 heures au plus vieux
	 if (heureEcoule[k] > 50) break;
  }

  var multicanvas = '';

  // colonnes
  for (var i=0; i<3; i++) {
 	 // rangées
 	 for (var j=0; j<8; j++) {

	 	 multicanvas += '<canvas class="carrelifelog" id="c' + (i + j*3) + '" width="45px" height="45px" alt=' + (i + j*3) + '></canvas>';

 	 }
  }


  $('#lifelog-gen').html(multicanvas);
  $('#lifelog-gen').transition({
  	opacity: 1,
  	duration: 800
  });

  $('#loader').transition({
  	opacity: 0,
  	duration: 800
  });



  for (var i=0; i<24; i++) {
  	drawMotif(flux, heureEcoule, i);
  }

}

function drawMotif(flux, heureEcoule, i) {

	// Chercher dans feeds si ya un ou plusieurs tweets qui correspondent à cette heure
	// En fonction du nbre de tweets, afficher une forme différente —
	// · carré = aucun · 2 triangles = 1 · 3 = 2 · 4 = 3 · etc.
	// Puis dessiner en attribuant les bonnes couleurs

	var cecarreID = 'c' + i;
	var cecarre = document.getElementById(cecarreID);
  	var carre = cecarre.getContext('2d');

  	carre.lineWidth = 10;
  	carre.strokeStyle = "#fafafa";
  	carre.fillStyle="#ECECEE";

	var count = 0;
	var lastVal = 0;
	var activiteHeure = new Array();

	// itérer dans les tweets
	for (var k=flux.length-1; k>=0; k--) {
      // compter des tweets dans l'heure
      // si ils sont après le carré qui nous intéresse
	  if ( heureEcoule[k] >= i) {
	  	// et si ils sont dans l'interval
	  	if ( heureEcoule[k] < i+1) {
	  		// on incrémente pour enregistrer la valeur précédente
	  		count++;
  		}
		// on attrape en permanence le plus ancien
	  	activiteHeure[count] = flux[k].text.substring(0, 1);
	  	// jusqu'à ce qu'on tombe sur un qui appartient au bon interval

	  }

	  //console.log("count : " + count + "  heureEcoule[" + k + "] : " + heureEcoule[k] + " i : " + i);
    }

    //console.log(activiteHeure);
    //console.log("actlength : " + activiteHeure.length);

    // on met une marge blanche
    var mrg = 1;

	// si aucune activité = grosbug
	if (activiteHeure.length == 0) {
	    carre.fillStyle="#ECECEE";
	    carre.beginPath();
		carre.moveTo(0    , 0);
	    carre.lineTo(45   , 0);
	    carre.lineTo(45   , 45);
	    carre.lineTo(0    , 45);
	    carre.fill();
	    carre.closePath();
    }

	// si 1 activiteHeure.length on affiche un carré
	if (activiteHeure.length == 1) {
		carre.fillStyle=fillActivite(activiteHeure[0]);
	    carre.beginPath();
		carre.moveTo(0    , 0);
	    carre.lineTo(45   , 0);
	    carre.lineTo(45   , 45);
	    carre.lineTo(0    , 45);
	    carre.fill();
	    carre.closePath();

	}

	// si 2 activiteHeure.length on affiche deux triangles
	if (activiteHeure.length == 2) {
 		carre.fillStyle=fillActivite(activiteHeure[1]);
	    carre.beginPath();
		carre.moveTo(0    , 0);
	    carre.lineTo(45-mrg   , 0);
	    carre.lineTo(0   , 45-mrg);
	    carre.fill();
	    carre.closePath();

	    carre.fillStyle=fillActivite(activiteHeure[0]);
	    carre.beginPath();
		carre.moveTo(45   , mrg);
	    carre.lineTo(0    ,45+mrg);
	    carre.lineTo(45   ,45);
	    carre.fill();
	    carre.closePath();
	}

	// si y en a 3, on en affiche 3
	if (activiteHeure.length == 3) {
 		carre.fillStyle=fillActivite(activiteHeure[2]);
	    carre.beginPath();
		carre.moveTo(mrg    , 0);
	    carre.lineTo(45-mrg   , 0);
	    carre.lineTo(45/2  , 45/2-mrg);
	    carre.fill();
	    carre.closePath();

	    carre.fillStyle=fillActivite(activiteHeure[1]);
	    carre.beginPath();
		carre.moveTo(0   , mrg);
	    carre.lineTo(0    ,45-mrg);
	    carre.lineTo(45/2-mrg   , 45/2);
	    carre.fill();
	    carre.closePath();

	    carre.fillStyle=fillActivite(activiteHeure[0]);
	    carre.beginPath();
		carre.moveTo(45   , mrg);
	    carre.lineTo(0    ,45+mrg);
	    carre.lineTo(45   ,45);
	    carre.fill();
	    carre.closePath();
	}

	// si y en a 4 ou plus on en affiche 4
	if (activiteHeure.length == 4) {
 		carre.fillStyle=fillActivite(activiteHeure[3]);
	    carre.beginPath();
		carre.moveTo(mrg    , 0);
	    carre.lineTo(45-mrg   , 0);
	    carre.lineTo(45/2  , 45/2-mrg);
	    carre.fill();
	    carre.closePath();

	    carre.fillStyle=fillActivite(activiteHeure[2]);
	    carre.beginPath();
		carre.moveTo(0   , mrg);
	    carre.lineTo(0    ,45-mrg);
	    carre.lineTo(45/2-mrg   , 45/2);
	    carre.fill();
	    carre.closePath();

	    carre.fillStyle=fillActivite(activiteHeure[1]);
	    carre.beginPath();
		carre.moveTo(45   , mrg);
	    carre.lineTo(45/2+mrg    ,45/2);
	    carre.lineTo(45   ,45-mrg);
	    carre.fill();
	    carre.closePath();

	    carre.fillStyle=fillActivite(activiteHeure[0]);
	    carre.beginPath();
		carre.moveTo(mrg   , 45);
	    carre.lineTo(45/2    ,45/2+mrg);
	    carre.lineTo(45-mrg   ,45);
	    carre.fill();
	    carre.closePath();
	}

	if (activiteHeure.length == 5) {
 		carre.fillStyle=fillActivite(activiteHeure[4]);
	    carre.beginPath();
		carre.moveTo(mrg    , 0);
	    carre.lineTo(45-mrg   , 0);
	    carre.lineTo(45/2  , 45/2-mrg);
	    carre.fill();
	    carre.closePath();

	    carre.fillStyle=fillActivite(activiteHeure[3]);
	    carre.beginPath();
		carre.moveTo(0   , mrg);
	    carre.lineTo(0    ,45/2-mrg+.5);
	    carre.lineTo(45/2-mrg-.5     , 45/2-mrg+.5);
	    carre.fill();
	    carre.closePath();

		carre.fillStyle=fillActivite(activiteHeure[2]);
	    carre.beginPath();
		carre.moveTo(0   , 45/2+mrg-.5);
	    carre.lineTo(0    ,45-mrg);
	    carre.lineTo(45/2-mrg-.5   , 45/2+mrg-.5);
	    carre.fill();
	    carre.closePath();

	    carre.fillStyle=fillActivite(activiteHeure[1]);
	    carre.beginPath();
		carre.moveTo(45   , mrg);
	    carre.lineTo(45/2+mrg    ,45/2);
	    carre.lineTo(45   ,45-mrg);
	    carre.fill();
	    carre.closePath();

	    carre.fillStyle=fillActivite(activiteHeure[0]);
	    carre.beginPath();
		carre.moveTo(mrg   , 45);
	    carre.lineTo(45/2    ,45/2+mrg);
	    carre.lineTo(45-mrg   ,45);
	    carre.fill();
	    carre.closePath();
	}

	if (activiteHeure.length >= 6) {
 		carre.fillStyle=fillActivite(activiteHeure[5]);
	    carre.beginPath();
		carre.moveTo(mrg    , 0);
	    carre.lineTo(45-mrg   , 0);
	    carre.lineTo(45/2  , 45/2-mrg);
	    carre.fill();
	    carre.closePath();

	    carre.fillStyle=fillActivite(activiteHeure[4]);
	    carre.beginPath();
		carre.moveTo(0   , mrg);
	    carre.lineTo(0    ,45/2-mrg+.5);
	    carre.lineTo(45/2-mrg-.5     , 45/2-mrg+.5);
	    carre.fill();
	    carre.closePath();

		carre.fillStyle=fillActivite(activiteHeure[3]);
	    carre.beginPath();
		carre.moveTo(0   , 45/2+mrg-.5);
	    carre.lineTo(0    ,45-mrg);
	    carre.lineTo(45/2-mrg-.5   , 45/2+mrg-.5);
	    carre.fill();
	    carre.closePath();

	    carre.fillStyle=fillActivite(activiteHeure[2]);
	    carre.beginPath();
		carre.moveTo(45   , mrg);
	    carre.lineTo(45   ,45/2-mrg+.5);
	    carre.lineTo(45/2+mrg+.5    ,45/2-mrg+.5);
	    carre.fill();
	    carre.closePath();

	    carre.fillStyle=fillActivite(activiteHeure[1]);
	    carre.beginPath();
		carre.moveTo(45   , 45/2+mrg-.5);
	    carre.lineTo(45   ,45-mrg);
	    carre.lineTo(45/2+mrg+.5   ,45/2+mrg-.5);
	    carre.fill();
	    carre.closePath();

	    carre.fillStyle=fillActivite(activiteHeure[0]);
	    carre.beginPath();
		carre.moveTo(mrg   , 45);
	    carre.lineTo(45/2    ,45/2+mrg);
	    carre.lineTo(45-mrg   ,45);
	    carre.fill();
	    carre.closePath();
	}

	// et enfin on lui attribue un pop-up

	// on trouve le nom
	var activite = '';
	if (activiteHeure[activiteHeure.length-1] == 'o' || activiteHeure[activiteHeure.length-1] == 'O') activite = 'output';
	if (activiteHeure[activiteHeure.length-1] == 'i' || activiteHeure[activiteHeure.length-1] == 'I') activite = 'input';
	if (activiteHeure[activiteHeure.length-1] == 's' || activiteHeure[activiteHeure.length-1] == 'S') activite = 'sleeping';


  	// pour le premier carré on soigne la formulation "Currently:"
  	if (i == 0 ) {

	    $(cecarre).CreateBubblePopup({

			position : 'left',
			align	 : 'center',
			closingSpeed : '50',
			innerHtml: 'Currently:</br>' + activite,
			innerHtmlStyle: {
								color:'#FFFFFF',
								'text-align':'left'
							},

			themeName: 'all-black',
			themePath: '/wp-content/plugins/jquerybubblepopup-themes'

		  });
	  }
	  // pour le 1 hours ago
	  else if (i == 1){
		   $(cecarre).CreateBubblePopup({

			position : 'left',
			closingSpeed : '50',
			align	 : 'center',
			innerHtml: i + ' hour ago:</br>' + activite,
			innerHtmlStyle: {
								color:'#FFFFFF',
								'text-align':'left'
							},

			themeName: 'all-black',
			themePath: '/wp-content/plugins/jquerybubblepopup-themes'

		  });
	  }

	  else {
		   $(cecarre).CreateBubblePopup({

			position : 'left',
			closingSpeed : '50',
			align	 : 'center',
			innerHtml: i + ' hours ago:</br>' + activite,
			innerHtmlStyle: {
								color:'#FFFFFF',
								'text-align':'left'
							},

			themeName: 'all-black',
			themePath: '/wp-content/plugins/jquerybubblepopup-themes'

		  });
	  }




}


function fillActivite(lettre) {
	if (lettre == 'o' || lettre == 'O')
		return 	"#09606F";
	if (lettre == 'i' || lettre == 'I')
		return 	"#7DC1C8";
	if (lettre == 's' || lettre == 'S')
		return 	"#ECECEE";
}



// fonction empruntée de www.webdevdoor.com (2012) et adaptée par Louis Eveillard. Renvoi les heures écoulés depuis un tweet
function howlongago(time_value) {
  var values = time_value.split(" ");
  time_value = values[1] + " " + values[2] + ", " + values[5] + " " + values[3];
  var parsed_date = Date.parse(time_value);
  var relative_to = (arguments.length > 1) ? arguments[1] : new Date();

  var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
  var shortdate = time_value.substr(4,2) + " " + time_value.substr(0,3);
  delta = delta + (relative_to.getTimezoneOffset() * 60);
  delta = (delta / 3600);

  return delta;

  /*
  if (delta < 60) {
    return '1m';
  } else if(delta < 120) {
    return '1m';
  } else if(delta < (60*60)) {
    return (parseInt(delta / 60)).toString() + 'm';
  } else if(delta < (120*60)) {
    return '1h';
  } else if(delta < (24*60*60)) {
    return (parseInt(delta / 3600)).toString() + 'h';
  } else if(delta < (48*60*60)) {
    //return '1 day';
    return shortdate;
  } else {
    return shortdate;
  }
  */
}
