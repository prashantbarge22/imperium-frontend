<template>

    <div id="coinDistributionSection" class="fullSection">

        <div class="verticalAlignMiddle">

            <span class="pageTitle alignCenter bigMarginBottom">Coin Supply</span>

            <div class="distributionContainer maxWidthSection">

                <div class="distributionGrid">
                    <div class="webdCoin spinCoin">
                        <img data-src="/public/assets/images/logo-coin.png" alt="webDollar logo black" title="webDollar black logo" class="coinLogo lazy">
                    </div>
                </div>
                <div class="distributionGrid">

                    <div class="stats">
                        <div>
                            <span v-show="!this.loaded" class="value">
                                <loading-spinner />
                            </span>
                            <span v-show="this.loaded" class="value">
                                {{this.distributionAmount}}
                                <span class='networkDifficulty'>{{this.getNumberSign(this.totalAmountCoins)}}</span>
                            </span>
                            <span class="description">Current Distribution</span>
                        </div>
                        <div>
                            <span v-show="!this.loaded" class="value">
                                 <loading-spinner />
                            </span>
                            <span v-show="this.loaded" class="value">
                                {{this.distributionBlocks}}
                            </span>
                            <span class="description">Mined blocks</span>
                        </div>
                        <div>
                            <span v-show="!this.loaded" class="value">
                                <loading-spinner />
                            </span>
                            <span v-show="this.loaded" class="value">
                                ~{{this.getNetworkHashrate}}
                                <span class='networkDifficulty'>{{this.getNetworkHashrateSign}}{{ this.changeRound ? '' : 'h/s'}}</span>
                            </span>
                            <span class="description">{{ this.changeRound ? 'Staking coins' : 'Global Hash rate' }}</span>
                        </div>
                    </div>

                    <div id="myRound">
                        <div id="myRoundBar" :style="{width: this.roundBarValue===100 ? 0 : this.roundBarValue + '%' }"></div>
                    </div>

                    <div id="myProgress">
                        <div id="myBar" :style="{width: this.totalAmountCoins / this.distributionProgressBarMax * 100  + '%' }"></div>
                    </div>
                    <span class="minValue">{{this.distributionProgressBarMinString}} IDLL</span>
                    <span class="maxValue">{{this.distributionProgressBarMaxString}} IDLL</span>

                  <div class="footer" v-show="this.currentPriceLoaded">
                    <div>
                      <span class="value">{{currentPriceSymbol}} {{currentPrice}}</span>
                      <span class="description">Current Price</span>
                    </div>
                    <div>
                      <span class="value">{{change24hrSign}}{{change24hr}} %</span>
                      <span class="description">24hr change</span>
                    </div>
                    <div class="hideOnMobile">
                      <span class="value">{{volume24hr}}</span>
                      <span class="description">24hr volume</span>
                    </div>
                    <div class="hideOnMobile">
                      <span class="value">{{marketCap}}</span>
                      <span class="description">Market Cap</span>
                    </div>
                    <div class="bottom-gutter">
                      <div>
                      <span class="description">All prices shown in
                        <select v-model="coinGecko.currency" class="poolSelect">
                          <option disabled value="">Please select one</option>
                          <option v-bind="currency in coinGecko.availableCurrencies">{{ currency }}</option>
                        </select>
                      </span>
                      <span class="description-smaller"><sup>*</sup>Powered by CoinGecko API</span>
                      <span class="description-smaller">Last Updated At {{this.lastUpdatedCoinGecko}}</span>
                      </div>
                    </div>
                  </div>

                </div>

            </div>

        </div>

    </div>
</template>

