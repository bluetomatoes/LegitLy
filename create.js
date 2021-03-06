'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: '[user]',
	password: '[password]'
});

var database = 'legitly'
connection.query('USE ' + database, function(err){
	if (err){
		console.log("could not use database '" + database + "'");
	}
});

connection.query('INSERT INTO names(name) ' +
				 'VALUES'+
				  '(vmaldonado),(twolfe),(oharmon),(lingram),(tbrock),(ybarker),(awest),(cgordon),(framirez),(dmeyer),(dschmidt),(chuff),(bwhite),(lwilkins),(wromero),(emorton),(fharrington),(kstevenson),(jalvarez),(dfranklin),(ehampton),(llawson),(obarnett),(ariley),(mrice),(vmorris),(chorton),(lcraig),(bvega),(jclark),(ncarlson),(lcortez),(kjenkins),(jboone),(kphelps),(kpowell),(idawson),(mhall),(rdaniel),(bcaldwell),(mgraves),(mmarshall),(pningham),(gswanson),(slove),(jmccarthy),(jwade),(gmason),(mgreen),(smendez),(ajackson),(gfields),(cwright),(cfox),(jhale),(aparker),(vfloyd),(srodgers),(dhunter),(vbowers),(nfrank),(bclarke),(sbell),(kanderson),(hdean),(pholloway),(bwheeler),(msanchez),(lhamilton),(eshaw),(krodriquez),(nhansen),(spittman),(eramsey),(cpaul),(tbradley),(imoreno),(sclayton),(fhubbard),(hchandler),(swalker),(fnguyen),(rmunoz),(charper),(ahogan),(rjones),(vmalone),(dmann),(mgarcia),(kperez),(jwise),(llowe),(mcarr),(llloyd),(trobertson),(dcarroll),(bbaldwin),(rlogan),(callen),(wblair),(dterry),(ehudson),(lmoreno),(ktaylor),(rstevens),(oestrada),(crowe),(lkennedy),(koliver),(fsteele),(sdaniels),(alove),(ystevenson),(mjames),(tmoran),(gobrien),(kmckenzie),(ccurry),(mcastillo),(jreeves),(mramsey),(hgarner),(bmassey),(bfuller),(smack),(rfletcher),(adawson),(sklein),(jdiaz),(lalexander),(mhiggins),(bshaw),(rbrewer),(cbaker),(jharper),(fshelton),(wrobbins),(erobinson),(nchambers),(nholloway),(lturner),(lcummings),(tsutton),(bjennings),(alindsey),(cnewman),(towens),(fhart),(ghughes),(smoore),(rmathis),(eboyd),(adouglas),(tsoto),(jarnold),(kstanley),(ebridges),(achandler),(tjoseph),(lsaunders),(cmorgan),(crichards),(kporter),(lmartinez),(hgomez),(gprice),(areid),(mbuchanan),(thammond),(bschmidt),(kpowers),(dray),(mstrickland),(dgross),(cperkins),(amalone),(lschneider),(cwelch),(mcruz),(breed),(jwalton),(rgreene),(fnorton),(nharrison),(alynch),(abutler),(bgarcia),(cbryant),(dwalsh),(cparks),(kcarson),(vadams),(lflowers),(clowe),(mtate),(djordan),(estokes),(mwise),(ntownsend),(sstone),(dvaldez),(lbrady),(bgordon),(jcastro),(cmann),(csantos),(rmendoza),(cgriffith),(erodgers),(lmaxwell),(hneal),(sarmstrong),(thines),(jlong),(dgutierrez),(abryan),(bwells),(krose),(vmcgee),(criley),(cdunn),(apittman),(jpope),(balvarez),(aaustin),(nroberts),(tpark),(isilva),(icollier),(cadkins),(cjohnston),(jdoyle),(dcasey),(ehill),(vnorris),(mmendez),(fbyrd),(eluna),(jbowman),(omcguire),(dingram),(dbowers),(dgray),(mblake),(cduncan),(nlee),(hwilkins),(aromero),(kgarza),(pwest),(awong),(hpeterson),(jwilliamson),(ajacobs),(tlamb),(across),(rmckinney),(sfarmer),(eford),(kreese),(cferguson),(hbrock),(rmccormick),(wosborne),(emills),(sparsons),(smanning),(jmeyer),(dgilbert),(mburns),(mpratt),(lhardy),(sjackson),(aball),(bwatson),(charmon),(esummers),(ghawkins),(mlawrence),(smccoy),(jbass),(kday),(bgibson),(whicks),(esanders),(rcurtis),(rross),(jmunoz),(hnelson),(gbell),(jlane),(mmason),(shubbard),(jelliott),(emontgomery),(cmccarthy),(labbott),(jkelley),(smarshall),(gcain),(abennett),(mbanks),(htorres),(cgriffin),(bwebb),(lsanchez),(jcarpenter),(lsharp),(nlambert),(epeters),(gdixon),(vsalazar),(bsimpson),(mcole),(evasquez),(rhunt),(emedina),(wowen),(rmcdonald),(jguerrero),(tdavis),(lgarrett),(ewashington),(lpayne),(tking),(kwalker),(jwilson),(mhuff),(asimmons),(nblack),(jhowell),(ahall),(bbates),(kbishop),(dfowler),(lwarren),(jmay),(aweaver),(hherrera),(jfrank),(thopkins),(mellis),(gcortez),(spoole),(mrivera),(tconner),(smartin),(ebarker),(ayoung),(ssullivan),(hwade),(slyons),(hmitchell),(imoody),(bcollins),(slucas),(alloyd),(mreyes),(bhampton),(rspencer),(enash),(lharris),(dzimmerman),(kruiz),(gfrench),(molson),(bmarsh),(jpearson),(anorman),(jbailey),(afigueroa),(bandrews),(imoss),(wpatterson),(sscott),(bparker),(cmatthews),(ebush),(mhorton),(lpage),(cphillips),(aschultz),(ahanson),(cramirez),(nmaldonado),(lwatkins),(gjimenez),(bdrake),(dvargas),(dpadilla),(mmurray),(mhouston),(kallison),(gtran),(kfrancis)',
	function(err) {
		if (err) {
			console.log("could not create table 'names'.");
		}
	}
);

//connection.query('INSERT INTO urlstest (long_url,short_url) VALUES("Hello","World")');

connection.end();
