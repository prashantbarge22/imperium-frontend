export default {

    generateRandomcolor(address){

        let sum0=0, sum1=0,
            sum2 = 0;
        for (let i=0; i<address.length; i++){

            if (i %3 === 0)
                sum0 = sum0 + address.charCodeAt(i);
            else
            if (i %3 === 1)
                sum1 = sum1 + address.charCodeAt(i);
            else
            if (i %3 === 2)
                sum2 = sum2 + address.charCodeAt(i);
        }

        return "rgb(" + sum0 % 256 + "," + sum1 % 256 + "," + sum2 % 256 + ")";
    },

    formatMoneyNumber(n, decimals=0) {

        var number = parseInt(n/WebDollar.Applications.CoinsHelper.WEBD);
        var decimalNumber = this.getNumberRest(n);

        if (decimals===0) return this.formatIntNumber(number);
        else return this.formatIntNumber(number)+'.'+this.getFirstDigits(decimalNumber,decimals);

    },

    formatIntNumber(number){

        return number.toString().replace(/./g, function(c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        });

    },

    getNumberRest(number){

        return number % WebDollar.Applications.CoinsHelper.WEBD;

    },

    getFirstDigits(number,decimals){

        let newNumber = '';

        if(number<10)
            newNumber='000'+number.toString();
        else if(number<100)
            newNumber='00'+number.toString();
        else if(number<1000)
            newNumber='0'+number.toString();
        else if(number<10000)
            newNumber=''+number.toString();

        return newNumber.substring(0,decimals);

    },

    processHashesPoS(hashes){

        if (hashes >= 1000000000000) return (hashes / 1500000000000).toFixed(2);
        if (hashes >= 1000000000) return (hashes / 1500000000).toFixed(2);
        if (hashes >= 1000000) return (hashes / 1500000).toFixed(1);
        if (hashes >= 1000) return (hashes / 1500).toFixed(0);

        return hashes;

    },

    processHashesPoW(hashes){

        if (hashes >= 1000000000000) return (hashes / 1000000000000).toFixed(2);
        if (hashes >= 1000000000) return (hashes / 1000000000).toFixed(2);
        if (hashes >= 1000000) return (hashes / 1000000).toFixed(1);
        if (hashes >= 1000) return (hashes / 1000).toFixed(0);

        return hashes;

    },

    processHashesSignPoS(hashes){

        if (hashes >= 15000000000000) return 'B';
        if (hashes >= 15000000000) return 'M';
        if (hashes >= 15000000) return 'K';

        return 'K';

    },

    processHashesSignPoW(hashes){

        if (hashes >= 1000000000000) return 'T';
        if (hashes >= 1000000000) return 'B';
        if (hashes >= 1000000) return 'M';
        if (hashes >= 1000) return 'K';

        return '';

    },

    showHashes(hashes,isPoS,roundJustChanged,max){

        if(max*1000 < hashes)
            hashes=max*1000;

        if(roundJustChanged){

            if(isPoS)
                hashes = this.processHashesPoW(hashes);
            else
                hashes = this.processHashesPoS(hashes);

        }else{

            if(isPoS)
                hashes = this.processHashesPoS(hashes);
            else
                hashes = this.processHashesPoW(hashes);

        }

        return hashes;

    },

    showHashesSign(hashes,isPoS,roundJustChanged){

        console.log("sigggggggnnnnnnnnn",hashes)

        if(roundJustChanged){

            return this.processHashesSignPoS(hashes);

        }else{

            if(isPoS)
                return this.processHashesSignPoS(hashes);
            else
                return this.processHashesSignPoW(hashes);

        }

    }

}