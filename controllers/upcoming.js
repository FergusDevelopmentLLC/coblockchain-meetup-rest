const ical = require('ical');

module.exports = {

  getUpcommingMeetups: async (req, res, next) => {
    var meetups = {};
    ical.fromURL('http://api.meetup.com/Ethereum-Boulder/upcoming.ical', {}, function(err, ebData) {
      meetups.EthereumBoulder = getNextEventFor(ebData);
      ical.fromURL('http://api.meetup.com/Boulder-Blockchain/upcoming.ical', {}, function(err, bbdata) {
        meetups.BoulderBlockchain = getNextEventFor(bbdata);
        ical.fromURL('http://api.meetup.com/Colorado-Government-Blockchain-Professionals/upcoming.ical', {}, function(err, cbpdata) {
          meetups.ColoradoGovernmentBlockchainProfessionals = getNextEventFor(cbpdata);
          ical.fromURL('http://api.meetup.com/Hyperledger-Denver/upcoming.ical', {}, function(err, hdata) {
            meetups.HyperledgerDenver = getNextEventFor(hdata);
            ical.fromURL('http://api.meetup.com/Women-in-BlockChain-MeetUp/upcoming.ical', {}, function(err, wibcdata) {
              meetups.WomenInBlockChainMeetUp = getNextEventFor(wibcdata);
              res.status(200).json(meetups);
            });
          });
        });
      });
    });
  }
};

function getNextEventFor(data) {
  var i = 0;
  for (var k in data){
    if (data.hasOwnProperty(k)) {
      var ev = data[k]
      if(ev.type == 'VEVENT') {
        if(i < 1) { return ev; }
        i++;
      }
    }
  }
  return 'No upcoming meetups scheduled.';
}