<script>

    import LoadingSpinner   from './../UI/elements/Loading-Spinner.vue';
    import Utils            from './../../../utils/util-functions';
    import WebDollarEmitter from './../../../utils/WebDollarEmitter';
    import moment from 'moment';

    const axios = require('axios').default;

    export default{

        name: "BlockchainDistribution",

        components:{
            LoadingSpinner,
        },

        data() {
            return {
                totalAmountCoins: 0,
                blocksLength: 0,
                blocksLastRoundChange: 0,
                roundJustChanged: null,
                loaded:false,
                isPos: false,
                roundBarValue: 0,

                distributionProgressBarMax : 42000000000,
                distributionProgressBarMin : 0,

                networkHashRate: 0,
                connected: false,
                // price will be pulled by coin gecko.
                coinGecko: {
                  price: 0,
                  currency: "usd",
                  symbol: "$",
                  marketCap: 0,
                  volume24h: 0,
                  change24h: 0,
                  lastUpdatedAt: 0,
                  loaded: false,
                  timer: '',
                  availableCurrencies: [],
                },
                // For symbols with a textual representation, map here. Otherwise use the ticker.
                // All tickers come from Coin Gecko.
                symbols: {
                  btc: '₿',
                  eth: 'Ξ',
                  ltc: 'Ł',
                  bch: 'Ƀ',
                  eos: 'ε',
                  xrp: '✕',
                  usd: '$',
                  aed: 'د.إ',
                  ars: '$',
                  aud: 'A$',
                  bdt: '৳',
                  bhd: '.د.ب',
                  bmd: '$',
                  brl: 'R$',
                  cad: 'C$',
                  chf: 'Fr.',
                  clp: '$',
                  cny: '¥',
                  czk: 'Kč',
                  dkk: 'Kr.',
                  eur: '€',
                  gbp: '£',
                  hkd: 'HK$',
                  huf: 'ft',
                  idr: 'Rp',
                  ils: '₪',
                  inr: '₹',
                  jpy: '¥',
                  krw: '₩',
                  kwd: 'د.ك',
                  lkr: 'Rs',
                  mmk: 'K',
                  mxn: '$',
                  myr: 'RM',
                  ngn: '₦',
                  nok: 'kr',
                  nzd: '$',
                  php: '₱',
                  pkr: '₨',
                  pln: 'zł',
                  rub: '₽',
                  sar: 'ر.س',
                  sek: 'kr',
                  sgd: '$',
                  thb: '฿',
                  try: '₺',
                  twd: '$',
                  uah: '₴',
                  vef: 'Bs',
                  vnd: '₫',
                  zar: 'R',
                  sats: 'S',
                }
            }
        },

        computed:{
            distributionProgressBarMinString(){
                return this.formatMoneyNumber(this.distributionProgressBarMin, 0)
            },

            distributionProgressBarMaxString(){
                return this.formatMoneyNumber(this.distributionProgressBarMax, 0)
            },
            distributionAmount(){
                return Utils.processHashesPoW(this.totalAmountCoins)
            },

            distributionBlocks(){
                return this.formatMoneyNumber(this.blocksLength,0)
            },

            getNetworkHashrate(){
                return Utils.showHashes(this.networkHashRate,this.isPos,this.roundJustChanged,this.totalAmountCoins);
            },

            getNetworkHashrateSign(){
                return Utils.showHashesSign(this.networkHashRate,this.isPos,this.roundJustChanged);
            },

            selectedCurrency() {
              return this.coinGecko.currency;
            },

            currentPriceLoaded() {
              return this.coinGecko.loaded;
            },

            currentPriceSymbol() {
              return this.coinGecko.symbol;
            },

            currentPrice() {
              return this.coinGecko.price;
            },

            volume24hr() {
              return this.coinGecko.volume24h ? Math.round(this.coinGecko.volume24h).toLocaleString() : 0;
            },

            change24hr() {
              return this.coinGecko.change24h ? this.coinGecko.change24h.toFixed(2).toLocaleString() : 0;
            },

            change24hrSign() {
              // if it's down, coin gecko adds a '-', so when it's up, insert a '+' for clarity.
              return this.change24hr > 0 ? '+' : '';
            },

            marketCap() {
              return this.coinGecko.marketCap.toLocaleString();
            },

            lastUpdatedCoinGecko() {
              const lastUpdatedAt = new Date(this.coinGecko.lastUpdatedAt * 1000);
              // date and time w/ seconds in current browser locale.
              return moment(lastUpdatedAt).format('L LTS');
            },

            changeRound(){
                if (this.isPos)
                {
                    if (this.roundJustChanged)
                        return false;
                    else
                        return true;
                } else
                {
                    if (this.roundJustChanged)
                        return true;
                    else
                        return false;
                }
            }

        },

        mounted() {
            const self = this;

            this.retrieveSupportedCurrenciesFromCoinGecko();
            this.retrievePriceFromCoinGecko();

            this.$nextTick(() => {
                if (WebDollar.Blockchain.synchronized) {

                    self.verifyIfContainData(WebDollar.Blockchain.Chain.accountantTree.calculateNodeCoins() / 10000 );

                    self.blocksLength    = WebDollar.Blockchain.Chain.blocks.length;
                    self.networkHashRate = WebDollar.Blockchain.Chain.blocks.networkHashRate;
                }

                WebDollarEmitter.on('blockchain/blocks-count-changed',  self._blockchainBlocksCountChanged);
                WebDollarEmitter.on('blockchain/new-network-hash-rate', self._blockchainNewNetworkHashRate);
            });
        },

        created() {
          this.initiateCoinGeckoRefreshTimer();
        },

        destroyed() {
            WebDollarEmitter.off('blockchain/blocks-count-changed',  this._blockchainBlocksCountChanged);
            WebDollarEmitter.off('blockchain/new-network-hash-rate', this._blockchainNewNetworkHashRate);

            this.clearCoinGeckoRefreshTimer();
        },

        watch: {
              selectedCurrency() {
                this.retrievePriceFromCoinGecko();
              }
          },

        methods: {
            _blockchainBlocksCountChanged(blocksLength) {
                this.verifyIfContainData( WebDollar.Blockchain.Chain.accountantTree.calculateNodeCoins() / 10000 );
                this.blocksLength = blocksLength;

                if (WebDollar.Blockchain.blockchainGenesis.isPoSActivated(blocksLength)) {
                    if (!this.isPos) {
                        if (this.roundJustChanged !== null && this.blocksLength % 10 === 0) {
                            this.roundJustChanged=true;
                        }

                        if (this.blocksLastRoundChange!==0) {
                            this.blocksLastRoundChange = this.blocksLength;
                        }
                    } else {
                        if (this.blocksLength % 10 !== 0) {
                            this.roundJustChanged=false;
                        }
                    }

                    this.isPos = true;

                }
                else {
                    if (this.isPos) {
                        if (this.roundJustChanged !== null && this.blocksLength % 10 === 0) {
                            this.roundJustChanged=true;
                        }

                        if(this.blocksLastRoundChange!==0) {
                            this.blocksLastRoundChange = this.blocksLength;
                        }
                    } else {
                        if (this.blocksLength%10!==0) {
                            this.roundJustChanged=false;
                        }
                    }

                    this.isPos = false;
                }

                if (this.blocksLastRoundChange===0) {
                    this.blocksLastRoundChange = this.blocksLength - this.blocksLength%10;

                    if (WebDollar.Blockchain.blockchainGenesis.isPoSActivated(blocksLength - 10)) {
                        this.blocksLastRoundChange -= 10;
                    }
                }

                if (this.roundJustChanged)
                    this.roundBarValue = 0;
                else
                    this.roundBarValue = (this.blocksLength-this.blocksLastRoundChange) / (this.isPos ? 20 : 10) * 100;

                if (this.roundJustChanged === null && this.blocksLength%10===0)
                    this.roundBarValue = 0;

                if (this.isPos)
                    this.roundBarValue+=1;
                else
                    this.roundBarValue-=1;

                console.log("RoundBar - hashrate",this.networkHashRate);
                console.log("RoundBar - blocksLastRoundChange",this.blocksLastRoundChange);
                console.log("RoundBar - blocksLength",this.blocksLength);
                console.log("RoundBar - isPos",this.isPos);
                console.log("RoundBar - roundJustChanged",this.roundJustChanged);
            },

            _blockchainNewNetworkHashRate(networkHashRate) {
                if (networkHashRate !== 0 && !this.roundJustChanged) {
                    this.networkHashRate = networkHashRate;
                }
            },

            formatMoneyNumber(n, decimals=2) {
                if (typeof n === 'undefined') return '';

                return n.toFixed(decimals).replace(/./g, function(c, i, a) {
                    return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
                });
            },

            verifyIfContainData(amount){

                this.totalAmountCoins = amount;

                if (amount!==0)
                    this.loaded=true;
                else
                    this.loaded = false;

            },

            getNumberSign(value){
                return Utils.processHashesSignPoW(value);
            },

            retrieveSupportedCurrenciesFromCoinGecko() {
              return axios
              .get(`https://api.coingecko.com/api/v3/simple/supported_vs_currencies`)
              .then(response => this.coinGecko.availableCurrencies.push(...(response.data)));
            },

            retrievePriceFromCoinGecko() {
              return axios
                  .get(`https://api.coingecko.com/api/v3/simple/price?ids=webdollar&vs_currencies=${this.coinGecko.currency}&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`)
                  .then(response => {
                    this.coinGecko.loaded = true;

                    const currency = this.coinGecko.currency;
                    const webdollar = response.data.webdollar;

                    this.coinGecko.price = webdollar[currency];
                    this.coinGecko.marketCap = webdollar[`${currency}_market_cap`];
                    this.coinGecko.volume24h = webdollar[`${currency}_24h_vol`];
                    this.coinGecko.change24h = webdollar[`${currency}_24h_change`];
                    this.coinGecko.lastUpdatedAt = webdollar['last_updated_at'];
                    this.coinGecko.symbol = this.symbols[currency] || currency.toLocaleUpperCase();
                  });
            },

            initiateCoinGeckoRefreshTimer() {
              this.coinGecko.timer = setInterval(this.retrievePriceFromCoinGecko, 90 * 1000 /* Refresh every 90 seconds */);
            },

            clearCoinGeckoRefreshTimer() {
              clearInterval(this.coinGecko.timer);
            },

        }
    }
</script>
